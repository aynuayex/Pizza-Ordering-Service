import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import navbar_logo from "@/assets/navbar_logo.svg";
// import sendIcon from "@/assets/sendIcon.svg";
import sendIcon from "@/assets/sendIcon.png";

const Contact = () => {
  return (
    <Box
      sx={{
        bgcolor: "#CCB691",
        width: "100%",
        height: {xs: "179px", md: "241px"},
        position: "relative",
        // mb: 5,
      }}
    >
      <Stack
        position={"absolute"}
        top={{xs: "28px", md: "22px"}}
        left={{xs: "220px", md: "1179px"}}
        alignSelf={"end"}
        direction={"row"}
        spacing={{ xs: 4, md: 8 }}
        sx={{
          width: {xs: "65px", md: "132.47px"},
          height: {xs: "26.32px", md: "50px"},
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
          width={"50.83px"}
          height={"50px"}
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
        {/* <Typography
          sx={{
            alignSelf: "center",
            width: "66.06px",
            height: "19.48px",
            //   top: "26.78px",
            //   left: "86.41px ",
          }}
          variant="h5"
          color="#AF5901"
          fontWeight={"700"}
          component={"div"}
        >
          Pizza
        </Typography> */}
      </Stack>
      <Box
        sx={{
          boxSizing: "border-box",
          width: "100%",
          position: "absolute",
          top: {xs: "38px", md: "90px"},
          px: {xs: "23px", md: "64px"},
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row"}, gap: {xs: "12.5px", md: "50px"} }}>
          <Typography
            sx={{
              width: { xs: "44px", md: "74px" },
              height: { xs: "29px", md: "36px" },
              fontSize: { xs: "15px", md: "25px" },
              fontWeight: 600,
              lineHeight: { xs: "21.7px", md: "36.17px" },
              letterSpacing: "0.03em",
              color: "#000000",
              textAlign: "left",
            }}
          >
            Home
          </Typography>
          <Typography
            sx={{
              width: { xs: "58px", md: "74px" },
              height: { xs: "29px", md: "36px" },
              fontSize: { xs: "15px", md: "25px" },
              fontWeight: 600,
              lineHeight: { xs: "21.7px", md: "36.17px" },
              letterSpacing: "0.03em",
              color: "#000000",
              textAlign: "left",
            }}
          >
            Order
          </Typography>
          <Typography
            sx={{
              width: { xs: "71px", md: "118px" },
              height: { xs: "29px", md: "36px" },
              fontSize: { xs: "15px", md: "25px" },
              fontWeight: 600,
              lineHeight: { xs: "21.7px", md: "36.17px" },
              letterSpacing: "0.03em",
              color: "#000000",
              textAlign: "left",
            }}
          >
            About Us
          </Typography>
        </Box>
        <TextField
          label="Your feedback..."
          sx={{
            "& .MuiInputLabel-root": {
              textAlign: "left",
              width: "125px",
              height: "24px",
              fontFamily: "Urbanist", 
              letterSpacing: "-0.6%",
              fontSize: {xs: "16px", md: "18px"},
              fontWeight: 500,
              lineHeight: "24px",
              color: "#999999",
            },
          }}
          InputProps={{
            sx: {
              width: { xs: "206px", md: "423px" },
              height: "62px",
              padding: "18px 24px 18px 24px",
              border: "1px solid #26262680",
              borderRadius: "12px",
              bgcolor: "#FFF",
            },
            endAdornment: (
              <InputAdornment position="end">
                {/* <IconButton onClick={() => {}}> */}
                <Box component={"img"} src={sendIcon} alt="send Icon" />
                {/* </IconButton> */}
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default Contact;
