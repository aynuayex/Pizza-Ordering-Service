import { Box, Button, Divider, Typography } from "@mui/material";

import female from "@/assets/female.svg";
import pizza_slice_egg_full from "@/assets/pizza_slice_egg_full.png";
import { useNavigate } from "react-router-dom";
import { PizzasApiResponse } from "@/types";

const OrderItem = ({ pizza }: { pizza: PizzasApiResponse }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        width: {xs: "371px", md: "387px"},
        height: {xs: "502px", md: "621px"},
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
          width: {xs: "309px", md: "327px"},
          height: "466px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            width: {xs: "233px", md: "318px"},
            height: {xs: "233px", md: "318px"},
            borderRadius: "50%",
            background: "#EA810033",
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: {xs: "233px", md: "282.83px"},
              height: {xs: "233px", md: "286.95px"},
              position: "absolute",
              top: {xs: "9px", md: "21px"},
              left: {xs: "9px", md: "23px"},
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
            {pizza?.name}
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
            {pizza?.toppings
              .map((topping) =>
                topping
                  .split("_")
                  .map((word) => {
                    return (
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                    );
                  })
                  .join(" ")
              )
              .join(", ")}
          </Typography>
          <Box
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
                {pizza?.price}
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
            <Button
              onClick={() => navigate("/order", { state: { pizza } })}
              variant="contained"
              sx={{
                width: {xs: "169px", md: "188px"},
                height: {xs: "56px", md: "66px"},
                fontSize: { xs: "25px", md: "32px"},
                fontWeight: 700,
                lineHeight: { xs: "36.17px", md: "46.3px"},
                letterSpacing: "0.03em",
                padding: "10px 20px 10px 20px",
                borderRadius: "10px",
                bgcolor: "#FF8100",
                textTransform: "none",
                mb: 0,
              }}
              size="large"
            >
              Order
            </Button>
          </Box>
        </Box>
      </Box>
      <Divider />

      <Box
        sx={{
          height: "65px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          component={"img"}
          src={female}
          alt="profile of female"
          width={50}
          height={50}
        />
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontSize: "20px",
            fontWeight: 700,
            lineHeight: "18.94px",
            letterSpacing: "0.03em",
            color: "#000000BF",
          }}
        >
          {pizza.createdBy.fullName
            .split(" ")
            .map((word) => {
              return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            })
            .join(" ")}
        </Typography>
      </Box>
    </Box>
  );
};

export default OrderItem;
