import {
  Alert,
  AppBar,
  Box,
  Button,
  Link,
  Snackbar,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import navbar_logo from "@/assets/navbar_logo.svg";
import menu from "@/assets/menu.svg";
import useAuth from "@/hooks/useAuth";
import useLogOut from "@/hooks/useLogOut";
import { useState } from "react";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const logOut = useLogOut();

  const handleClose = (e?: React.SyntheticEvent | Event, reason?: string) => {
    console.log(e);
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // console.log({token: auth?.accessToken});

  const handleLogout = async () => {
    await logOut();
    setMessage("You have logged out of your account!");
    setOpen(true);
    // navigate("/", {
    //   state: { message: "You have logged out of your account!", role },
    // });
    setAuth({
      id: "",
      email: "",
      fullName: "",
      role: "",
      accessToken: "",
    });
  };

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
        <Snackbar
          autoHideDuration={8000}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert
            severity={"info"}
            variant="filled"
            onClose={handleClose}
          >
            {message}
          </Alert>
        </Snackbar>

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
              fontWeight: location.pathname === "/dashboard" ? 700 : 500,
              lineHeight: "36.17px",
              letterSpacing: "0.03em",
            }}
            color={location.pathname === "/dashboard" ? "#FF8100" : "#16120DBF"}
            underline="none"
            component={RouterLink}
            to="/dashboard"
          >
            {/* who we are */}
            Dashboard
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

        {auth?.accessToken ? (
          <Button
            onClick={() => handleLogout()}
            variant="contained"
            sx={{
              display: { xs: "none", md: "block" },
              width: "168px",
              height: "56px",
              fontSize: "25px",
              fontWeight: 700,
              lineHeight: "36.17px",
              letterSpacing: "0.03em",
              padding: "10px 30px 10px 30px",
              bgcolor: "#FF4D4D",
              textTransform: "none",
            }}
            size="large"
          >
            LogOut
          </Button>
        ) : (
          <Button
            onClick={() =>
              navigate("/sign-up", { state: { from: location.pathname } })
            }
            variant="contained"
            sx={{
              display: { xs: "none", md: "block" },
              width: "168px",
              height: "56px",
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
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
