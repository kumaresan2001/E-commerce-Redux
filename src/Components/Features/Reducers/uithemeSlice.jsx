import { createSlice } from "@reduxjs/toolkit";
const uithemeSlice = createSlice({
  name: "uitheme",
  initialState: {
    searchInput: "",
    mode: "light",
    selectedPrice: "",
    count: 0,
    addedProducts: [],
  },
  reducers: {
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setSelectedPrice: (state, action) => {
      state.selectedPrice = action.payload;
    },
    incrementCount: (state) => {
      state.count += 1;
    },
    addProductToCart: (state, action) => {
      const productId = action.payload;
      if (!state.addedProducts.includes(productId)) {
        state.addedProducts.push(productId);
        state.count += 1;
      }
    },

    removeProductFromCart: (state, action) => {
      const productId = action.payload;
      const index = state.addedProducts.indexOf(productId);
      if (index !== -1) {
        state.addedProducts.splice(index, 1);
        state.count -= 1;
      }
    },
  },
});
export const {
  setSearchInput,
  setMode,
  setSelectedPrice,
  addProductToCart,
  removeProductFromCart,
} = uithemeSlice.actions;
export default uithemeSlice.reducer;
