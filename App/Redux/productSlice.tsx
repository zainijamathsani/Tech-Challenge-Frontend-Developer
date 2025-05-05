import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

interface ProductState {
  items: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  categories: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, {rejectWithValue}) => {
    try {
      const res = await axios.get('https://dummyjson.com/products/categories');
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (category: string, {rejectWithValue}) => {
    try {
      const url =
        category === 'all'
          ? 'https://dummyjson.com/products'
          : `https://dummyjson.com/products/category/${category}`;
      const res = await axios.get(url);
      return res.data.products;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCategories.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(fetchProductsByCategory.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProductsByCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default productSlice.reducer;
