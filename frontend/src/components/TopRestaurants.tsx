import { Box, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import female from "@/assets/female.svg";
import hang from "@/assets/hang.svg";
import flash from "@/assets/flash.svg";
import innerBox from "@/assets/innerBox.svg";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import Toast from "./Toast";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
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

type TopRestaurantsApiResponse = {
  id: string;
  name: string;
  totalOrders: number;
};

const TopRestaurants = () => {
  const axiosPrivate = useAxiosPrivate();

  const popularRestaurants = useQuery({
    queryKey: ["restaurants-top"],
    queryFn: async () => {
      const response = await axiosPrivate.get<TopRestaurantsApiResponse[]>(
        "/restaurants/top"
      );
      return response.data;
    },
  });

  if (popularRestaurants.isError) {
    <Toast
      message="There is an Error fetching popular Restaurants, please try later!"
      severity="error"
    />;
  }

  console.log({ popularRestaurants: popularRestaurants.data });

  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, rgba(250, 126, 0, 0) 0%, rgba(250, 126, 0, 0.2) 60.5%, rgba(148, 74, 0, 0) 100%)",
        mt: -36,
      }}
    >
      <Typography
        sx={{
          fontFamily: "Inter",
          fontSize: "50px",
          fontWeight: 500,
          lineHeight: "75px",
          color: "#00000080",
          ml: 5,
          pt: 48,
          textAlign: "left",
        }}
        gutterBottom
      >
        Top Restaurants
      </Typography>
      <Box pb={20} pl={5}>
        <Carousel
          swipeable={true}
          draggable={true}
          responsive={responsive}
          keyBoardControl={true}
          arrows={false}
          itemClass="carousel-item-padding"
        >
          {popularRestaurants.isSuccess &&
            popularRestaurants.data.map((item) => (
              <Slider key={item.id} restaurant={item} />
            ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default TopRestaurants;

const Slider = ({ restaurant }: { restaurant: TopRestaurantsApiResponse }) => {
  return (
    <Box
      sx={{
        width: "574px",
        borderRadius: "15px",
        padding: "23px 0px 23px 31px",
        bgcolor: "white",
        display: "flex",
        gap: "15px",
      }}
    >
      <Box
        sx={{
          width: "235px",
          height: "108px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "191px",
            height: "50px",
            gap: "10px",
          }}
        >
          <Box
            component={"img"}
            src={female}
            alt="profile of female"
            width={50}
            height={50}
          />
          <Typography
            sx={{
              textAlign: "left",
              width: "131px",
              height: "19px",
              fontFamily: "Roboto",
              fontSize: "20px",
              fontWeight: 700,
              lineHeight: "18.94px",
              letterSpacing: "0.03em",
              color: "#000000",
            }}
          >
            {restaurant.name}
            {/* Azmera Pizza */}
          </Typography>
        </Box>
        <Typography
          sx={{
            textAlign: "left",
            width: "235px",
            height: "48px",
            fontFamily: "Inter",
            fontSize: "15px",
            fontWeight: 400,
            lineHeight: "15.75px",
            letterSpacing: "0.03em",
            color: "#00000080",
          }}
        >
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to...
        </Typography>
      </Box>

      <Box
        sx={{
          width: "262px",
          height: "108px",
          padding: "0px 15px",
          gap: "20px",
          borderRadius: "10px",
          background: "#0080000D",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "80px",
            height: "80px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#FF810033",
            borderRadius: "50%",
          }}
        >
          <Box
            sx={{
              width: "39.27px",
              height: "48px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
              }}
              component={"img"}
              src={hang}
              alt="svg of hang"
            />

            <Box component={"img"} src={innerBox} alt="svg of innerBox" />

            <Box
              sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translateX(-50%) translatey(-50%)",
              }}
              component={"img"}
              src={flash}
              alt="svg of flash"
            />
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{
              textAlign: "left",
              width: "132px",
              height: "19px",
              fontFamily: "Inter",
              fontSize: "15px",
              fontWeight: 500,
              lineHeight: "11.36px",
              letterSpacing: "0.03em",
              color: "#00000080",
            }}
          >
            Number of order
          </Typography>
          <Typography
            sx={{
              textAlign: "left",
              width: "64px",
              height: "47px",
              fontFamily: "Roboto",
              fontSize: "50px",
              fontWeight: 700,
              lineHeight: "47.34px",
              letterSpacing: "0.03em",
              color: "#FF8100",
            }}
          >
            {restaurant.totalOrders}
            {/* 2K */}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
