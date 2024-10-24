const prisma = require("../config/prisma");

const handleGetPopularRestaurant = async (req, res) => {
  try {
    // Step 1: Fetch all restaurants with their pizzas and the total number of orders for each pizza
    const restaurantsWithOrderCounts = await prisma.restaurant.findMany({
      select: {
        id: true,
        name: true,
        pizzas: {
          select: {
            orders: {
              select: {
                id: true, // Count the orders per pizza
              },
            },
          },
        }
      },
    });

    // Step 2: Calculate the total orders for each restaurant and sort by total orders in descending order
    const popularRestaurants = restaurantsWithOrderCounts
      .map((restaurant) => {
        const totalOrders = restaurant.pizzas.reduce(
          (sum, pizza) => sum + pizza.orders.length, // Sum up all orders from pizzas
          0
        );
        return {
          id: restaurant.id,
          name: restaurant.name,
          totalOrders,
        };
      })
      .sort((a, b) => b.totalOrders - a.totalOrders); // Sort by total orders in descending order

      console.log({restaurantsWithOrderCounts: {...restaurantsWithOrderCounts[0], pizzas: JSON.stringify(restaurantsWithOrderCounts[0].pizzas)}});
    res.status(200).json(popularRestaurants);
  } catch (err) {
    console.error("Error getting top restaurants", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  handleGetPopularRestaurant,
};
