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
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Divider from "@mui/material/Divider";
import { useContext, useEffect, useState } from "react";

import navbar_logo from "../assets/navbar_logo.svg";
import pizza_slice from "../assets/pizza_slice.svg";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import axios from "@/api/axios";
import useAuth from "@/hooks/useAuth";
import { LoadingButton } from "@mui/lab";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "@/schema/loginSchema";
import { createMongoAbility } from "@casl/ability";
import { AbilityContext } from "@/context/AbilityProvider";

function Login() {
  const [open, setOpen] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth, setPersist } = useAuth();
  const ability = useContext(AbilityContext);

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      persist: JSON.parse(localStorage.getItem("persist") || "false"),
    },
  });

  const from = location?.state?.from;
  const pizza = location?.state?.pizza;
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

  function updateAbility(permissions: string) {
    const { rules } = createMongoAbility(JSON.parse(permissions));

    ability.update(rules);
  }

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      setPersist(data.persist);
      localStorage.setItem("persist", JSON.stringify(data.persist));
      console.log({ data, from });
      const response = await axios.post("/login", data);
      if (response.status === 200) {
        const { id, email, fullName, success, role, accessToken } =
          response.data;
        setAuth({ id, email, fullName, role, accessToken });
        console.log(response.data);
        updateAbility(role.permissions);

        navigate(from === "/dashboard"? "/dashboard/layout/order": from, { state: { message: success, pizza }, replace: true });
        // navigate("/dashboard/layout/order", { state: { message: success }, replace: true });
      }
      console.log(response);
    } catch (err: any) {
      console.error(err);
      if (!err?.response) {
        setErrMsg("Server can not be reached, Please Try again later!");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email or Password!");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized, Your Email and/or Password is not correct!");
      } else if (err.response?.status === 403) {
        setErrMsg("Forbidden,Your account is not approved by Admin!");
      } else {
        setErrMsg("Login Failed, Please Try again later!");
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
            pt: 0
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
            Login
          </Typography>
          <Divider sx={{ mb: 3 }} />

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

          <Controller
            name="persist"
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.persist}>
                <FormControlLabel
                  label="Remember me"
                  control={<Checkbox {...field} disabled={isSubmitting} />}
                />
                {errors.persist && (
                  <FormHelperText>{errors.persist.message}</FormHelperText>
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
            Login
          </LoadingButton>
          <Typography variant="subtitle2" textAlign={"center"}>
            Have not an account?
            <Link
              color="#FF8100"
              underline="none"
              component={RouterLink}
              // to="/sign-up"
              to="/dashboard"
            >
              {" "}
              Sign up
            </Link>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default Login;
