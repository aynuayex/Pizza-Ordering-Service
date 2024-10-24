const prisma = require("../config/prisma");

const handleGetAllOrders = async (req, res) => {
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

    // Build where clause for filtering
    const where = {
      AND: [
        globalFilter
          ? {
              OR: [
                { name: { contains: globalFilter, mode: "insensitive" } }, // Example: global filter on order name
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
    const orders = await prisma.order.findMany({
      skip: parseInt(start, 10), // for pagination
      take: parseInt(size, 10), // for pagination
      where, // filtering
      orderBy, // sorting
      include: { pizza: true, customer: true }
    });

    // Fetch total row count for pagination purposes
    const totalRowCount = await prisma.order.count({
      where,
    });

    // Return the data and the meta information
    res.status(200).json({
      data: orders.map(order => ({...order, pizza: JSON.stringify(order.pizza), customer: JSON.stringify(order.customer), toppings: JSON.stringify(order.toppings)})),

      meta: {
        totalRowCount,
      },
    });
  } catch (err) {
    console.log({err});
    res.status(500).json({ message: err.message });
  }
};

const handleGetOrderHistory = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: {email: req.user.email}});

    const orderHistory = await prisma.order.findMany({where: { customerId: user.id}, include: {pizza: true}});

    const stringifiedPizzaOrderHistory = orderHistory.map(order => ({ ...order, pizza: JSON.stringify(order.pizza)}));

    res.status(200).json({orderHistory: stringifiedPizzaOrderHistory});
  } catch (err) {
    console.error("Error getting order history:", err);
    res.status(500).json({ message: err.message });
  }
};

const handleOrderCreate = async (req, res) => {
  try {
    console.log({ data: req.body });
    const { count, totalAmount, toppings, pizzaId } = req.body;
    const filteredToppings = JSON.parse(toppings)
      .filter((topping) => topping.checked)
      .map((topping) => topping.name);

    const user = await prisma.user.findUnique({where: {email: req.user.email}});
    const createOrder = await prisma.order.create({
      data: {
        quantity: count,
        totalAmount,
        toppings: filteredToppings,
        customerId: user.id,
        pizzaId,
      },
    });
    console.log({ createOrder });
    res.sendStatus(201);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: err.message });
  }
};

const handleMenuCreate = async (req, res) => {
  try {
    console.log({ data: req.body });
    const { name, price, toppings } = req.body;
    const filteredToppings = JSON.parse(toppings)
      .filter((topping) => topping.checked)
      .map((topping) => topping.name);

    const restaurant = await prisma.user.findUnique({
      where: { email: req.user.email },
    });

    console.log({ restaurant });
    const createPizzaMenu = await prisma.pizza.create({
      data: {
        name,
        toppings: filteredToppings,
        price,
        restaurantId: restaurant.restaurantId,
      },
    });
    console.log({ createPizzaMenu });
    res.sendStatus(201);
  } catch (err) {
    console.error("Error updating monthly earnings:", err);
    res.status(500).json({ message: err.message });
  }
};

const handleOrderStatusUpdate = async (req, res) => {
  try {
    console.log(req.body);
    const { id, status } = req.body;
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
    });
    console.log({ updatedOrder });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  handleOrderCreate,
  handleGetAllOrders,
  handleGetOrderHistory,
  handleOrderStatusUpdate,


  handleMenuCreate,
};
