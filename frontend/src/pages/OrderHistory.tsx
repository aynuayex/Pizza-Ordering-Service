import { Box, Grid, Link, Typography } from "@mui/material";

import pizza_slice_egg_full from "@/assets/pizza_slice_egg_full.png";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { Link as RouterLink } from "react-router-dom";
import { Order } from "@/types";
import Toast from "@/components/Toast";

type OrderHistoryApiResponse = {
  orderHistory: Order[];
};

const OrderHistory = () => {
  const axiosPrivate = useAxiosPrivate();

  const { data, isError, isSuccess } = useQuery({
    queryKey: ["ordering-history"],
    queryFn: async () => {
      const response = await axiosPrivate.get<OrderHistoryApiResponse>(
        "/order/history"
      );
      return response.data;
    },
  });

  console.log({ data });
  if (isError) {
    <Toast
      message="There is an Error fetching order History, please try later!"
      severity="error"
    />;
  }

  return (
    <Box
      sx={{
        bgcolor: "#FFF8F1",
        px: { xs: "0px", md: "89px" },
        pb: "50px",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "15px", md: "50px" },
            fontWeight: 500,
            lineHeight: { xs: "22.5px", md: "75px" },
            color: "#00000080",
            pl: { xs: "25px", md: "20px" },
            pt: {xs: 6, md: 13},
            textAlign: "left",
        }}
      >
        Order History
      </Typography>
      {isSuccess && !data.orderHistory?.length && (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            m: 24,
          }}
        >
          <Typography mb={"-6px"}>
            {" "}
            You have not ordered any pizza yet, go to{" "}
            <Link
              color="#FF8100"
              underline="none"
              component={RouterLink}
              to="/"
            >
              Home
            </Link>{" "}
            page and Order One.
          </Typography>
        </Box>
      )}
      <Grid container spacing="25px">
        {isSuccess &&
          data.orderHistory?.map((item, index) => (
            <Grid
              item
              key={item.id}
              xs={12}
              md={4}
              sx={{
                display: index < 2 ? "block" : { xs: "none", md: "block" }, // Show only 2 items on mobile, all 6 on desktop
              }}
            >
              <OrderHistoryItem order={item} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default OrderHistory;

const OrderHistoryItem = ({ order }: { order: Order }) => {
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        width: {xs: "328px", md: "387px"},
        height: {xs: "417px", md: "526px"},
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
          height: {xs: "357px", md: "466px"},
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            width: {xs: "215px", md: "318px"},
            height: {xs: "215px", md: "318px"},
            borderRadius: "50%",
            background: "#EA810033",
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: {xs: "199px", md: "272.83px"},
              height: {xs: "199px", md: "276.95px"},
              position: "absolute",
              top: { xs: "10px", md: "30px" },
              left: { xs: "15px", md: "30px" },
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
              width: "131px",
              height: "24px",
              fontSize: { xs: "20px", md: "25px" },
              fontWeight: 700,
              lineHeight: { xs: "18.94px", md: "23.67px" },
              letterSpacing: "0.03em",
              color: "#000",
            }}
          >
            {JSON.parse(order.pizza).name}
          </Typography>
          <Typography
            sx={{
              
              textAlign: "left",
              width: "307px",
              height: "28px",
              fontSize: { xs: "10px", md: "15px" },
              fontWeight: 400,
              lineHeight: { xs: "9.47px", md: "14.2px" },
              letterSpacing: "0.03em",
              color: "#000000BF",
            }}
          >
            {JSON.parse(order.pizza)
              ?.toppings.map((topping: string) =>
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
            width={{xs: "309px", md: "327px"}}
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
                  fontSize: {xs: "30px", md: "45px"},
                  fontWeight: 700,
                  lineHeight: {xs: "29.7px", md: "44.55px"},
                  letterSpacing: "0.03em",
                  color: "#01C550",
                }}
              >
                {JSON.parse(order.pizza).price}
              </Typography>
              <Typography
                sx={{
                  alignSelf: "start",
                  width: "25px",
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
                fontSize: "32px",
                fontWeight: 700,
                lineHeight: "46.3px",
                letterSpacing: "0.03em",
                padding: "10px 20px 10px 20px",
                color: order.status === "Delivered" ? "#008000" : "#FFA500",
              }}
            >
              {order.status === "Delivered" ? "Received" : "Ordered"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
