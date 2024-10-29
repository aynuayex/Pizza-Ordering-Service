const prisma = require("../config/prisma");

const handleGetAllRoles = async (req, res) => {
  try {
    // Extract query parameters
    const {
      start = 0,
      size = 10,
      filters = "[]",
      globalFilter = "",
      sorting = "[]",
    } = req.query;

    // Parse filters and sorting (they are passed as JSON strings)
    const parsedFilters = JSON.parse(filters);
    const parsedSorting = JSON.parse(sorting);

    // const user = await prisma.user.findUnique({where: {email: req.user.email}});

    // Build where clause for filtering
    const where = {
      AND: [
        // {pizza: {restaurantId: user.restaurantId}},
        globalFilter
          ? {
              OR: [
                { name: { contains: globalFilter, mode: "insensitive" } }, // Example: global filter on role name
              ],
            }
          : {}, // No global filter if empty
        ...parsedFilters.map((filter) => ({
          [filter.id]: { contains: filter.value, mode: "insensitive" }, // Example filter for string fields
        })),
      ],
    };

    // Build orderBy clause for sorting
    const orderBy = parsedSorting.length
      ? parsedSorting.map((sort) => ({ [sort.id]: sort.desc ? "desc" : "asc" }))
      : [{ createdAt: "asc" }]; // Default sorting if none is provided

    // Fetch data from Prisma
    const roles = await prisma.role.findMany({
      skip: parseInt(start, 10), // for pagination
      take: parseInt(size, 10), // for pagination
      where, // filtering
      orderBy, // sorting
    });

    // Fetch total row count for pagination purposes
    const totalRowCount = await prisma.role.count({
      where,
    });

    // Return the data and the meta information
    res.status(200).json({
      data: roles,
      meta: {
        totalRowCount,
      },
    });
  } catch (err) {
    console.log({err});
    res.status(500).json({ message: err.message });
  }
};

const handleRoleActiveStatus = async (req, res) => {
  try {
    console.log(req.body);
    const { id, isChecked } = req.body;
    const updatedRole = await prisma.role.update({
      where: { id },
      data: { active: isChecked },
    });
    console.log({ updatedRole });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const handleRoleCreateOrUpdate = async (req, res) => {
  try {
    console.log(req.body);
    const { roleName, permissions } = req.body;
    const allowedPermissions = JSON.parse(permissions).filter((item) => item.checked);

    const filterOutPermission = allowedPermissions.map((item) => item.permission);

    const makeDescription = allowedPermissions.map(item => item.label).join(", ");
    console.log({ allowedPermissions, filterOutPermission, makeDescription });

    const createdOrUpdateRole = await prisma.role.upsert({
      create: {
        name: roleName,
        description: makeDescription,
        permissions: JSON.stringify(filterOutPermission),
      },
      update: {
        name: roleName,
        description: makeDescription,
        permissions: JSON.stringify(filterOutPermission),
      },
      where: {name: roleName}
    });
    console.log({ createdOrUpdateRole });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const handleRoleDelete = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.body;
    const usersWithRole = await prisma.user.findMany({
      where: { roleId: id },
    });
    const Role = await prisma.role.findUnique({ where: { id } });

    console.log({ usersWithRole, Role });
    if (Role.name === "CUSTOMER" && usersWithRole.length > 0) {
      return res
        .status(400)
        .json({
          message:
            "Cannot delete role because it is assigned to CUSTOMER users.",
        });
    }

    const deleteRole = await prisma.role.delete({ where: { id } });
    console.log({ deleteRole });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  handleGetAllRoles,
  handleRoleActiveStatus,
  handleRoleDelete,
  handleRoleCreateOrUpdate,
};
