import { Box, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import OrderItem from "./OrderItem";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

export type FastingPizzasApiResponse = {
  id: string;
  name: string;
  price: number;
  toppings: string[];
  _count: { orders: number };
};

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Fasting = () => {
  const axiosPrivate = useAxiosPrivate();
  const timesToDisplay = [1, 2, 3, 4, 5];

  const fastingPizza = useQuery({
    queryKey: ["fasting-pizzas"],
    queryFn: async () => {
      const response = await axiosPrivate.get<FastingPizzasApiResponse[]>("/menu/fasting");
      return response.data;
    },
  });

  console.log({ pizzaMenu: fastingPizza.data });

  return (
    <Box
      sx={{
        background: "#FFF8F1",
        pl: "121px",
        pr: "89px",
        // position: "relative",
        // mb: 10,
        pb: 10,
      }}
    >
      <Typography
        sx={{
          fontFamily: "Inter",
          fontSize: "50px",
          fontWeight: 500,
          lineHeight: "75px",
          color: "#00000080",
          // ml: 5,
          // pt: 13,
          textAlign: "left",
        }}
        gutterBottom
      >
        Fasting
      </Typography>
      <Box>
        <Carousel
          swipeable={true}
          draggable={true}
          responsive={responsive}
          keyBoardControl={true}
          arrows={false}
          itemClass="carousel-item-padding-fasting"
        >
          {fastingPizza.isSuccess && fastingPizza.data.map((item) => (
            <OrderItem key={item.id} pizza={item} />
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default Fasting;
