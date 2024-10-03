import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
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

const toppings = [
  { name: "mozzarella", label: "Mozzarella" },
  { name: "tomato", label: "Tomato" },
  { name: "bell_peppers", label: "Bell Peppers" },
  { name: "onions", label: "Onions" },
  { name: "olives", label: "Olives" },
];

const Order = () => {
  const [count, setCount] = useState(1);
  const [open, setOpen] = useState(false);

  const timesToDisplay = [1, 2, 3, 4, 5];
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
  } = useForm<OrderSchema>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      toppings: toppings.map((topping) => ({
        name: topping.name,
        checked: topping.name === "olives" ? false : true, // default state
      })),

      // mozzarella: true,
      // tomato: true,
      // bell_peppers: true,
      // onions: true,
      // olives: false,
    },
  });

  const onSubmit: SubmitHandler<OrderSchema> = async (data) => {
    try {
      setOpen(true);
      console.log({ data });
      //   setPersist(data.persist);
      //   localStorage.setItem("persist", JSON.stringify(data.persist));
      //   const response = await axios.post("/login", {
      //     ...data,
      //     role: role || "OWNER",
      //   });
      //   if (response.status === 200) {
      //     const { id, email, fullName, success, role, accessToken } =
      //       response.data;
      //     setAuth({ id, email, fullName, role, accessToken });
      //     navigate("/dashboard", { state: { message: success }, replace: true });
      //   }
      //   console.log(response);
    } catch (err: any) {
      console.error(err);
      //   if (!err?.response) {
      //     setErrMsg("Server can not be reached, Please Try again later!");
      //   } else if (err.response?.status === 400) {
      //     setErrMsg("Missing Email or Password!");
      //   } else if (err.response?.status === 401) {
      //     setErrMsg("Unauthorized, Your Email and/or Password is not correct!");
      //   } else if (err.response?.status === 403) {
      //     setErrMsg("Forbidden,Your account is not approved by Admin!");
      //   } else {
      //     setErrMsg("Login Failed, Please Try again later!");
      //   }
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
          // position: "relative",
          //   mb: "50px",
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
            //   justifyContent: "center",
            gap: "20px",
          }}
        >
          {/* <Box
            sx={{
              width: "522px",
              height: "203px",
            }}
          > */}
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
            Margherita
          </Typography>
          {/* </Box> */}

          {/* <Box
            // width={"412px"}
            height="107px"
            sx={{
              display: "flex",
              gap: "15px",
            }}
          >
            <Controller
              name="mozzarella"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.mozzarella}>
                  <FormControlLabel
                    label="Mozzarella"
                    control={
                      <Checkbox
                        {...field}
                        disabled={isSubmitting}
                        defaultChecked
                        size="large"
                        sx={{
                          "&.Mui-checked": {
                            color: "#FF8100",
                          },
                        }}
                      />
                    }
                  />
                  {errors.mozzarella && (
                    <FormHelperText>{errors.mozzarella.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="tomato"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.tomato}>
                  <FormControlLabel
                    label="Tomato"
                    control={
                      <Checkbox
                        {...field}
                        disabled={isSubmitting}
                        defaultChecked
                        size="large"
                        sx={{
                          "&.Mui-checked": {
                            color: "#FF8100",
                          },
                        }}
                      />
                    }
                  />
                  {errors.tomato && (
                    <FormHelperText>{errors.tomato.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="bell_peppers"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.bell_peppers}>
                  <FormControlLabel
                    label="Bell Peppers"
                    control={
                      <Checkbox
                        {...field}
                        disabled={isSubmitting}
                        defaultChecked
                        size="large"
                        sx={{
                          "&.Mui-checked": {
                            color: "#FF8100",
                          },
                        }}
                      />
                    }
                  />
                  {errors.bell_peppers && (
                    <FormHelperText>
                      {errors.bell_peppers.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
            }}
          >
            <Controller
              name="onions"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.onions}>
                  <FormControlLabel
                    label="Onions"
                    control={
                      <Checkbox
                        {...field}
                        disabled={isSubmitting}
                        defaultChecked
                        size="large"
                        sx={{
                          "&.Mui-checked": {
                            color: "#FF8100",
                          },
                        }}
                      />
                    }
                  />
                  {errors.onions && (
                    <FormHelperText>{errors.onions.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="olives"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.olives}>
                  <FormControlLabel
                    label="Olives"
                    control={
                      <Checkbox
                        {...field}
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
                  {errors.olives && (
                    <FormHelperText>{errors.olives.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Box> */}

          <Controller
            name="toppings"
            control={control}
            render={({ field: { value = [], onChange } }) => (
                  <Grid container spacing="5px">
                    {toppings.map((topping, index) => (
                      <Grid item key={topping.name}>
                        <FormControl
                          error={!!errors.toppings?.[index]?.checked}
                        >
                          <FormControlLabel
                            label={topping.label}
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
              //   width: "395px",
              //   height: "60px",
              display: "flex",
              alignItems: "center",
              gap: "50px",
            }}
          >
            <IconButton
              onClick={() => setCount((prevCount) => prevCount - 1)}
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
                  // height: "440px",
                  // position: "absolute",
                  // top: "50px",
                  // left: "50px",
                }}
                component={"img"}
                src={minus}
                alt="minus"
              />
              <Box
                sx={{
                  position: "absolute",
                  height: "23.33px",
                  // height: "440px",
                  // position: "absolute",
                  // top: "50px",
                  // left: "50px",
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
                {count * 150}
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
            // onClick={() => {}}
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
          // position: "relative",
          // mb: 20,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Inter",
            fontSize: "50px",
            fontWeight: 500,
            lineHeight: "75px",
            color: "#00000080",
            // ml: 5,
            // pt: 13,
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
            {timesToDisplay.map((item) => (
              <RelatedOrderItem key={item} />
            ))}
          </Carousel>
        </Box>
      </Box>
    </Box>
  );
};

export default Order;

const RelatedOrderItem = () => {
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
              //   width: "131px",
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
            Tomato, Mozzarella, Bell Peppers, Onions, Olives
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
