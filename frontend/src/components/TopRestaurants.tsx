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

  // const times = [1, 2, 3, 4, 5];

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
          fontSize: {xs: "15px", md: "50px"},
          fontWeight: 500,
          lineHeight: {xs: "22.5px", md: "75px"},
          color: "#00000080",
          // pl: "20px",
          textAlign: "left",

          pl: {xs: "10px", md: 5},
          pt: 48,
        }}
        gutterBottom
      >
        Top Restaurants
      </Typography>
      <Box pb={20} pl={{xs: "10px", md: 5}}>
        {/* <Carousel
          swipeable={true}
          draggable={true}
          responsive={responsive}
          keyBoardControl={true}
          arrows={false}
          itemClass="carousel-item-padding"
        >
          {times.map((item) => (
              <Slider key={item} />
            ))}
        </Carousel> */}
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
// const Slider = () => {
  return (
    <Box
      sx={{
        width: {xs: "298px", md: "574px"},
        borderRadius: "15px",
        padding: {xs: "15px", md: "23px 0px 23px 31px"},
        bgcolor: "white",
        display: "flex",
        gap: "15px",
      }}
    >
      <Box
        sx={{
          width: {xs: "120px", md: "235px"},
          height: {xs: "60px", md: "108px"},
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
            gap: {xs: "5px",md: "10px"},
          }}
        >
          <Box
            component={"img"}
            src={female}
            alt="profile of female"
            width={{xs: 25, md: 50}}
            height={{xs: 25, md: 50}}
          />
          <Typography
            sx={{
              textAlign: "left",
              width: {xs: "79px", md: "131px"},
              height: {xs: "11px", md: "19px"},
              fontSize: {xs: "12px", md: "20px"},
              fontWeight: 700,
              lineHeight: {xs: "11.36px", md: "18.94px"},
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
            width: {xs: "120px", md: "235px"},
            height: {xs: "30px", md: "48px"},
            fontSize: {xs: "10px", md: "15px"},
            fontWeight: 400,
            lineHeight: {xs: "10.5px", md: "15.75px"},
            letterSpacing: "0.03em",
            color: "#00000080",
          }}
        >
          In publishing and graphic design, Lorem ipsum is a placeholder text<Box component="span" display={{xs: "none", md: "inline-block"}}>commonly used to</Box>...
        </Typography>
      </Box>

      <Box
        sx={{
          width: {xs: "133px", md: "262px"},
          height: {xs: "60px", md: "108px"},
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
            width: {xs: "40px", md: "80px"},
            height: {xs: "40px", md: "80px"},
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#FF810033",
            borderRadius: "50%",
          }}
        >
          <Box
            sx={{
              width: {xs: "19.64px", md: "39.27px"},
              height: {xs: "24px", md: "48px"},
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: {xs: "9.82px", md: "21px"},
                height: {xs: "5.45px", md: "11px"},
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
              }}
              component={"img"}
              src={hang}
              alt="svg of hang"
            />

            <Box sx={{
                width: {xs: "17.45px", md: "52px"},
                height: {xs: "20.18px", md: "40px"},}} component={"img"} src={innerBox} alt="svg of innerBox" />

            <Box
              sx={{
                width: {xs: "7.64px", md: "16px"},
                height: {xs: "10.91px", md: "23px"},
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
              width: {xs: "43px", md: "132px"},
              height: {xs: "19px", md: "19px"},
              fontSize: {xs: "8px", md: "15px"},
              fontWeight: {xs: 400, md: 500},
              lineHeight: {xs: "7.57px", md: "11.36px"},
              letterSpacing: "0.03em",
              color: "#00000080",
            }}
          >
            Number of order
          </Typography>
          <Typography
            sx={{
              textAlign: "left",
              width: {xs: "39px", md: "64px"},
              height: {xs: "28px", md: "47px"},
              fontSize: {xs: "30px", md: "50px"},
              fontWeight: 700,
              lineHeight: {xs: "28.41px", md: "47.34px"},
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
