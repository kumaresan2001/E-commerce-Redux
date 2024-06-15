import { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signUpAsync } from "../../Features/apiFetch";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const SignUpValidationSchema = yup.object({
    username: yup.string().required().min(5),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  });

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
      },
      validationSchema: SignUpValidationSchema,
      onSubmit: (values) => {
        userSignUp(values);
      },
    });

  const userSignUp = async (values) => {
    try {
      dispatch(signUpAsync(values));
      toast.success("Signup Completed", { position: "top-right" });
      Navigate("/");
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

  return (
    <div>
      <Grid style={{ marginTop: "100px" }}>
        <Paper elevation={3} style={PaperStyle}>
          <Grid align="center">
            <h2 className="fw-bold my-3">Sign Up</h2>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              size="small"
              type="text"
              required
              fullWidth
              className="mb-3"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.username && errors.username}
              helperText={
                touched.username && errors.username ? errors.username : null
              }
            />
            <TextField
              label="Email"
              name="email"
              size="small"
              type="email"
              required
              fullWidth
              className="mb-3"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
              helperText={touched.email && errors.email ? errors.email : null}
            />
            <TextField
              label="Password"
              name="password"
              size="small"
              className="mb-3"
              type={showPassword ? "text" : "password"}
              required
              fullWidth
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && errors.password}
              helperText={
                touched.password && errors.password ? errors.password : null
              }
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
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
              className="mb-4"
              style={btnstyle}
            >
              Sign Up
            </Button>
          </form>
          <Typography className="text-center p-2">
            Already have an account?
            <Link to="/" className="mx-2 fw-bold">
              Sign In
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default SignUp;
