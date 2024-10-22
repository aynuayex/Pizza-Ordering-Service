import { Box, Button, Typography } from "@mui/material";
import Carousel, { DotProps } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// import carousel1 from "@/assets/carousel1.png";
import carousel1 from "@/assets/carousel1.svg";
// import carousel2 from "@/assets/carousel2.png";
import carousel2 from "@/assets/carousel2.svg";
// import carousel3 from "@/assets/carousel3.svg";
import carousel3 from "@/assets/carousel3.svg";
import { useNavigate } from "react-router-dom";

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

// const CustomDot = ({ onClick, ...rest }) => {
//   const {
//     onMove,
//     index,
//     active,
//     carouselState: { currentSlide, deviceType }
//   } = rest;
//   const carouselItems = [CarouselItem1, CaourselItem2, CarouselItem3];
//   // onMove means if dragging or swiping in progress.
//   // active is provided by this lib for checking if the item is active or not.
//   return (
//     <button
//       className={active ? "active" : "inactive"}
//       onClick={() => onClick()}
//     >
//       {React.Children.toArray(carouselItems)[index]}
//     </button>
//   );
// };

// const CustomDot: React.FC<DotProps> = ({ onClick, active }) => {
//   return (
//     <Box
//       onClick={onClick}
//       sx={{
//         position: "relative",
//         width: "25px",
//         height: "25px",
//         backgroundColor: active ? "#FF9921" : "#B6B6B6",
//         borderRadius: "50%",
//         mx: "27px",
//         cursor: "pointer",
//         overflow: "hidden", // Ensure the pseudo-element doesn't overflow the button
//         "&::before": {
//           content: '""',
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: active ? "100%" : "0%", // Start with no overlay if not active
//           height: "100%",
//           backgroundColor: "#FF9921", // Orange color for the transition
//           transition: "width 1s ease-in-out", // Sync this duration with the carousel
//         },
//         "&:hover::before": {
//           width: "100%", // Ensure the hover effect triggers the animation
//         },
//         transition: "background-color 0.5s ease", // Fallback for basic background-color transition
//       }}
//     />
//   );
// };

const CustomDot: React.FC<DotProps> = ({ onClick, active }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: "25px",
        height: "25px",
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
        // pb: 20,
      }}
    >
      <Typography
        sx={{
          fontFamily: "Inter",
          fontSize: "50px",
          fontWeight: 500,
          lineHeight: "75px",
          color: "#00000080",
          ml: 17,
          pt: 13,
          textAlign: "left",
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
      // customButtonGroup={<CustomButtonGroup />}
      // renderButtonGroupOutside={true}
      keyBoardControl={true}
      arrows={false}
      customTransition="all 1000ms "
      transitionDuration={1000}
    >
      {CarouselArray.map((item) => (
        <Box
          key={item.bgcolor}
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Box
            sx={{
              bgcolor: item.bgcolor,
              width: "1266px",
              height: " 386px",
              display: "flex",
              justifyContent: "space-between",
              borderRadius: "40px",
              overflow: "hidden",
              // ml: 3,
            }}
          >
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 2,
                pl: "71.64px",
              }}
            >
              <Typography
                sx={{
                  //   width: "581.74px",
                  width: "561.74px",
                  height: "97px",
                  fontFamily: "Roboto",
                  fontSize: "45px",
                  fontWeight: 700,
                  lineHeight: "43.06px",
                  letterSpacing: "0.03em",
                  color: "white",
                }}
              >
                Make Your First Order and Get
                <Typography
                  component={"span"}
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "45px",
                    fontWeight: "700",
                    lineHeight: "43.06px",
                    letterSpacing: "0.03em",
                    textAlign: "left",
                    color: "#FF9921",
                    ml: 7,
                  }}
                >
                  50% Off
                </Typography>
              </Typography>
              <Typography
                sx={{
                  //   width: "590.39px",
                  width: "520.39px",
                  height: "61px",
                  fontFamily: "Roboto",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "23.15px",
                  letterSpacing: "0.03em",
                  color: "white",
                  opacity: 0.9,
                  mb: 6,
                }}
              >
                In publishing and graphic design, Lorem ipsum is a placeholder
                text commonly used to demonstrate the visual form of a document
                or a typeface without.
              </Typography>

              <Button 
              onClick={() => navigate("/order")}
                sx={{
                  width: "248.26px",
                  height: "60px",
                  borderRadius: "5px",
                  fontFamily: "Roboto",
                  fontSize: "24px",
                  fontWeight: 700,
                  lineHeight: "34.72px",
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
              //   sx={{
              //     height: "100%", // Ensure the image takes full height of the container
              //     objectFit: "cover", // Maintain aspect ratio while covering the container
              //   }}
            />
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};
