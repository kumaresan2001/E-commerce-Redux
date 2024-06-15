import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../global";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${URL}/Products`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

export const signUpAsync = createAsyncThunk("user/signUp", async (userData) => {
  const response = await axios.post(`${URL}/user/register`, userData);
  return response.data;
});

export const signInAsync = createAsyncThunk(
  "auth/signInAsync",
  async (values, { rejectValue }) => {
    try {
      const res = await axios.post(`${URL}/user/login`, values);
      localStorage.setItem("myreact", res.data.token);

      if (res.data.message === "Success") {
        return { user: res.data.user, token: res.data.token };
      } else {
        return rejectValue("Invalid Credential");
      }
    } catch (error) {
      return rejectValue("Invalid Credential");
    }
  }
);
