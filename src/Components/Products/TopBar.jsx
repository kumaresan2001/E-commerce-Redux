import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import {
  setSearchInput,
  setMode,
  setSelectedPrice,
} from "../Features/Reducers/uithemeSlice";
import { signOut } from "../Features/Reducers/authSlice";

const TopBar = () => {
  const dispatch = useDispatch();

  const mode = useSelector((state) => state.uiThemesReducer.mode);
  const count = useSelector((state) => state.uiThemesReducer.count);
  const selectedPrice = useSelector(
    (state) => state.uiThemesReducer.selectedPrice
  );

  const handleSearchInputChange = (input) => {
    dispatch(setSearchInput(input));
  };

  const toggleMode = () => {
    dispatch(setMode(mode === "light" ? "dark" : "light"));
  };

  const Navigate = useNavigate();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button color="inherit">E-commerce</Button>
            <Box ml="auto" display="flex" alignItems="center">
              <Link
                to="/addproductcart"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "40px",
                }}
              >
                <ShoppingCartOutlinedIcon />
                <Typography ml="2">{count}</Typography>
              </Link>
            </Box>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "auto",
            }}
          >
            <div style={{ position: "relative", display: "flex" }}>
              <div style={{ position: "relative" }}>
                <SearchIcon
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "8px",
                    transform: "translateY(-50%)",
                    color: "white",
                  }}
                />
                <input
                  style={{
                    width: "200px",
                    paddingLeft: "40px",
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    borderColor: "rgba(255, 255, 255, 0.15)",
                    color: "white",
                  }}
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                  onChange={(e) => {
                    handleSearchInputChange(e.target.value);
                  }}
                />
              </div>

              <div
                style={{
                  position: "relative",
                  display: "flex",
                  marginLeft: "10px",
                }}
              >
                <FormControl size="small" fullWidth style={{ color: "white" }}>
                  <Select
                    onChange={(e) => dispatch(setSelectedPrice(e.target.value))}
                    style={{ color: "white", borderColor: "white" }}
                    value={selectedPrice}
                  >
                    <MenuItem color="inherit" value="low-high">
                      Low - High
                    </MenuItem>
                    <MenuItem color="inherit" value="high-low">
                      High - Low
                    </MenuItem>
                    <MenuItem color="inherit" value="price">
                      Price
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <Button
                color="inherit"
                variant="containd"
                startIcon={
                  mode === "light" ? <Brightness7Icon /> : <Brightness4Icon />
                }
                onClick={() => toggleMode()}
                style={{ marginLeft: "30px", borderRadius: "50px" }}
              ></Button>

              <Button
                color="inherit"
                variant="containd"
                onClick={() => {
                  Navigate("/");
                  dispatch(signOut());
                }}
                sx={{ borderRadius: "50px" }}
              >
                <LogoutOutlinedIcon
                  style={{
                    marginLeft: "10px",
                    color: "white",
                  }}
                />
              </Button>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopBar;
