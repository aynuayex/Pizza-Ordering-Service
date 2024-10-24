import { Box, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import OrderItem from "./OrderItem";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { PizzasApiResponse } from "@/types";

const PopularPizzas = () => {
  const axiosPrivate = useAxiosPrivate();

  const pizzaMenu = useQuery({
    queryKey: ["popular-pizzas"],
    queryFn: async () => {
      const response = await axiosPrivate.get<PizzasApiResponse[]>("/menu/popular");
      return response.data;
    },
  });

  console.log({ pizzaMenu: pizzaMenu.data });

  return (
    <Box
      sx={{
        bgcolor: "#FFF8F1",
        px: "89px",
        mt: -10,
        pb: "50px",
      }}
    >
      <Typography
        sx={{
          fontSize: "50px",
          fontWeight: 500,
          lineHeight: "75px",
          color: "#00000080",
          pl: "20px",
          pt: 30,
          textAlign: "left",
        }}
      >
        Popular Pizzas
      </Typography>
      <Grid container spacing="25px">
        {pizzaMenu.isSuccess && pizzaMenu.data.map((item) => (
          <Grid
            item
            key={item.id}
            xs={12}
            md={4}
          >
            <OrderItem pizza={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PopularPizzas;
