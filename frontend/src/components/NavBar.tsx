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
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Stack
          direction={"row"}
          spacing={1}
          sx={{ width: "132.47px", height: "50px", top: "12px", left: "20px" }}
        >
          <img
            src={navbar_logo}
            alt="small pizza slice image"
            width={"50.83px"}
            height={50}
          />
          <Typography
            sx={
              {
                alignSelf: "center",
                //   width:"66.06px",
                //   height: "19.48px",
                //   top: "26.78px",
                //   left: "86.41px ",
              }
            }
            variant="h5"
            color="#AF5901"
            fontWeight={"700"}
            component={"div"}
          >
            Pizza
          </Typography>
        </Stack>

        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 24 }}>
          <Link
            sx={{
              width: "74px",
              height: "36px",
              fontFamily: "sans-serif",
              fontSize: "25px",
              fontWeight: location.pathname === "/" ? 700 : 500,
              lineHeight: "36.17px",
              letterSpacing: "0.03em",
            }}
            color={location.pathname === "/" ? "#FF8100": "#16120DBF"}
            underline="none"
            component={RouterLink}
            to="/"
          >
            Home
          </Link>

          <Link
            sx={{
              width: "86px",
              height: "36px",
              fontFamily: "sans-serif",
              fontSize: "25px",
              fontWeight: location.pathname === "/order_history" ? 700 : 500,
              lineHeight: "36.17px",
              letterSpacing: "0.03em",
            }}
            color={location.pathname === "/order_history" ? "#FF8100": "#16120DBF"}
            underline="none"
            component={RouterLink}
            to="/order_history"
          >
            Orders
          </Link>

          <Link
            sx={{
              width: "144px",
              height: "36px",
              fontFamily: "sans-serif",
              fontSize: "25px",
              fontWeight: location.pathname === "/orders" ? 700 : 500,
              lineHeight: "36.17px",
              letterSpacing: "0.03em",
            }}
            color={location.pathname === "/orders" ? "#FF8100": "#16120DBF"}
            underline="none"
            component={RouterLink}
            to="/orders"
          >
            who we are
          </Link>
        </Box>

        <Button
        onClick={() => navigate("/sign-up")}
          variant="contained"
          sx={{
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
