import { useEffect } from "react";
import TopBar from "./TopBar";
import ProductCard from "./ProductCard";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Features/apiFetch";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productAPIReducer.value);
  const isLoading = useSelector((state) => state.productAPIReducer.isLoading);
  const error = useSelector((state) => state.productAPIReducer.error);
  const searchInput = useSelector((state) => state.uiThemesReducer.searchInput);
  const mode = useSelector((state) => state.uiThemesReducer.mode);
  const sortPrice = useSelector((state) => state.uiThemesReducer.selectedPrice);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const sortedProducts = useSelector((state) => {
    const unsortedProducts = state.productAPIReducer.value;
    if (sortPrice === "low-high") {
      return unsortedProducts.slice().sort((a, b) => a.price - b.price);
    } else if (sortPrice === "high-low") {
      return unsortedProducts.slice().sort((a, b) => b.price - a.price);
    } else {
      return unsortedProducts;
    }
  });

  const displayData = sortPrice !== "" ? sortedProducts : products;

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  const bgstyles = {
    borderRadius: "0px",
    minHeight: "100vh",
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper sx={bgstyles} elevation={4}>
        <div>
          <TopBar />

          <div className="container-fluid">
            {isLoading && <h4 style={{ textAlign: "center" }}>Loading...</h4>}
            {error && <p>Error: {error}</p>}
            {!isLoading && !error && (
              <div className="d-flex flex-wrap flex-row justify-content-evenly my-5 gap-5">
                {Array.isArray(displayData) &&
                  displayData
                    .filter((item) => {
                      const lowerCasedSearchInput = searchInput.toLowerCase();
                      return (
                        lowerCasedSearchInput === "" ||
                        item.title
                          ?.toLowerCase()
                          .includes(lowerCasedSearchInput) ||
                        false ||
                        item.description
                          ?.toLowerCase()
                          .includes(lowerCasedSearchInput) ||
                        false ||
                        item.category
                          ?.toLowerCase()
                          .includes(lowerCasedSearchInput) ||
                        false ||
                        String(item.price)?.includes(lowerCasedSearchInput) ||
                        false
                      );
                    })
                    .map((item, index) => (
                      <ProductCard key={index._id} item={item} id={item._id} />
                    ))}
              </div>
            )}
          </div>
        </div>
      </Paper>
    </ThemeProvider>
  );
};

export default Products;
