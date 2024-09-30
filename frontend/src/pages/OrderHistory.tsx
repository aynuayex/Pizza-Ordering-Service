import { Box, Grid, Typography } from "@mui/material";

import pizza_slice_egg_full from "@/assets/pizza_slice_egg_full.png";

const OrderHistory = () => {
  const timesToDisplay = [1, 2, 3, 4, 5, 6];
  return (
    <Box
      sx={{
        bgcolor: "#FFF8F1",
        px: "89px",
        // position: "relative",
        pb: "50px",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Inter",
          fontSize: "50px",
          fontWeight: 500,
          lineHeight: "75px",
          color: "#00000080",
          pl: "25px",
          pt: 13,
          textAlign: "left",
        }}
      >
        Order History
      </Typography>
      <Grid container spacing="25px">
        {timesToDisplay.map((item) => (
          <Grid
            item
            key={item}
            xs={12}
            md={4}
            sx={{
              display: item < 3 ? "block" : { xs: "none", md: "block" }, // Show only 2 items on mobile, all 6 on desktop
            }}
          >
            <OrderHistoryItem />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OrderHistory;

const OrderHistoryItem = () => {
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        width: "387px",
        height: "526px",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        borderRadius: "25px",
        bgcolor: "#FFFFFF",
      }}
    >
      <Box
        sx={{
          width: "327px",
          height: "466px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            width: "318px",
            height: "318px",
            borderRadius: "50%",
            background: "#EA810033",
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: "272.83",
              height: "276.95",
              position: "absolute",
              top: "12px",
              left: "12px",
            }}
            component={"img"}
            src={pizza_slice_egg_full}
            alt="pizza slice with egg"
          />
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          flexDirection={"column"}
          gap="10px"
        >
          <Typography
            mt={1}
            sx={{
              textAlign: "left",
              width: "131px",
              height: "24px",
              fontFamily: "Roboto",
              fontSize: "25px",
              fontWeight: 700,
              lineHeight: "23.67px",
              letterSpacing: "0.03em",
              color: "#000000",
            }}
          >
            Margherita
          </Typography>
          <Typography
            sx={{
              textAlign: "left",
              width: "307px",
              height: "28px",
              fontFamily: "Roboto",
              fontSize: "15px",
              fontWeight: 400,
              lineHeight: "14.2px",
              letterSpacing: "0.03em",
              color: "#000000BF",
            }}
          >
            Tomato, Mozzarella, Bell Peppers, Onions, Olives
          </Typography>
          <Box
            width={"327px"}
            height="66px"
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box
              width={"111px"}
              height={"45px"}
              display={"flex"}
              gap="5px"
              alignItems={"center"}
            >
              <Typography
                sx={{
                  textAlign: "left",
                  fontFamily: "Roboto",
                  fontSize: "45px",
                  fontWeight: 700,
                  lineHeight: "44.55px",
                  letterSpacing: "0.03em",
                  color: "#01C550",
                }}
              >
                150
              </Typography>
              <Typography
                sx={{
                  alignSelf: "start",
                  width: "25px",
                  fontFamily: "Roboto",
                  fontSize: "15px",
                  fontWeight: 400,
                  lineHeight: "14.85px",
                  letterSpacing: "0.03em",
                  color: "#000000BF",
                }}
              >
                Birr
              </Typography>
            </Box>
            <Typography
              sx={{
                boxSizing: "border-box",
                width: "188px",
                fontFamily: "Inter",
                fontSize: "32px",
                fontWeight: 700,
                lineHeight: "46.3px",
                letterSpacing: "0.03em",
                padding: "10px 20px 10px 20px",
                color: "#FFA500",
                // color: "#008000",
              }}
            >
              Ordered
              {/* Received */}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
