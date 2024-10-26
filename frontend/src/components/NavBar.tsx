import {
  AppBar,
  Box,
  Button,
  Link,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import navbar_logo from "@/assets/navbar_logo.svg";
import menu from "@/assets/menu.svg";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "inherit",
        boxShadow: "0px 0px 15px 0px rgba(255, 129, 0, 0.2)",
        // boxShadow: "0px 0px 0px 0px rgba(255, 129, 0, 0.2)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          // gap: { xs: "86px" },
        }}
      >
        <Stack
          direction={"row"}
          spacing={{ xs: 4, md: 8 }}
          sx={{
            width: { xs: "65px", md: "132.47px" },
            height: { xs: "26.32px", md: "50px" },
            top: { xs: "10px", md: "12px" },
            left: { xs: "10px", md: "20px" },
          }}
        >
          <Box
            component={"img"}
            sx={{
              position: "absolute",
              width: { xs: "26.76px", md: "50.83px" },
              height: { xs: "26.32px", md: "50px" },
              // top: "100px",
              // left: "-165.5px",
            }}
            src={navbar_logo}
            alt="small pizza slice image"
          />
          {/* <img
            src={navbar_logo}
            alt="small pizza slice image"
            width={{xs: "26.76px", md: "50.83px"}}
            height={50}
          /> */}
          <Typography
            sx={{
              alignSelf: "center",
              fontSize: { xs: "16px", md: "1.5rem" },
              lineHeight: { xs: "0.5", md: "1" },
              width: { xs: "34.78px", md: "66.06px" },
              height: { xs: "10.25px", md: "19.48px" },
              //   width:"66.06px",
              //   height: "19.48px",
              // top: "26.78px",
              // left: "186.41px ",
            }}
            // variant="h5"
            color="#AF5901"
            fontWeight={"700"}
            component={"div"}
          >
            Pizza
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: { xs: "66px", md: 24 },
          }}
        >
          <Link
            sx={{
              width: { xs: "39px", md: "74px" },
              height: { xs: "19px", md: "36px" },
              fontFamily: "sans-serif",
              fontSize: { xs: "13px", md: "25px" },
              fontWeight: location.pathname === "/" ? 700 : 500,
              lineHeight: { xs: "18.81px", md: "36.17px" },
              letterSpacing: "0.03em",
            }}
            color={location.pathname === "/" ? "#FF8100" : "#16120DBF"}
            underline="none"
            component={RouterLink}
            to="/"
          >
            Home
          </Link>

          <Link
            sx={{
              width: { xs: "45px", md: "86px" },
              height: { xs: "19px", md: "36px" },
              fontFamily: "sans-serif",
              fontSize: { xs: "13px", md: "25px" },
              fontWeight: location.pathname === "/order_history" ? 700 : 500,
              lineHeight: { xs: "18.81px", md: "36.17px" },
              letterSpacing: "0.03em",
            }}
            color={
              location.pathname === "/order_history" ? "#FF8100" : "#16120DBF"
            }
            underline="none"
            component={RouterLink}
            to="/order_history"
          >
            Orders
          </Link>

          <Link
            sx={{
              display: { xs: "none", md: "block" },
              width: "144px",
              height: "36px",
              fontFamily: "sans-serif",
              fontSize: "25px",
              fontWeight: location.pathname === "/orders" ? 700 : 500,
              lineHeight: "36.17px",
              letterSpacing: "0.03em",
            }}
            color={location.pathname === "/orders" ? "#FF8100" : "#16120DBF"}
            underline="none"
            component={RouterLink}
            to="/orders"
          >
            who we are
          </Link>

          <Box
            component={"img"}
            sx={{
              display: { xs: "block", md: "none" },
              // position: "absolute",
              // width: { xs: "53.36px", md: "260px" },
              // height: { xs: "59.59px", md: "359px" },
              // top: "505px",
              // left: "-40.5px",
              // zIndex: -1,
            }}
            src={menu}
            alt="menu"
          />

        </Box>

        <Button
          onClick={() => navigate("/sign-up")}
          variant="contained"
          sx={{
            display: { xs: "none", md: "block" },
            width: "168px",
            height: "56px",
            fontFamily: "Inter",
            fontSize: "25px",
            fontWeight: 700,
            lineHeight: "36.17px",
            letterSpacing: "0.03em",
            padding: "10px 30px 10px 30px",
            bgcolor: "#FF890F",
            textTransform: "none",
          }}
          size="large"
        >
          Register
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
