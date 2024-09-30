import { Box, Grid, Typography } from "@mui/material";
import OrderItem from "./OrderItem";

const PopularPizzas = () => {
  const timesToDisplay = [1, 2, 3, 4, 5, 6];
  return (
    <Box
      sx={{
        bgcolor: "#FFF8F1",
        px: "89px",
        mt: -10,
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
          pl: "20px",
          pt: 30,
          textAlign: "left",
        }}
      >
        Popular Pizzas
      </Typography>
      <Grid container spacing="25px">
        {timesToDisplay.map((item) => (
          <Grid
            item
            key={item}
            xs={12}
            md={4}
            sx={{
              display: item < 4 ? "block" : { xs: "none", md: "block" }, // Show only 3 items on mobile, all 6 on desktop
            }}
          >
            <OrderItem />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PopularPizzas;
