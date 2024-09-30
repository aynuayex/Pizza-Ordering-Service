import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import searchIcon from "@/assets/searchIcon.svg";
// import pizza_slice_egg from "@/assets/pizza_slice_egg.png";
import pizza_slice_egg from "@/assets/pizza_slice_egg.svg";
import leaf_left from "@/assets/leaf_left.svg";
import leaf_right from "@/assets/leaf_right.svg";
import TopRestaurants from "@/components/TopRestaurants";
import FeaturedPizza from "@/components/FeaturedPizza";
import PopularPizzas from "@/components/PopularPizzas";
import Fasting from "@/components/Fasting";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative", // Creating a stacking context
          background:
            "linear-gradient(180deg, #FFFFFF 0%, #FFC993 76%, #FFF8F1 100%)",
        }}
      >
        <Box ml="85px" mt="100px">
          <Stack spacing={6}>
            <Box>
              <Typography
                sx={{
                  textAlign: "left",
                  width: "634px",
                  height: "225px",
                  fontFamily: "Inter",
                  fontSize: "150px",
                  fontWeight: 700,
                  lineHeight: "225px",
                  background:
                    "linear-gradient(90.23deg, #FF8100 -2.97%, #FFBE71 93.66%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Order us
              </Typography>

              <Typography
                sx={{
                  width: "766px",
                  height: "108px",
                  opacity: 0.9,
                  fontFamily: "Roboto",
                  fontSize: "25px",
                  fontWeight: 400,
                  lineHeight: "36.17px",
                  letterSpacing: "0.03em",
                  textAlign: "left",
                  color: "#050505",
                }}
              >
                In publishing and graphic design, Lorem ipsum is a placeholder
                text commonly used to demonstrate the visual form of a document
                or a typeface without.
              </Typography>
            </Box>
            <Box>
              <TextField
                label="Search"
                sx={{
                  "& .MuiInputLabel-root": {
                    textAlign: "left",
                    width: "400.98px",
                    height: "58.02px",
                    top: "20.48px",
                    left: "36.72px",
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: "30px",
                    fontWeight: 500,
                    lineHeight: "45px",
                    color: "#6C727F",
                  },
                }}
                InputProps={{
                  sx: {
                    width: "748px",
                    height: "118px",
                    borderRadius: "100px",
                    bgcolor: "#FFF",
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        onClick={() => {}}
                        sx={{
                          width: "106px",
                          height: "106px",
                          padding: "14px",
                          borderRadius: "50%",
                          bgcolor: "#FF890F",
                        }}
                      >
                        <img
                          src={searchIcon}
                          alt="search Icon"
                          width={50}
                          height={50}
                        />
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Stack>
        </Box>
        <Box
          position="relative" // Creating a stacking context
          zIndex={5} // This ensures your content is above the gradient
        >
          <Box
            component={"img"}
            sx={{
              position: "absolute",
              width: "260px",
              height: "359px",
              top: "100px",
              left: "-165.5px",
            }}
            src={leaf_right}
            alt="leaf right"
          />
          <Box
            component={"img"}
            sx={{
              position: "absolute",
              width: "260px",
              height: "359px",
              top: "505px",
              left: "-40.5px",
              zIndex: -1,
            }}
            src={leaf_left}
            alt="leaf left"
          />
          <Box
            component={"img"}
            mt="35px"
            src={pizza_slice_egg}
            alt="pizza slice with egg"
          />
        </Box>
      </Box>
      <FeaturedPizza />
      <TopRestaurants />
      <PopularPizzas />
      <Fasting />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
