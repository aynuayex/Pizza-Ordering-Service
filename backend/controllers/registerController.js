const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

const handleNewUser = async (
  fullName,
  email,
  password,
  location,
  phoneNumber,
  role,
  createToken = true
) => {
  try {
    // console.log(req.body);
    // const { fullName, email, password, location, phoneNumber } = req.body;
    // if (!fullName || !email || !password || !location || !phoneNumber) {
    //   return res
    //     .status(400)
    //     .json({ message: "full Name, email, password, location, and phoneNumber are required!" });
    //   }
    // //check for duplicate users in the db
    // // const duplicate = await prisma.user.findFirst({
    // //   where: {fullName, email, role}
    // // });
    // const duplicate = await prisma.user.findUnique({
    //   where: {email}
    // });
    // if (duplicate) return res.status(409).json({"message": "user already exist with that information, Please change Email!"}); //Conflict
    // encrypt password
    const hashedPwd = await bcrypt.hash(password, 10);

    let accessToken = "";
    let refreshToken = "";

    // create JWTs
    if (createToken) {
      accessToken = jwt.sign(
        { userInfo: { fullName, email, role } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      refreshToken = jwt.sign(
        { userInfo: { fullName, email, role } },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
    }

    // create and store the new user
    const result = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPwd,
        location,
        phoneNumber,
        refreshToken: [refreshToken],
        role: {
          connect: { id: role.id },
        },
      },
    });
    console.log(result);
    return { accessToken, refreshToken, id: result.id };
    // res.cookie("jwt", refreshToken, {
    //   httpOnly: true,
    //   sameSite: "None",
    //   secure: true, // comment this when using thunderclient to test refreshToken otherwise cookie will not be set on req.cookies
    //   maxAge: 24 * 60 * 60 * 1000,
    // });

    // res.status(201).json({ success: `New user ${fullName} with role ${role} created!`, id: result.id, email, fullName, role, accessToken  });
  } catch (err) {
    console.error("Error handling new user:", err.message);
  }
};

const handleRegisterRestaurant = async (req, res) => {
  try {
    console.log(req.body);
    const {
      adminName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      restaurantName,
      location,
      termsAndConditions,
    } = req.body;
    if (
      !adminName ||
      !email ||
      !password ||
      !location ||
      !phoneNumber ||
      !restaurantName
    ) {
      return res.status(400).json({
        message:
          "admin Name, email, password, location, phoneNumber and restaurantName are required!",
      });
    }

    // Check if a restaurant with the same name already exists
    const existingRestaurant = await prisma.restaurant.findUnique({
      where: { name: restaurantName },
    });

    if (existingRestaurant) {
      return res.status(409).json({
        message: "Restaurant with this name already exists,Please change name!",
      });
    }

    // Check if a Super Admin with the same email already exists for any restaurant
    const existingSuperAdmin = await prisma.user.findFirst({
      where: {
        email,
        role: {
          name: "SUPER_ADMIN",
        },
      },
    });

    if (existingSuperAdmin) {
      return res.status(409).json({
        message:
          "Super Admin with this email already exists, Please change Email!",
      });
    }

    // Hash password (always hash passwords before storing them)
    // const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create Super Admin role with full permissions (if it doesn't already exist)
    let superAdminRole = await prisma.role.findUnique({
      where: { name: "SUPER_ADMIN" },
    });
    if (!superAdminRole) {
      superAdminRole = await prisma.role.create({
        data: {
          name: "SUPER_ADMIN",
          description: "Full access to manage the entire system",
          permissions: JSON.stringify([{ action: "manage", subject: "all" }]),
        },
      });
    }

    const { accessToken, refreshToken, id } = await handleNewUser(
      adminName,
      email,
      password,
      location,
      phoneNumber,
      superAdminRole,
      createToken
    );
    // Create Super Admin user
    // const superAdmin = await prisma.user.create({
    //   data: {
    //     name,
    //     email,
    //     password: hashedPassword,
    //     role: {
    //       connect: { id: superAdminRole.id },
    //     },
    //   },
    // });

    //Create Restaurant associated with Super Admin
    await prisma.restaurant.create({
      data: {
        name: restaurantName,
        users: {
          connect: { id },
        },
      },
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true, // comment this when using thunderclient to test refreshToken otherwise cookie will not be set on req.cookies
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: `Super Admin with a name ${adminName} created and restaurant with name ${restaurantName} registered!`,
      id,
      email,
      adminName,
      role: superAdminRole,
      accessToken,
    });

    // res.json({
    //   message: "Super Admin created and restaurant registered",
    //   restaurant,
    // });
  } catch (err) {
    console.error("Error registering restaurant:", err);
    res
      .status(500)
      .json({ message: `Error registering restaurant: ${err.message}` });
  }
};

