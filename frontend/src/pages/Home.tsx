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
import pizza_slice_egg_mobile from "@/assets/pizza_slice_egg_mobile.svg";
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
          width: {
            xs: "100vw",
            md: "100%",
          },
          display: "flex",
          justifyContent: "space-between",
          position: "relative", // Creating a stacking context
          background:
            "linear-gradient(180deg, #FFFFFF 0%, #FFC993 76%, #FFF8F1 100%)",
        }}
      >
        <Box ml={{ xs: "10px", md: "85px" }} mt={{ xs: "50px", md: "100px" }}>
          <Stack spacing={6}>
            <Box>
              <Typography
                sx={{
                  textAlign: "left",
                  // width: "634px",
                  height: "225px",
                  fontSize: { xs: "40px", md: "150px" },
                  fontWeight: 700,
                  lineHeight: { xs: "60px", md: "225px" },
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
                  width: { xs: "246px", md: "766px" },
                  height: { xs: "56px", md: "108px" },
                  opacity: 0.9,
                  mt: { xs: "-160px", md: "0" },
                  fontSize: { xs: "10px", md: "25px" },
                  fontWeight: 400,
                  lineHeight: { xs: "14.47px", md: "36.17px" },
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
                  // pr: { xs: 0, md: 0 },
                  mt: { xs: "-40px", md: "0" },
                  "& .MuiInputLabel-root": {
                    textAlign: "left",
                    width: { xs: "192.09px", md: "400.98px" },
                    height: { xs: "51px", md: "58.02px" },
                    top: { xs: "3px", md: "20.48px" },
                    left: { xs: "5px", md: "26.72px" },
                    fontSize: { xs: "15px", md: "30px" },
                    fontWeight: 500,
                    lineHeight: { xs: "22.5px", md: "45px" },
                    color: "#6C727F",
                  },
                }}
                InputProps={{
                  sx: {
                    width: { xs: "261px", md: "748px" },
                    height: { xs: "57px", md: "118px" },
                    borderRadius: "100px",
                    bgcolor: "#FFF",
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        onClick={() => {}}
                        sx={{
                          width: { xs: "52px", md: "106px" },
                          height: { xs: "52px", md: "106px" },
                          padding: "14px",
                          borderRadius: "50%",
                          bgcolor: "#FF890F",
                        }}
                      >
                        <Box
                          component={"img"}
                          sx={{
                            width: { xs: "28px", md: "50px" },
                            height: { xs: "28px", md: "50px" },
                          }}
                          src={searchIcon}
                          alt="search Icon"
                        />
                        {/* <img
                          // src={searchIcon}
                          // alt="search Icon"
                          width={50}
                          height={50}
                        /> */}
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Stack>
        </Box>
        <Box
          // overflow={"clip"}
          position="relative" // Creating a stacking context
          zIndex={5} // This ensures your content is above the gradient
        >
          <Box
            component={"img"}
            sx={{
              position: "absolute",
              width: { xs: "50.27px", md: "260px" },
              height: { xs: "56.14px", md: "359px" },
              top: { xs: "60px", md: "100px" },
              left: { xs: "-140px", md: "-165.5px" },
            }}
            src={leaf_right}
            alt="leaf right"
          />
          <Box
            component={"img"}
            sx={{
              position: "absolute",
              width: { xs: "53.36px", md: "260px" },
              height: { xs: "59.59px", md: "359px" },
              top: { xs: "170px", md: "505px" },
              left: { xs: "-95px", md: "-40.5px" },
              zIndex: -1,
            }}
            src={leaf_left}
            alt="leaf left"
          />
          <Box
            component={"img"}
            sx={{
              // position: "absolute",
              display: { xs: "none", md: "block" },
              width: { xs: "251.2px", md: "400px" },
              height: { xs: "255px", md: "794px" },
              top: { xs: "", md: "505px" },
              left: { xs: "-200px", md: "-40.5px" },
              zIndex: -1,
              mt: "35px",
            }}
            src={pizza_slice_egg}
            alt="pizza slice with egg"
          />
          {/* <Box
            component={"img"}
            sx={{
              // overflow: "clip",
              position: "absolute",
              display: {xs: "block", md: "none"},
              width: { xs: "251.2px", md: "400px" },
              height: { xs: "255px", md: "794px" },
              top: {xs: "-50px", md: "505px"},
              left: {xs: "-200px", md: "-40.5px"},
              zIndex: -1,
              mt: "35px",
            }}
            src={pizza_slice_egg_mobile}
            alt="pizza slice with egg mobile"
          /> */}
          <Box
            sx={{
              position: "absolute",
              display: { xs: "block", md: "none" },
              width: "100px", 
              height: "255px",
              top: "-50px",
              left: "-100px",
              overflow: "hidden", 
              zIndex: -1,
              mt: "35px",
            }}
          >
            <Box
              component={"img"}
              sx={{
                position: "absolute",
                width: "251.2px", 
                height: "255px",
                left: "-100.6px", 
              }}
              src={pizza_slice_egg_mobile}
              alt="pizza slice with egg mobile"
            />
          </Box>
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
