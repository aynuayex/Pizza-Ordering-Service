import {
  Box,
  Button,
  ButtonBase,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import pizza_slice_egg_full from "@/assets/pizza_slice_egg_full.svg";
import pizza_slice_tomato_full from "@/assets/pizza_slice_tomato_full.svg";
import arrow_up from "@/assets/arrow_up.svg";
import minus from "@/assets/minus.svg";
import plus from "@/assets/plus.svg";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema, OrderSchema } from "@/schema/orderSchema";
import { useState } from "react";
import Modal from "@/components/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { PizzasApiResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Order = () => {
  const [count, setCount] = useState(1);
  const [open, setOpen] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const location = useLocation();
  const pizza: PizzasApiResponse = location.state?.pizza;

  const pizzaMenu = useQuery({
    queryKey: ["popular-pizzas"],
    queryFn: async () => {
      const response = await axiosPrivate.get<PizzasApiResponse[]>(
        "/menu/popular"
      );
      return response.data;
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
  } = useForm<OrderSchema>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      toppings: pizza.toppings.map((topping) => ({
        name: topping.split(" ").join("_"),
        checked: false, 
      })),
    },
  });

  const onSubmit: SubmitHandler<OrderSchema> = async (data) => {
    try {
      console.log({
        count,
        totalAmount: count * pizza.price,
        toppings: data,
        pizzaId: pizza.id,
      });
      const response = await axiosPrivate.post("/order", {
        count,
        totalAmount: count * pizza.price,
        toppings: JSON.stringify(data.toppings),
        pizzaId: pizza.id,
      });
      console.log(response);
      setOpen(true);
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Modal
        open={open}
        setOpen={setOpen}
        text="Your order has been successfully completed!"
      />
      <Box
        sx={{
          display: "flex",
          gap: "70px",
          bgcolor: "#FFF8F1",
          height: "500px",
          padding: "51px 51px 0px 51px",
        }}
      >
        <Box
          sx={{
            display: "flex",

            gap: "40px",
          }}
        >
          <Box
            sx={{
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background: "#EA810033",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: "440px",
                height: "440px",
                position: "absolute",
                top: "50px",
                left: "50px",
              }}
              component={"img"}
              src={pizza_slice_egg_full}
              alt="pizza slice with egg"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "50px",
            }}
          >
            <Box
              sx={{
                width: "208px",
                height: "208px",
                borderRadius: "50%",
                background: "#D9D9D9",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  width: "193px",
                  height: "196px",
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
              sx={{
                width: "208px",
                height: "208px",
                borderRadius: "50%",
                background: "#0201014D",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  width: "173px",
                  height: "176px",
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                }}
                component={"img"}
                src={pizza_slice_tomato_full}
                alt="pizza slice with tomato full"
              />
            </Box>
          </Box>
        </Box>
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: "522px",
            height: "203px",
            my: "60px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Typography
            sx={{
              width: "418px",
              height: "76px",
              fontFamily: "Roboto",
              fontSize: "80px",
              fontWeight: 700,
              lineHeight: "75.75px",
              letterSpacing: "0.03em",
              color: "#000",
            }}
          >
            {pizza.name}
          </Typography>

          <Controller
            name="toppings"
            control={control}
            render={({ field: { value = [], onChange } }) => (
              <Grid container spacing="5px">
                {pizza.toppings.map((topping, index) => (
                  <Grid item key={topping}>
                    <FormControl error={!!errors.toppings?.[index]?.checked}>
                      <FormControlLabel
                        label={topping
                          .split("_")
                          .map((word) => {
                            return (
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase()
                            );
                          })
                          .join(" ")}
                        control={
                          <Checkbox
                            checked={value[index]?.checked || false}
                            onChange={(e) => {
                              const updatedToppings = [...value];
                              updatedToppings[index] = {
                                ...updatedToppings[index],
                                checked: e.target.checked,
                              };
                              onChange(updatedToppings);
                            }}
                            disabled={isSubmitting}
                            size="large"
                            sx={{
                              "&.Mui-checked": {
                                color: "#FF8100",
                              },
                            }}
                          />
                        }
                      />
                      {errors.toppings?.[index]?.checked && (
                        <FormHelperText>
                          {errors.toppings[index].checked.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                ))}
              </Grid>
            )}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "50px",
            }}
          >
            <IconButton
              onClick={() =>
                count > 0 && setCount((prevCount) => prevCount - 1)
              }
              sx={{
                width: "70px",
                height: "60px",
                padding: "10px 15px 10px 15px",
                gap: "8px",
                borderRadius: "10px",
                border: "2px solid #FF8100",
                bgcolor: "white",
              }}
            >
              <Box
                sx={{
                  width: "23.33px",
                  // height: "440px",
                  // position: "absolute",
                  // top: "50px",
                  // left: "50px",
                }}
                component={"img"}
                src={minus}
                alt="minus"
              />
            </IconButton>
            <Typography
              sx={{
                width: "9px",
                height: "42px",
                fontFamily: "DM Sans",
                fontSize: "32px",
                fontWeight: 400,
                lineHeight: "41.66px",
                letterSpacing: "0.20000000298023224px",
                textAlign: "left",
              }}
            >
              {count}
            </Typography>
            <IconButton
              onClick={() => setCount((prevCount) => prevCount + 1)}
              sx={{
                position: "relative",
                width: "70px",
                height: "60px",
                padding: "10px 15px 10px 15px",
                gap: "8px",
                borderRadius: "10px",
                border: "2px solid #FF8100",
                bgcolor: "white",
              }}
            >
              <Box
                sx={{
                  width: "23.33px",
                }}
                component={"img"}
                src={minus}
                alt="minus"
              />
              <Box
                sx={{
                  position: "absolute",
                  height: "23.33px",
                }}
                component={"img"}
                src={plus}
                alt="plus"
              />
            </IconButton>
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
                {count * pizza.price}
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
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "522px",
              height: "76px",
              display: "flex",
              justifyContent: "space-between",
              padding: "15px 30px 15px 30px",
              borderRadius: "10px",
              bgcolor: "#FF8100",
              textTransform: "none",
            }}
          >
            <Typography
              sx={{
                width: "95px",
                height: "46px",
                fontFamily: "Inter",
                fontSize: "32px",
                fontWeight: 700,
                lineHeight: "46.3px",
                letterSpacing: "0.03em",
              }}
            >
              Order
            </Typography>
            <Box component={"img"} src={arrow_up} alt="arrow up" />
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          background: "#FFF8F1",
          pt: "96px",
          px: "89px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Inter",
            fontSize: "50px",
            fontWeight: 500,
            lineHeight: "75px",
            color: "#00000080",
            textAlign: "left",
          }}
          gutterBottom
        >
          Related
        </Typography>
        <Box pb={20}>
          <Carousel
            swipeable={true}
            draggable={true}
            responsive={responsive}
            keyBoardControl={true}
            arrows={false}
            itemClass="carousel-item-padding-fasting"
          >
            {pizzaMenu.isSuccess &&
              pizzaMenu.data
                .filter((item) => item.id !== pizza.id).slice(0,5)
                .map((item) => <RelatedOrderItem key={item.id} pizza={item} />)}
          </Carousel>
        </Box>
      </Box>
    </Box>
  );
};

export default Order;

const RelatedOrderItem = ({ pizza }: { pizza: PizzasApiResponse }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        boxSizing: "border-box",
        width: "387px",
        height: "450px",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        borderRadius: "25px",
        bgcolor: "#FFFFFF",
      }}
    >
      <Box
        component={ButtonBase}
        onClick={() => navigate("/order", { state: { pizza } })}
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
              textAlign: "center",
              height: "24px",
              fontFamily: "Roboto",
              fontSize: "25px",
              fontWeight: 700,
              lineHeight: "23.67px",
              letterSpacing: "0.03em",
              color: "#000000",
            }}
          >
            {pizza.name}
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
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
        </Box>
      </Box>
    </Box>
  );
};
