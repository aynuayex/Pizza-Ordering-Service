import { Box, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
// import OrderItem from "./OrderItem";
import OrderItem from "./OrderItem2";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { PizzasApiResponse } from "@/types";

const PopularPizzas = () => {
  const axiosPrivate = useAxiosPrivate();

  const times = [1, 2, 3, 4, 5];

  const pizza = [
    {
      id: "1",
      name: "Margarita",
      price: 150,
      toppings: ["olive"],
      createdBy: {
        id: "string",
        fullName: "string",
        email: "string",
        location: "string",
        phoneNumber: "string",
        refreshToken: "string",
        active: true,
        roleId: "string",
        createdAt: "string",
        updatedAt: "string",
        restaurantId: "string",
      },
      _count: { orders: 5 },
    },
  ];

  const pizzaMenu = useQuery({
    queryKey: ["popular-pizzas"],
    queryFn: async () => {
      const response = await axiosPrivate.get<PizzasApiResponse[]>(
        "/menu/popular"
      );
      return response.data;
    },
  });

  console.log({ pizzaMenu: pizzaMenu.data });

  return (
    <Box
      sx={{
        boxSizing: "border-box",
        bgcolor: "#FFF8F1",
        px: { xs: "15px", md: "89px" },
        mt: -10,
        pb: "50px",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "15px", md: "50px" },
          fontWeight: 500,
          lineHeight: { xs: "22.5px", md: "75px" },
          color: "#00000080",
          pl: { xs: "5px", md: "20px" },
          pt: 30,
          textAlign: "left",
        }}
      >
        Popular Pizzas
      </Typography>
      {/* <Grid
        container
        spacing="25px"
        sx={{ "& .MuiGrid-item": { paddingLeft: { xs: "0px", md: "25px" } } }}
      >
        {times.map((item) => (
          <Grid item key={item} xs={12} md={4}>
            <OrderItem />
          </Grid>
        ))}
      </Grid> */}
      <Grid
        container
        spacing="25px"
        sx={{ "& .MuiGrid-item": { paddingLeft: { xs: "0px", md: "25px" } } }}
      >
        {pizzaMenu.isSuccess &&
          pizzaMenu.data.map((item) => (
            <Grid item key={item.id} xs={12} md={4}>
              <OrderItem pizza={item} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default PopularPizzas;
