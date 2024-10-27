import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useContext, useState } from "react";

import navbar_logo from "../assets/navbar_logo.svg";
import pizza_slice from "../assets/pizza_slice.svg";
import axios from "@/api/axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import smile from "@/assets/smile.png";
import { LoadingButton } from "@mui/lab";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerRestaurantSchema,
  RegisterRestaurantSchema,
} from "@/schema/registerRestaurantSchema";
import { AbilityContext } from "@/context/AbilityProvider";
import { createMongoAbility } from "@casl/ability";

function RegisterRestaurant() {
  const [open, setOpen] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const ability = useContext(AbilityContext);

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
  } = useForm<RegisterRestaurantSchema>({
    resolver: zodResolver(registerRestaurantSchema),
    defaultValues: {
      adminName: "Super Admin",
      email: "",
      password: "",
      confirmPassword: "",
      location: "",
      restaurantName: "",
      phoneNumber: "",
      termsAndConditions: false,
    },
  });

  const handleClose = (e?: React.SyntheticEvent | Event, reason?: string) => {
    console.log(e);
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function updateAbility(permissions: string) {
    const { rules } = createMongoAbility(JSON.parse(permissions));

    ability.update(rules);
  }

  const onSubmit: SubmitHandler<RegisterRestaurantSchema> = async (data) => {
    try {
      console.log({ data });
      const response = await axios.post("/register/restaurant", data);
      if (response.status === 201) {
        const { success, id, email, fullName, role, accessToken } =
          response.data;
        setAuth({ id, email, fullName, role, accessToken });

        updateAbility(role.permissions);

        navigate("/dashboard/layout/order");
        // navigate('/add_admin');
        // setOpenDialog(true);
      }
      console.log(response);
    } catch (err: any) {
      console.error(err);
      if (!err?.response) {
        setErrMsg("Server can not be reached, Please Try again later!");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing One of the Fields, Please fill All!");
      } else if (err.response?.status === 409) {
        setErrMsg(err.response?.data.message);
      } else {
        setErrMsg("Registration Failed, Please Try again later!");
      }
      setOpen(true);
    }
  };

  return (
    <Box>
      <Stack
        direction="row"
        sx={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <Snackbar
          autoHideDuration={8000}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert severity="error" variant="filled" onClose={handleClose}>
            {errMsg}
          </Alert>
        </Snackbar>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#FF9921",
          }}
        >
          <img
            src={pizza_slice}
            alt="pizza slice image"
            width={"305px"}
            height={"300px"}
          />
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
            bgcolor: "white",
            px: {xs: 3, md: 8},
            pb: {xs: 3, md: 8},
            pt: {xs: 0, md: 8}
          }}
        >
          <Stack direction={"row"} spacing={1} mb={2}>
            <img
              src={navbar_logo}
              alt="medium pizza slice image"
              width={50}
              height={50}
            />
            <Typography
              variant="h5"
              color="#AF5901"
              fontWeight={"700"}
              alignSelf={"center"}
            >
              Pizza
            </Typography>
          </Stack>
          {/* <Typography variant="h5" sx={{ mb: -1 }}>
            Signup as Owner
          </Typography>
          <Divider sx={{ mb: 3 }} /> */}

          <Controller
            name="adminName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <AccountCircleOutlinedIcon />
                    <span style={{ marginLeft: 8 }}>Full Name</span>
                  </div>
                }
                size="small"
                type="text"
                disabled={isSubmitting}
                error={!!errors.adminName}
                helperText={errors.adminName?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                type="email"
                disabled={isSubmitting}
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MailOutlineIcon />
                    <span style={{ marginLeft: 8 }}>Email address</span>
                  </div>
                }
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                error={!!errors.password}
                helperText={errors.password?.message}
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <LockOutlinedIcon />
                    <span style={{ marginLeft: 8 }}>Password</span>
                  </div>
                }
                disabled={isSubmitting}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <LockOutlinedIcon />
                    <span style={{ marginLeft: 8 }}>Confirm Password</span>
                  </div>
                }
                disabled={isSubmitting}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="tel"
                size="small"
                disabled={isSubmitting}
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <PhoneIcon />
                    <span style={{ marginLeft: 8 }}>Phone Number</span>
                  </div>
                }
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
              />
            )}
          />
          <Controller
            name="restaurantName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                type="text"
                disabled={isSubmitting}
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <RestaurantIcon />
                    <span style={{ marginLeft: 8 }}>Restaurant Name</span>
                  </div>
                }
                error={!!errors.restaurantName}
                helperText={errors.restaurantName?.message}
              />
            )}
          />

          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                type="text"
                disabled={isSubmitting}
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <LocationOnIcon />
                    <span style={{ marginLeft: 8 }}>Location</span>
                  </div>
                }
                error={!!errors.location}
                helperText={errors.location?.message}
              />
            )}
          />

          <Button
            size="small"
            fullWidth
            startIcon={<FileUploadOutlinedIcon />}
            sx={{
              // width: "554px",
              // height: "56px",
              padding: "10px",
              border: "1px dashed black",
              borderRadius: "5px",
              textTransform: "none",
              color: "#FF8100",
              fontFamily: "Inter",
              fontSize: "18px",
              fontWeight: 500,
              lineHeight: "24px",
              textAlign: "left",
            }}
          >
            Upload Logo
          </Button>

          <Controller
            name="termsAndConditions"
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.termsAndConditions}>
                <FormControlLabel
                  label="I accept the Terms and Conditions"
                  control={<Checkbox {...field} disabled={isSubmitting} />}
                />
                {errors.termsAndConditions && (
                  <FormHelperText>
                    {errors.termsAndConditions.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />

          <LoadingButton
            sx={{
              bgcolor: "#FF8100",
            }}
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Sign up
          </LoadingButton>
          <Typography variant="subtitle2" textAlign={"center"}>
            Already have an account?
            <Link
              color="#FF8100"
              underline="none"
              component={RouterLink}
              to="/sign-in"
              replace={true}
            >
              {" "}
              Login
            </Link>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default RegisterRestaurant;
