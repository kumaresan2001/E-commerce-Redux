import { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Avatar,
  IconButton,
  InputAdornment,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { signInAsync } from "../../Features/apiFetch";
import { useFormik } from "formik";
import * as yup from "yup";

const Sign = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.authReducer);

  const Navigate = useNavigate();
  const SignValidationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  });

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: SignValidationSchema,
      onSubmit: (values) => {
        userSign(values);
      },
    });

  const userSign = async (values) => {
    try {
      await dispatch(signInAsync(values));

      if (!error) {
        toast.success("Sign Completed", { position: "top-right" });
        Navigate("/product");
      } else {
        toast.error("Invalid Credential", { position: "top-right" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid Credential", { position: "top-right" });
    }
  };

  const PaperStyle = {
    padding: 20,
    height: "75vh",
    width: 380,
    margin: "40px auto",
    boxShadow: "0 20px 60px rgba(0,0,0,.1)",
  };
  const btnstyle = { margin: "8px 0" };
  const avatarStyle = { backgroundColor: "#1bbd7e" };

  return (
    <div>
      <Grid style={{ marginTop: "100px" }}>
        <Paper elevation={3} style={PaperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle} className="mt-2">
              <LockOutlinedIcon />
            </Avatar>
            <h2 className="fw-bold my-2">Sign In</h2>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              size="small"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email ? errors.email : null}
              className="mb-3"
              type="text"
              fullWidth
              required
            />

            <TextField
              label="Password"
              name="password"
              size="small"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && !!errors.password}
              helperText={
                touched.password && errors.password ? errors.password : null
              }
              className="mb-3"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
              className="mb-4"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <Typography className="text-center p-2">
            Do you have an account ?
            <Link to="/signup" className="mx-2 fw-bold">
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default Sign;
