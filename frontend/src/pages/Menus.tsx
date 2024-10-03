import {
  Box,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Grid,
  FormLabel,
  FormGroup,
} from "@mui/material";
import { useState } from "react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { addOrderSchema, AddOrderSchema } from "@/schema/addOrderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@/components/Modal";

const toppings = [
  { name: "mozzarella", label: "Mozzarella" },
  { name: "tomato", label: "Tomato" },
  { name: "bell_peppers", label: "Bell Peppers" },
  { name: "onions", label: "Onions" },
  { name: "olives", label: "Olives" },
];

const Menus = () => {
  const [open, setOpen] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
  } = useForm<AddOrderSchema>({
    resolver: zodResolver(addOrderSchema),
    defaultValues: {
      name: "",
      // price: 0,
      toppings: toppings.map((ingredient) => ({
        name: ingredient.name,
        checked: ingredient.name === "olives" ? false : true, // default state
      })),
    },
  });

  const handleClose = (e?: React.SyntheticEvent | Event, reason?: string) => {
    console.log(e);
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const onSubmit: SubmitHandler<AddOrderSchema> = async (data) => {
    try {
      setOpen(true);
      console.log(data);
      // const response = await axiosPrivate.post("/books/upload", {
      //   ...data,
      // });
      // if (response.status === 201) {
      // }
      // console.log(response);
    } catch (err: any) {
      console.error(err);
      // if (err?.response?.status === 409) {
      //   setOpenSnackBar(true);
      //   setMessage(
      //     "The book already exists, please edit on the dashboard or create a new one!"
      //   );
      // }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        // width: `calc(100vw - ${DRAWER_WIDTH + 48}px)`,
        height: `calc(100% - 48px)`,
        borderRadius: "5px",
        bgcolor: "white",
        boxShadow: "0 8px 24px 0 rgba(69, 69, 80, 0.1)",
      }}
    >
      <Snackbar
        autoHideDuration={8000}
        open={openSnackBar}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert severity="error" variant="filled" onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>

      <Modal
        text="You have uploaded the Pizza successfully."
        open={open}
        setOpen={setOpen}
      />

      <Typography
        mt={4}
        gutterBottom
        sx={{
          color: "#525256",
          fontFamily: "Inter",
          fontSize: "22px",
          fontWeight: 500,
          lineHeight: "24px",
          textAlign: "left",
        }}
      >
        Add menu
      </Typography>
      <Box
        sx={{
          width: "459px",
          height: "278px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              autoFocus
              {...field}
              label="Name"
              type="text"
              size="medium"
              required
              disabled={isSubmitting}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        {/* <Box
          sx={{
            display: "flex",

            alignItems: "center",
            gap: 8,
          }}
        >
          <Box
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
          </Box>
        </Box> */}

        <Controller
          name="toppings"
          control={control}
          render={({ field: { value = [], onChange } }) => (
            <FormControl
              component="fieldset"
              // variant="standard"
            >
              <FormLabel
                component="legend"
                sx={{
                  color: "#00000080",
                  fontFamily: "Roboto",
                  fontSize: "22px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  letterSpacing: "0.15000000596046448px",
                  textAlign: "left",
                }}
              >
                Toppings
              </FormLabel>
              <FormGroup>
                <Grid container spacing="5px">
                  {toppings.map((topping, index) => (
                    <Grid item key={topping.name}>
                      <FormControl error={!!errors.toppings?.[index]?.checked}>
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
              </FormGroup>
            </FormControl>
          )}
        />

        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="price"
              type="number"
              size="medium"
              required
              disabled={isSubmitting}
              error={!!errors.price}
              helperText={errors.price?.message}
            />
          )}
        />
      </Box>
      <Button
        startIcon={<FileUploadOutlinedIcon />}
        sx={{
          width: "321px",
          height: "74px",
          padding: "25px 58px 25px 58px",
          border: "1px dashed black",
          borderRadius: "10px",
          textTransform: "none",
          color: "#FF8100",
          fontFamily: "Inter",
          fontSize: "18px",
          fontWeight: 500,
          lineHeight: "24px",
          textAlign: "left",
        }}
      >
        Upload Pizza Photo
      </Button>
      <Button
        variant="contained"
        type="submit"
        sx={{
          width: "321px",
          height: "74px",
          borderRadius: "20px",
          textTransform: "none",
          bgcolor: "#FF8100",
          fontFamily: "Inter",
          fontSize: "18px",
          fontWeight: 500,
          lineHeight: "24px",
          textAlign: "left",
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default Menus;
