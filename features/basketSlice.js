import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      console.log("🚀 ~ file: basketSlice.js:29 ~ action:", action.payload);
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      console.log("🚀 ~ file: basketSlice.js:15 ~ action:", action);
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let newBasket = [...state.items];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`Cant remove product, cause its not in basket`);
      }

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;
export const selectBasketItemsWithId = (state, id) => {
  return state.basket.items.filter((item) => item.id == id);
};

export const selectedBasketTotal = (state) =>
  state.basket.items.reduce((total, item) => (total += item.price), 0);

export default basketSlice.reducer;
