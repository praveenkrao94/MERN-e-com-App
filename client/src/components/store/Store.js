
import {configureStore} from '@reduxjs/toolkit';

import ProductSlice, {  productFetch } from '../productSlice/ProductSlice';
import CartSlice from '../productSlice/cartSlice/CartSlice';

export const store = configureStore({
    reducer:{
      products: ProductSlice,
      cart:CartSlice
    }
  })
  
  store.dispatch(productFetch());

