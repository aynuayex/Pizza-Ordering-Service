const prisma = require("../config/prisma");

const handleGetPopularPizza = async (req, res) => {
try {
  let popularPizzas = await prisma.pizza.findMany({
    select: {
      id: true,
      name: true,
      toppings: true,
      price: true,
      createdBy: true,
      _count: {
        select: { orders: true },  // Count the number of orders for each pizza
      },
    },
    orderBy: {
      orders: { _count: 'desc' },  // Sort by the number of orders (descending)
    },
  });

    // removing refreshToken and password from user
  popularPizzas = popularPizzas.map(pizza => {
    const { refreshToken: toBeRemoved, password: toBeDeleted,  ...userData } = pizza.createdBy
    return { ...pizza, createdBy: { ...userData} }  
  })
  console.log({popularPizzas});
  res.status(200).json(popularPizzas);
} catch (err) {
  console.error("Error updating monthly earnings:", err);
  res.status(500).json({ message: err.message });
}
}

const handleMenuCreate = async (req, res) => {
  try {
    console.log({data: req.body});
    const {name, price, toppings} = req.body;
    const filteredToppings = JSON.parse(toppings).filter(topping => topping.checked).map(topping => topping.name);

    const user = await prisma.user.findUnique({
      where: {email: req.user.email}
    });

    console.log({user})
    const createPizzaMenu = await prisma.pizza.create({
      data: {
        name,
        toppings: filteredToppings,
        price,
        restaurantId: user.restaurantId,
        createdBy: user.id
      }
    })
    console.log({createPizzaMenu})
    res.sendStatus(201);
  } catch (err) {
    console.error("Error updating monthly earnings:", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  handleMenuCreate,
  handleGetPopularPizza,
};
