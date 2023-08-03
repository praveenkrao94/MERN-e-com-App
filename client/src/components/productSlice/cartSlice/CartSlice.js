import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity++;
        state.cartTotalQuantity++;
        state.cartTotalAmount += product.price;

        toast.info(
            `${product.name} quantity updated in cart! Total quantity: ${existingItem.quantity}`
          );
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
        state.cartTotalQuantity++;
        state.cartTotalAmount += product.price;

        
        toast.success(`${product.name} added to cart!`);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },



    removeFromCart (state, action) {
        const nextCartItems = state.cartItems.filter(
            (item) => item.id !== action.payload.id
          )
              state.cartItems = nextCartItems;

              localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.warning(`removed from cart!`);
    },

    decreaseItemQuantity(state, action) {
        const id = action.payload;
        const existingItem = state.cartItems.find((item) => item.id === id);
  
        if (existingItem && existingItem.quantity > 1) {
          existingItem.quantity--;
          state.cartTotalQuantity--;
          state.cartTotalAmount -= existingItem.price;
        }
  
        // Update the local storage with the latest cart state
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      },
    
  },
});

export const { addToCart, removeFromCart , decreaseItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;
