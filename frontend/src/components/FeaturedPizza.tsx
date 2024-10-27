import { Box, Button, Typography } from "@mui/material";
import Carousel, { DotProps } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import carousel1 from "@/assets/carousel1.svg";
import carousel2 from "@/assets/carousel2.svg";
import carousel3 from "@/assets/carousel3.svg";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { PizzasApiResponse } from "@/types";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
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

const CarouselArray = [
  { bgcolor: "#2F2F2F", img: { src: carousel1, alt: "pizza slice with egg" } },
  { bgcolor: "#50482B", img: { src: carousel2, alt: "pizza slice with egg" } },
  { bgcolor: "#296D60", img: { src: carousel3, alt: "pizza slice with egg" } },
];

const CustomDot: React.FC<DotProps> = ({ onClick, active }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: {xs: "13px", md: "25px"},
        height: {xs: "13px", md: "25px"},
        backgroundColor: active ? "#FF9921" : "#B6B6B6",
        borderRadius: "50%",
        mx: "27px",
        cursor: "pointer",
        transition: "background-color 0.5s ease",
      }}
    />
  );
};

const FeaturedPizza = () => {
  return (
    <Box
      sx={{
        bgcolor: "#FFF8F1",
        position: "relative",
      }}
    >
      <Typography
        sx={{
          fontSize: {xs: "15px", md: "50px"},
          fontWeight: 500,
          lineHeight: {xs: "22.5px", md: "75px"},
          color: "#00000080",
          pl: {xs: "8px", md: "130px"},
          pt: {xs: 13, md: 30},
          textAlign: "left",
          
          // ml: 17,
          // pt: 13,
        }}
        gutterBottom
      >
        Featured pizza
      </Typography>
      <Box mb={20} bgcolor={"inherit"}>
        <Slider />
      </Box>
    </Box>
  );
};

export default FeaturedPizza;

const Slider = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const pizzaMenu = useQuery({
    queryKey: ["featured-pizzas"],
    queryFn: async () => {
      const response = await axiosPrivate.get<PizzasApiResponse[]>("/menu/popular");
      return response.data;
    },
  });

  return (
    <Carousel
      // explicitly setting for both draggable and swipeable to true
      swipeable={true}
      draggable={true}
      responsive={responsive}
      autoPlay={true}
      autoPlaySpeed={1500}
      rewind={true}
      rewindWithAnimation={true}
      showDots={true}
      renderDotsOutside={true}
      customDot={<CustomDot />}
      keyBoardControl={true}
      arrows={false}
      customTransition="all 1000ms "
      transitionDuration={1000}
    >
      {CarouselArray.map((item, index) => (
        <Box
          key={item.bgcolor}
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Box
            sx={{
              bgcolor: item.bgcolor,
              width: {xs: "373.85px", md: "1266px"},
              height: {xs: "205px", md: "386px"},
              display: "flex",
              justifyContent: "space-between",
              borderRadius: {xs: "15px", md: "40px"},
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: {xs: "10px", md: 2},
                pl: {xs: "30px", md: "71.64px"},
              }}
            >
              <Typography
                sx={{
                  width: {xs: "192px", md: "561.74px"},
                  height: {xs: "41px", md: "97px"},
                  fontSize: {xs: "16px", md: "45px"},
                  fontWeight: 700,
                  lineHeight: {xs: "15.31px", md: "43.06px"},
                  letterSpacing: "0.03em",
                  color: "white",
                }}
              >
                Make Your First Order and Get
                <Typography
                  component={"span"}
                  sx={{
                    fontSize: {xs: "16px", md: "45px"},
                    fontWeight: "700",
                    lineHeight: {xs: "15.31px", md: "43.06px"},
                    letterSpacing: "0.03em",
                    textAlign: "left",
                    color: "#FF9921",
                    ml: {xs: 2, md: 7},
                  }}
                >
                  50% Off
                </Typography>
              </Typography>
              <Typography
                sx={{
                  
                  width: {xs: "192px", md: "520.39px"},
                  height: {xs: "41px", md: "61px"},
                  // width: "520.39px",
                  // height: "61px",
                  fontSize: {xs: "8px", md: "16px"},
                  fontWeight: 400,
                  lineHeight: {xs: "11.57px", md: "23.15px"},
                  letterSpacing: "0.03em",
                  color: "white",
                  opacity: 0.9,
                  mb: {xs: 2, md: 6},
                }}
              >
                In publishing and graphic design, Lorem ipsum is a placeholder
                text commonly used to demonstrate the visual form of a document
                or a typeface without.
              </Typography>

              <Button 
              onClick={() => navigate("/order", {state: { pizza: pizzaMenu.isSuccess && pizzaMenu.data[index]}})}
                sx={{
                  width: {xs: "77px",md: "248.26px"},
                  height: {xs: "33px",md: "60px"},
                  borderRadius: "5px",
                  fontSize: {xs: "10px", md: "24px"},
                  fontWeight: 700,
                  lineHeight: {xs: "14.47px", md: "34.72px"},
                  letterSpacing: "0.03em",
                  textTransform: "none",
                  color: "white",
                  bgcolor: "#FF9921",
                  textAlign: "left",
                }}
              >
                Order Now
              </Button>
            </Box>
            <Box
              component={"img"}
              src={item.img.src}
              alt={item.img.alt}
            />
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};
