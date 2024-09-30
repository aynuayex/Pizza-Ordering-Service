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
        height: "241px",
        position: "relative",
        // mb: 5,
      }}
    >
      <Stack
        position={"absolute"}
        top={"22px"}
        left={"1179px"}
        alignSelf={"end"}
        direction={"row"}
        spacing={1}
        sx={{
          width: "132.47px",
          height: "50px",
        }}
      >
        <img
          src={navbar_logo}
          alt="small pizza slice image"
          width={"50.83px"}
          height={"50px"}
        />
        <Typography
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
        </Typography>
      </Stack>
      <Box
        sx={{
          boxSizing: "border-box",
          width: "100%",
          position: "absolute",
          top: "90px",
          px: "64px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", gap: "50px" }}>
          <Typography
            sx={{
              width: "74px",
              height: "36px",
              fontFamily: "Inter",
              fontSize: "25px",
              fontWeight: 600,
              lineHeight: "36.17px",
              letterSpacing: "0.03em",
              color: "#000000",
              textAlign: "left",
            }}
          >
            Home
          </Typography>
          <Typography
            sx={{
              width: "73px",
              height: "36px",
              fontFamily: "Inter",
              fontSize: "25px",
              fontWeight: 600,
              lineHeight: "36.17px",
              letterSpacing: "0.03em",
              color: "#000000",
              textAlign: "left",
            }}
          >
            Order
          </Typography>
          <Typography
            sx={{
              width: "118px",
              height: "36px",
              fontFamily: "Inter",
              fontSize: "25px",
              fontWeight: 600,
              lineHeight: "36.17px",
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
              fontSize: "18px",
              fontWeight: 500,
              lineHeight: "24px",
              color: "#999999",
            },
          }}
          InputProps={{
            sx: {
              width: "423px",
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