const handleRegisterCustomer = async (req, res) => {
  try {
    console.log(req.body);
    const { fullName, email, password, location, phoneNumber } = req.body;
    if (!fullName || !email || !password || !location || !phoneNumber) {
      return res.status(400).json({
        message:
          "full Name, email, password, location, and phoneNumber are required!",
      });
    }
    const duplicate = await prisma.user.findUnique({
      where: { email },
    });
    if (duplicate)
      return res.status(409).json({
        message:
          "user already exist with that information, Please change Email!",
      }); //Conflict

    // const hashedPassword = await bcrypt.hash(password, 10);

    // Fetch or create a 'CUSTOMER' role
    let customerRole = await prisma.role.findUnique({
      where: { name: "CUSTOMER" },
    });
    if (!customerRole) {
      customerRole = await prisma.role.create({
        data: {
          name: "CUSTOMER",
          description: "Customers can place orders and view pizzas",
          permissions: JSON.stringify([
            { action: "read", subject: "Pizza" },
            { action: "read", subject: "Orders" },
            { action: "create", subject: "Order" },
          ]),
        },
      });
    }

    const { accessToken, refreshToken, id } = await handleNewUser(
      fullName,
      email,
      password,
      location,
      phoneNumber,
      customerRole,
      createToken
    );
    // Create customer user
    // const customer = await prisma.user.create({
    //   data: {
    //     name,
    //     email,
    //     password: hashedPassword,
    //     role: {
    //       connect: { id: customerRole.id },
    //     },
    //   },
    // });
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true, // comment this when using thunderclient to test refreshToken otherwise cookie will not be set on req.cookies
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: `New user ${fullName} created!`,
      id,
      email,
      fullName,
      role: customerRole,
      accessToken,
    });

    // res.json({ message: "Customer registered successfully", customer });
  } catch (err) {
    console.error("Error registering customer:", err);
    res
      .status(500)
      .json({ message: `Error registering customer: ${err.message}` });
  }
};

const handleAddAdmin = async (req, res) => {
  // const { name, email, password, roleName, permissions } = req.body;

  try {
    console.log(req.body);
    const {
      adminName,
      email,
      password,
      location,
      phoneNumber,
      roleId
    } = req.body;
    if (
      !adminName ||
      !email ||
      !password ||
      !location ||
      !phoneNumber ||
      !roleId
    ) {
      return res.status(400).json({
        message:
          "full Name, email, password, location, phoneNumber, roleId are required!",
      });
    }
    const duplicate = await prisma.user.findUnique({
      where: { email },
    });
    if (duplicate)
      return res.status(409).json({
        message:
          "user already exist with that information, Please change Email!",
      }); //Conflict

    // const hashedPassword = await bcrypt.hash(password, 10);

    const adminRole = await prisma.role.findUnique({ where: { id: roleId } });

    const { accessToken, refreshToken, id } = await handleNewUser(
      adminName,
      email,
      password,
      location,
      phoneNumber,
      adminRole,
      (createToken = false)
    );

    const assigningUser = await prisma.user.findUnique({where: {email: req.user.email}});

    //connect the admin with the associated Restaurant
    await prisma.restaurant.update({
      where: {id: assigningUser.restaurantId},
      data: {
        users: {
          connect: { id },
        },
      },
    });

    res.status(201).json({
      success: `New user ${adminName} with role ${adminRole.name} created successfully!`,
      // , id, email, fullName, role: adminRole, accessToken
    });

    // res.json({ message: "Admin created successfully", admin });
  } catch (err) {
    console.error("Error adding admin:", err);
    res.status(500).json({ message: `Error adding admin: ${err.message}` });
  }
};

module.exports = {
  handleRegisterRestaurant,
  handleRegisterCustomer,
  handleAddAdmin,
};
