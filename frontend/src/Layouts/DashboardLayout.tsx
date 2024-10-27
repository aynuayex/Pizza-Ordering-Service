import React, { useState, useEffect } from "react";
import {
  Outlet,
  Link as RouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import {
  Box,
  Drawer as MuiDrawer,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Badge,
  useMediaQuery,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

import useAuth from "@/hooks/useAuth";
import useLogOut from "../hooks/useLogOut";

import closeIcon from "@/assets/closeIcon.svg";
import navbar_logo from "@/assets/navbar_logo.svg";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const drawerWidth = 258;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function DashboardLayout() {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const location = useLocation();
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const logOut = useLogOut();

  useEffect(() => {
    matches && setOpen(false);
  }, []);

  // useEffect(() => {
  //   if (location.pathname === "/dashboard") {
  //     navigate("/register_restaurant");
  //     return;
  //   }
  // }, [])

  const list = [
    {
      text: "Orders",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.88 4.83604L10.63 0.695566C10.4371 0.597913 10.2204 0.546692 10 0.546692C9.77965 0.546692 9.56289 0.597913 9.37 0.695566L1.12 4.83604C0.913567 4.93957 0.741297 5.09208 0.621226 5.27759C0.501154 5.4631 0.437698 5.67478 0.4375 5.89049V14.1096C0.437698 14.3253 0.501154 14.5369 0.621226 14.7224C0.741297 14.908 0.913567 15.0605 1.12 15.164L9.37 19.3045C9.56295 19.402 9.77968 19.4531 10 19.4531C10.2203 19.4531 10.4371 19.402 10.63 19.3045L18.88 15.164C19.0864 15.0605 19.2587 14.908 19.3788 14.7224C19.4988 14.5369 19.5623 14.3253 19.5625 14.1096V5.89049C19.5623 5.67478 19.4988 5.4631 19.3788 5.27759C19.2587 5.09208 19.0864 4.93957 18.88 4.83604ZM9.90625 1.59963C9.93384 1.58579 9.96479 1.57853 9.99625 1.57853C10.0277 1.57853 10.0587 1.58579 10.0863 1.59963L17.9228 5.53127L14.7409 7.12713L6.81719 3.15166L9.90625 1.59963ZM9.4375 18.1641L1.65625 14.2599C1.6275 14.2447 1.60367 14.2228 1.5872 14.1964C1.57073 14.1699 1.5622 14.14 1.5625 14.1096V6.44736L9.4375 10.4005V18.1641ZM2.07719 5.53127L5.64625 3.73947L13.5691 7.71494L10 9.50502L2.07719 5.53127ZM18.4375 14.1096C18.4378 14.14 18.4293 14.1699 18.4128 14.1964C18.3963 14.2228 18.3725 14.2447 18.3438 14.2599L10.5625 18.1641V10.3988L13.9375 8.70494V12.0625C13.9375 12.1993 13.9968 12.3304 14.1023 12.4271C14.2077 12.5238 14.3508 12.5781 14.5 12.5781C14.6492 12.5781 14.7923 12.5238 14.8977 12.4271C15.0032 12.3304 15.0625 12.1993 15.0625 12.0625V8.14119L18.4375 6.44736V14.1096Z"
            fill={
              location.pathname === "/dashboard/orders" ? "#FF8100" : "#000"
            }
          />
        </svg>
      ),
      to: "/dashboard/layout/order",
      // to: "/dashboard/orders",
    },
    {
      text: "Add menu",
      icon: (
        <svg
          width="17"
          height="20"
          viewBox="0 0 17 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.88805 8.73837C4.14584 8.73837 4.39308 8.63596 4.57537 8.45368C4.75766 8.27139 4.86006 8.02415 4.86006 7.76636C4.86006 7.50856 4.75766 7.26133 4.57537 7.07904C4.39308 6.89675 4.14584 6.79434 3.88805 6.79434C3.63025 6.79434 3.38302 6.89675 3.20073 7.07904C3.01844 7.26133 2.91603 7.50856 2.91603 7.76636C2.91603 8.02415 3.01844 8.27139 3.20073 8.45368C3.38302 8.63596 3.63025 8.73837 3.88805 8.73837ZM8.74813 10.6805C8.74813 10.9383 8.64572 11.1855 8.46343 11.3678C8.28115 11.5501 8.03391 11.6525 7.77611 11.6525C7.51832 11.6525 7.27108 11.5501 7.0888 11.3678C6.90651 11.1855 6.8041 10.9383 6.8041 10.6805C6.8041 10.4227 6.90651 10.1754 7.0888 9.99314C7.27108 9.81085 7.51832 9.70845 7.77611 9.70845C8.03391 9.70845 8.28115 9.81085 8.46343 9.99314C8.64572 10.1754 8.74813 10.4227 8.74813 10.6805ZM3.88805 14.5666C4.14584 14.5666 4.39308 14.4642 4.57537 14.2819C4.75766 14.0996 4.86006 13.8524 4.86006 13.5946C4.86006 13.3368 4.75766 13.0895 4.57537 12.9072C4.39308 12.725 4.14584 12.6226 3.88805 12.6226C3.63025 12.6226 3.38302 12.725 3.20073 12.9072C3.01844 13.0895 2.91603 13.3368 2.91603 13.5946C2.91603 13.8524 3.01844 14.0996 3.20073 14.2819C3.38302 14.4642 3.63025 14.5666 3.88805 14.5666ZM-1.76523e-05 2.58551C-1.76523e-05 1.1304 1.19556 -0.140997 2.74107 0.0116092C7.77364 0.510225 12.4361 2.87856 15.8069 6.64854C16.847 7.80815 16.5233 9.52959 15.3413 10.3859C13.8036 11.5018 11.5116 13.163 10.2062 14.1117C10.2042 14.5365 10.2042 14.8125 10.2052 15.1731V15.7835C10.2053 16.0322 10.1509 16.2778 10.0459 16.5032C9.94083 16.7286 9.78764 16.9282 9.59711 17.0879C9.40659 17.2477 9.18335 17.3637 8.94313 17.4279C8.7029 17.4921 8.45153 17.5028 8.20672 17.4593C8.00843 18.2622 7.3008 18.9436 6.31712 18.9436C5.63671 18.9436 5.09043 18.6179 4.75314 18.1514L3.46522 19.0816C2.01886 20.1255 -0.00487792 19.0923 -0.0039059 17.3067L-1.76523e-05 2.58551ZM2.59818 1.46283C2.00622 1.40451 1.45704 1.89343 1.45704 2.58551V3.09096C3.89705 3.19359 6.28658 3.81893 8.46407 4.9247C10.6416 6.03046 12.5562 7.59088 14.0787 9.50043L14.4859 9.20494C15.0478 8.79669 15.1197 8.06477 14.7212 7.62055C11.5932 4.12341 7.26729 1.92678 2.59818 1.46477M1.45412 17.3086C1.45401 17.4431 1.49106 17.5749 1.56118 17.6896C1.63129 17.8042 1.73175 17.8973 1.85145 17.9584C1.97114 18.0196 2.10541 18.0465 2.23942 18.0361C2.37343 18.0257 2.50197 17.9785 2.61082 17.8996L4.67927 16.4095C4.78812 16.3312 4.91645 16.2844 5.05016 16.2744C5.18387 16.2643 5.31778 16.2913 5.43714 16.3523C5.55651 16.4134 5.65671 16.5063 5.72673 16.6206C5.79675 16.735 5.83388 16.8664 5.83403 17.0005C5.83403 17.263 6.03718 17.4865 6.31712 17.4865C6.38121 17.4872 6.44479 17.4751 6.50416 17.4509C6.56353 17.4267 6.61749 17.391 6.6629 17.3457C6.70832 17.3005 6.74428 17.2467 6.76868 17.1874C6.79309 17.1281 6.80546 17.0646 6.80507 17.0005V15.7845C6.80507 15.5912 6.88188 15.4057 7.01859 15.269C7.15531 15.1323 7.34074 15.0555 7.53408 15.0555C7.72743 15.0555 7.91286 15.1323 8.04957 15.269C8.18629 15.4057 8.26309 15.5912 8.26309 15.7845C8.26309 15.9206 8.37099 16.0275 8.50415 16.0275C8.5686 16.0275 8.63041 16.0019 8.67598 15.9564C8.72156 15.9108 8.74716 15.849 8.74716 15.7845V15.1799C8.74619 14.7231 8.74521 14.3945 8.75202 13.7326C8.75292 13.6188 8.78047 13.5067 8.83246 13.4054C8.88444 13.3042 8.95943 13.2165 9.0514 13.1494C9.92816 12.5117 11.4776 11.3881 12.8967 10.3597C11.5108 8.63559 9.77389 7.22613 7.80136 6.22495C5.82883 5.22376 3.66583 4.65378 1.45606 4.55287L1.45412 17.3086Z"
            fill={location.pathname === "/dashboard/menu" ? "#FF8100" : "#000"}
          />
        </svg>
      ),
      to: "/dashboard/layout/menu",
    },
    {
      text: "Role",
      icon: React.createElement(PersonOutlineOutlinedIcon),
      to: "/dashboard/layout/role",
    },
    {
      text: "User",
      icon: React.createElement(AccountCircleOutlinedIcon),
      to: "/dashboard/layout/user",
    },
  ];

  const handleLogout = async (role: string | undefined) => {
    await logOut();
    navigate("/sign-in", {
      state: { message: "You have logged out of your account!", role },
    });
    setAuth({
      id: "",
      email: "",
      fullName: "",
      role: "",
      accessToken: "",
    });
  };

  // if (location.pathname === "/dashboard") {
  //   navigate("/register_restaurant");
  //   return;
  // }

  return (
    <Box sx={{ height: "100vh", display: "flex", bgcolor: "#F8F8F8" }}>
      <AppBar
        position="fixed"
        open={open}
        sx={{
          bgcolor: "#FFF",
          borderLeft: "1px solid #0000000D",
          boxShadow: "7px 0px 15px 0px #0000000D",
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            sx={[
              {
                color: "#000",
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              color="#000"
              sx={{
                fontSize: "22px",
                fontWeight: "500",
                lineHeight: "26.63px",
                textAlign: "left",
              }}
            >
              Orders
            </Typography>
            <Box
              sx={{
                width: "88px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Badge badgeContent={1} color="primary">
                <NotificationsOutlinedIcon
                  color="action"
                  sx={{
                    width: "30px",
                    height: "24px",
                  }}
                />
              </Badge>
              <AccountCircleOutlinedIcon
                color="action"
                sx={{
                  width: "24px",
                  height: "24px",
                }}
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: "16.94px",
              textAlign: "left",
            }}
          >
            PIZZA
          </Typography>
          <IconButton onClick={() => setOpen(false)}>
            <img
              src={closeIcon}
              alt="pizza dashboard svg"
              width="24px"
              height="24px"
            />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box
          sx={{
            width: `${open ? "258px" : `${theme.spacing(8)}`}`,
            height: `${open ? "113px" : `${theme.spacing(8)}`}`,
            // width: "258px",
            // height: "113px",
            top: "67px",
            borderWidth: "1px 0px 1px 0px",
            borderStyle: "solid",
            borderColor: "#0000000D",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#FF81000D",
          }}
        >
          <Box
            component={"img"}
            src={navbar_logo}
            alt="small pizza slice image"
            width={"50.83px"}
            height={50}
          />
        </Box>
        <List sx={{ mt: "-8px", mb: "8px" }}>
          {list.map((list) => (
            <ListItem
              key={list.text}
              disablePadding
              sx={{ display: "block", mb: "5px" }}
            >
              <ListItemButton
                component={RouterLink}
                to={list.to}
                sx={[
                  {
                    // width: "162px",
                    // height: "24px",

                    minHeight: 48,
                    mx: "5px",
                    pl: open ? "40px" : "0px",
                    // pr: "40px",
                    // px: 2.5,
                    position: "relative",
                  },
                  open
                    ? {
                        justifyContent: "initial",
                      }
                    : {
                        justifyContent: "center",
                      },
                  {
                    bgcolor:
                      location.pathname === list.to ? "#FF810066" : "inherit",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      left: 0, // Align the border on the left side
                      top: "50%", // Start in the center
                      transform: "translateY(-50%)", // Adjust to center vertically
                      height: "30px",
                      width: "4px",
                      borderRadius: "100px",
                      backgroundColor:
                        location.pathname === list.to
                          ? "#FF8100"
                          : "transparent",
                    },
                    borderRadius: "3px",
                    "& .MuiTypography-root": {
                      textAlign: "left",
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "16.94px",
                    },
                    ":hover": {
                      bgcolor:
                        location.pathname === list.to
                          ? "#FF810066"
                          : "#FF810029",
                      //   opacity: "100%",
                    },
                  },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      color:
                        location.pathname === list.to ? "#FF8100" : "#000000",
                      width: "24px",
                      height: "24px",
                      //   minWidth: 0,
                      justifyContent: "center",
                    },
                    open
                      ? {
                          //   pr: "10px",
                        }
                      : {
                          mr: "auto",
                        },
                  ]}
                >
                  {list.icon}
                </ListItemIcon>
                <ListItemText
                  primary={list.text}
                  sx={[
                    {
                      color:
                        location.pathname === list.to ? "#FF8100" : "#000000",
                    },
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider color="#F8F8F8" sx={{ opacity: 0.4 }} />

        <IconButton sx={{color: "#FF0000", display: {xs: "block", md: "none"}}} onClick={() => handleLogout(undefined)}>
          <LogoutOutlinedIcon color="inherit" />
        </IconButton>

        <Button
          onClick={() => handleLogout(undefined)}
          sx={{
            display: {xs: "none", md: "flex"},
            textTransform: "none",
            fontSize: "18px",
            fontWeight: 500,
            lineHeight: "24px",
            textAlign: "left",
            color: "#FF0000",
            height: "68px",
            padding: "10px 17px 10px 17px",
            gap: "5px",
            ":hover": {
              bgcolor: "transparent",
            },
          }}
          startIcon={<LogoutOutlinedIcon color="inherit" />}
        >
          Logout
        </Button>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
        {/* <Typography sx={{ marginBottom: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography> */}
      </Box>
    </Box>
  );
}
