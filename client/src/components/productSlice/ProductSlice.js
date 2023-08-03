import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  status: 'idle', // 'idle', 'loading', 'succeeded', or 'failed'
  error:null
};

export const productFetch = createAsyncThunk(
  'products/productFetch',
  async (id = null , {rejectWithValue}) => {
    try{
        const res = await axios.get('http://localhost:4000/products');
        return res?.data;
    }
    catch(err){
        return rejectWithValue("error occurred" , err);
    }
   
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productFetch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(productFetch.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(productFetch.rejected, (state , action) => {
        state.status = 'failed';
        state.error = action.payload
      });
  },
});

export default productSlice.reducer;



