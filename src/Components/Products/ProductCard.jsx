import PropTypes from "prop-types";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  addProductToCart,
  removeProductFromCart,
} from "../Features/Reducers/uithemeSlice";
import { useState } from "react";
const ProductCard = ({ item, id }) => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.uiThemesReducer.mode);
  const count = useSelector((state) => state.uiThemesReducer.count);
  const addedProducts = useSelector(
    (state) => state.uiThemesReducer.addedProducts
  );

  const [isFavorite, setIsFavorite] = useState(false);

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  const bgstyles = {
    borderRadius: "0px",
    minHeight: "30vh",
    display: "flex",
    flexDirection: "column",
  };

  const isProductInCart = addedProducts.includes(id);

  const handleCartAction = () => {
    if (isProductInCart) {
      dispatch(removeProductFromCart(id));
    } else {
      dispatch(addProductToCart(id));
    }
  };

  const handleFavoriteClick = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };

  return (
    <div className="product-container ">
      <div className="product-wrapper shadow bg-white rounded">
        <div className="product-image-container ">
          <img
            className="shadow bg-white  product-image rounded "
            src={item.image}
            alt="item.title"
          />
        </div>
        <ThemeProvider theme={darkTheme}>
          <Paper sx={bgstyles} elevation={4}>
            <div style={{ marginLeft: "auto" }}>
              <IconButton
                color="primary"
                onClick={() => Navigate(`/productdetails/${id}`)}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h6 style={{ margin: 0, marginRight: "4px" }}>Learn more</h6>

                  <InfoIcon></InfoIcon>
                </div>
              </IconButton>
            </div>
            <div className="p-2 text-center">
              <h5 className="p-2">{item.title}</h5>
              <h6 className="p-1"> {item.category}</h6>
              <h4 className="p-1">&#8377; {item.price}</h4>
              <Button color="primary" onClick={handleCartAction}>
                {count === 0 || !isProductInCart
                  ? "Add to Cart"
                  : "Remove to Cart"}
              </Button>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <IconButton
                onClick={handleFavoriteClick}
                color={isFavorite ? "error" : "red"}
              >
                {/* <FavoriteBorderIcon /> */}
                <FavoriteOutlinedIcon></FavoriteOutlinedIcon>
              </IconButton>
            </div>
          </Paper>
        </ThemeProvider>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  item: PropTypes.object.isRequired,
  mode: PropTypes.object.isRequired,
  id: PropTypes.object.isRequired,
};

export default ProductCard;
