import { Box, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import OrderItem from "./OrderItem";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

export type PopularPizzasApiResponse = {
  id: string;
  name: string;
  price: number;
  toppings: string[];
  _count: { orders: number };
};

const PopularPizzas = () => {
  const axiosPrivate = useAxiosPrivate();
  const timesToDisplay = [1, 2, 3, 4, 5, 6];

  const pizzaMenu = useQuery({
    queryKey: ["popular-pizzas"],
    queryFn: async () => {
      const response = await axiosPrivate.get<PopularPizzasApiResponse[]>("/menu/popular");
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
        // position: "relative",
        pb: "50px",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Inter",
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
            // key={item}
            xs={12}
            md={4}
            // sx={{
            //   display: item.length < 4 ? "block" : { xs: "none", md: "block" }, // Show only 3 items on mobile, all 6 on desktop
            //   // display: item < 4 ? "block" : { xs: "none", md: "block" }, // Show only 3 items on mobile, all 6 on desktop
            // }}
          >
            <OrderItem pizza={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PopularPizzas;
