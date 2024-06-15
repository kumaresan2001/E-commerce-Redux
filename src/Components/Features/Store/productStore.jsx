import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Reducers/productSlice";
import uithemeReducer from "../Reducers/uithemeSlice";
import userReducer from "../Reducers/userSlice";
import userSignReducer from "../Reducers/authSlice";
const store = configureStore({
  reducer: {
    productAPIReducer: productReducer,
    uiThemesReducer: uithemeReducer,
    usersignupReducer: userReducer,
    authReducer: userSignReducer,
  },
});
export default store;
