import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const ProductDetailes = () => {
  const Navigate = useNavigate();
  const { id } = useParams();

  const productDetails = useSelector((state) => state.productAPIReducer.value);
  const mode = useSelector((state) => state.uiThemesReducer.mode);

  const product = productDetails.find((product) => product._id === id);

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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div className="productdetails-wrapper shadow bg-white rounded">
            <div className="product-image-container ">
              <img
                className="shadow bg-white  productdetails-image rounded "
                src={product.image}
                alt="item.title"
              />
            </div>
            <ThemeProvider theme={darkTheme}>
              <Paper elevation={4}>
                <div className="p-1">{product.description}</div>
                <Button
                  color="secondary"
                  startIcon={<KeyboardReturnIcon />}
                  onClick={() => Navigate(-1)}
                  style={{ marginLeft: "300px" }}
                >
                  Back
                </Button>
              </Paper>
            </ThemeProvider>
          </div>
        </div>
      </Paper>
    </ThemeProvider>
  );
};

export default ProductDetailes;
