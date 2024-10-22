import {
  Alert,
  Box,
  Checkbox,
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
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";

import navbar_logo from "../assets/navbar_logo.svg";
import pizza_slice from "../assets/pizza_slice.svg";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import axios from "@/api/axios";
import useAuth from "@/hooks/useAuth";
import { LoadingButton } from "@mui/lab";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddAdminSchema, addAdminSchema } from "@/schema/addAdminSchema";

function AddAdmin() {
  const [open, setOpen] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth();

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
  } = useForm<AddAdminSchema>({
    resolver: zodResolver(addAdminSchema),
    defaultValues: {
      adminName: "",
      email: "",
      phoneNumber: "",
      password: "",
      // confirmPassword: "",
    },
  });

  const role = location?.state?.role;
  const message = location?.state?.message;

  useEffect(() => {
    message && setOpen(true);
  }, [message]);

  const handleClose = (e?: React.SyntheticEvent | Event, reason?: string) => {
    console.log(e);
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onSubmit: SubmitHandler<AddAdminSchema> = async (data) => {
    navigate('/dashboard/order')
    // try {
    //   console.log({ data, role });
    //   const response = await axios.post("/register/admin", {
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
    // } catch (err: any) {
    //   console.error(err);
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
    //   setOpen(true);
    // }
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
          <Alert
            severity={errMsg ? "error" : "info"}
            variant="filled"
            onClose={handleClose}
          >
            {errMsg ? errMsg : message}
          </Alert>
        </Snackbar>
        <Box
          sx={{
            width: "50%",
            display: "flex",
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
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
            bgcolor: "white",
            p: 8,
          }}
        >
          <Stack direction={"row"} spacing={1} mb={3}>
            <img
              src={navbar_logo}
              alt="small pizza slice image"
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
          <Typography variant="h5" sx={{ mb: -1 }}>
            Add Admin
            {/* /{role === "SYSADMIN" ? "Admin" : "Owner"} */}
          </Typography>
          <Divider sx={{ mb: 3 }} />

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
                type="email" // necessary since there is no default
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
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="tel"
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
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
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

          {/* <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
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
          /> */}

          <LoadingButton size="large"
            sx={{
              mt: 2,
              bgcolor: "#FF8100",
            }}
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Continue
          </LoadingButton>
        </Box>
      </Stack>
    </Box>
  );
}

export default AddAdmin;
