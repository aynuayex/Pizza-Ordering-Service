import NavBar from "@/components/NavBar";
import { Box, CircularProgress } from "@mui/material";
import { Outlet, useNavigation } from "react-router-dom";

const RootLayout = () => {
  const navigation = useNavigation();

  return (
    <Box
      sx={{
        // width: "100vw",
        // height: "100vh",
        // position: 'relative', // Create a stacking context
        // background:
        //   "linear-gradient(180deg, #FFFFFF 0%, #FFC993 76%, #FFF8F1 100%)",
      }}
    >
      <NavBar />
      {navigation.state === "loading" ? (
        <Box
          sx={{
            // width: "100%",
            // height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // zIndex: 10, // Higher z-index to show above the gradient
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            // zIndex: 5,  // This ensures your content is above the gradient
            // position: 'relative', // Ensure z-index works
          }}
        >
          <Outlet />
        </Box>
      )}
    </Box>
  );
};

export default RootLayout;
