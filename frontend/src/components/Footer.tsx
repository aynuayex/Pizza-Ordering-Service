import { Box, IconButton, Typography } from "@mui/material";

import facebook from "@/assets/facebook.svg";
import linkedin from "@/assets/linkedin.svg";
import twitter from "@/assets/twitter.svg";
import youtube from "@/assets/youtube.svg";

const Footer = () => {
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        bgcolor: "#000",
        width: "100%",
        height: { xs: "162px", md: "104px" },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: { xs: "space-evenly", md: "space-around"},
        alignItems: "center",
        gap: {xs: "20px", md: "655px"},
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          width: "448px",
          height: "44px",
          gap: {xs: "10px", md: "38px"},
        }}
      >
        <Typography
          sx={{
            fontFamily: "Urbanist",
            fontSize: {sx: "14px", md: "18px"},
            fontWeight: 500,
            lineHeight: "24px",
            letterSpacing: "-0.006em",
            textAlign: "left",

            width: "256px",
            height: "24px",
            //   top: "26.78px",
            //   left: "86.41px ",
          }}
          // variant="h5"
          color="#FFF"
          fontWeight={"700"}
          component={"div"}
        >
          @2024 Pizza All Rights Reserved.
        </Typography>
        <Typography
          sx={{
            fontFamily: "Urbanist",
            fontSize: {sx: "14px", md: "18px"},
            fontWeight: 500,
            lineHeight: "24px",
            letterSpacing: "-0.006em",
            textAlign: "left",

            width: "154px",
            height: "24px",
            //   top: "26.78px",
            //   left: "86.41px ",
          }}
          // variant="h5"
          color="#FFF"
          component={"div"}
        >
          Terms & Conditions
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "238px",
          height: "72px",
          padding: "10px 0px",
          gap: "10px",
        }}
      >
        <IconButton
          sx={{
            width: "52px",
            height: "52px",
            padding: "14px",
            gap: "10px",
            borderRadius: "58px",
            bgcolor: "#141414",
          }}
        >
          <Box component={"img"} src={facebook} alt="linkedin" />
        </IconButton>
        <IconButton
          sx={{
            width: "52px",
            height: "52px",
            padding: "14px",
            gap: "10px",
            borderRadius: "58px",
            bgcolor: "#141414",
          }}
        >
          <Box component={"img"} src={linkedin} alt="linkedin" />
        </IconButton>
        <IconButton
          sx={{
            width: "52px",
            height: "52px",
            padding: "14px",
            gap: "10px",
            borderRadius: "58px",
            bgcolor: "#141414",
          }}
        >
          <Box component={"img"} src={twitter} alt="twitter" />
        </IconButton>
        <IconButton
          sx={{
            width: "52px",
            height: "52px",
            padding: "14px",
            gap: "10px",
            borderRadius: "58px",
            bgcolor: "#141414",
          }}
        >
          <Box component={"img"} src={youtube} alt="youtube" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
