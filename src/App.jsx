import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Components/Login/Sign Up/SignUp";
import Sign from "./Components/Login/Sign/Sign";

import Products from "./Components/Products/Products";
import ProductDetailes from "./Components/Products/ProductDetailes";
import AddProductCart from "./Components/Products/AddProductCart";

function App() {
  return (
    <Routes>
      <Route path="/product" element={<Products />} />
      <Route path="/" element={<Sign />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/productdetails/:id" element={<ProductDetailes />} />
      <Route path="/addproductcart" element={<AddProductCart />} />
    </Routes>
  );
}

export default App;
