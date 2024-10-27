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
    <Box width="100vw">
      <Modal
        open={open}
        setOpen={setOpen}
        text="Your order has been successfully completed!"
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: "25px", md: "70px" },
          bgcolor: "#FFF8F1",
          height: "500px",
          padding: { xs: "14px", md: "51px 51px 0px 51px" },
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
              width: { xs: "220px", md: "500px" },
              height: { xs: "220px", md: "500px" },
              borderRadius: "50%",
              background: "#EA810033",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: { xs: "200px", md: "440px" },
                height: { xs: "200px", md: "440px" },
                position: "absolute",
                top: { xs: "15px", md: "50px" },
                left: { xs: "15px", md: "50px" },
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
                width: { xs: "100px", md: "208px" },
                height: { xs: "100px", md: "208px" },
                borderRadius: "50%",
                background: {xs: "#EA810033", md: "#D9D9D9"},
                position: "relative",
              }}
            >
              <Box
                sx={{
                  width: { xs: "83px", md: "193px" },
                  height: { xs: "85px", md: "196px" },
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
                width: { xs: "100px", md: "208px" },
                height: { xs: "100px", md: "208px" },
                borderRadius: "50%",
                background: {xs: "#693A0070", md: "#0201014D"},
                position: "relative",
              }}
            >
              <Box
                sx={{
                  width: { xs: "73px", md: "173px" },
                  height: { xs: "73px", md: "176px" },
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
            width: { xs: "100%", md: "522px" },
            height: { xs: "296px", md: "203px" },
            my: { xs: 0, md: "60px" },
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Typography
            sx={{
              width: "418px",
              height: "76px",
              fontSize: { xs: "35px", md: "80px" },
              fontWeight: 700,
              lineHeight: { xs: "33.14px", md: "75.75px" },
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
              <Grid container spacing={{xs: 0, md: "5px"}}>
                {pizza.toppings.map((topping, index) => (
                  <Grid item xs={4} key={topping}>
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
                            size={"large"}
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
                width: { xs: "60px", md: "70px" },
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
            </IconButton>
            <Typography
              sx={{
                width: "9px",
                height: "42px",
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
                width: { xs: "60px", md: "70px" },
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
              width: { xs: "384px", md: "522px" },
              height: { xs: "66px", md: "76px" },
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
          width: "100%",
          background: "#FFF8F1",
          pt: { xs: "130px", md: "96px" },
          px: { xs: "20px", md: "89px" },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "15px", md: "50px" },
            fontWeight: 500,
            lineHeight: { xs: "22.5px", md: "75px" },
            color: "#00000080",
            pl: { xs: "5px", md: "20px" },
            textAlign: "left",
          }}
          gutterBottom
        >
          Related
        </Typography>
        <Box pb={{xs: 5, md: 20}}>
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
                .filter((item) => item.id !== pizza.id)
                .slice(0, 5)
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
        width: { xs: "273px", md: "387px" },
        height: { xs: "321px", md: "450px" },
        padding: { xs: "20px", md: "30px" },
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
          width: { xs: "233px", md: "327px" },
          height: { xs: "321px", md: "466px" },
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            width: { xs: "233px", md: "318px" },
            height: { xs: "233px", md: "318px" },
            borderRadius: "50%",
            background: "#EA810033",
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: { xs: "233px", md: "278.83px" },
              height: { xs: "233px", md: "282.95px" },
              position: "absolute",
              top: { xs: "10px", md: "23px" },
              left: { xs: "10px", md: "25px" },
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
              fontSize: { xs: "20px", md: "25px" },
              fontWeight: 700,
              lineHeight: { xs: "18.94px", md: "23.67px" },
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
              fontSize: { xs: "10px", md: "15px" },
              fontWeight: 400,
              lineHeight: { xs: "9.47px", md: "14.2px" },
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
