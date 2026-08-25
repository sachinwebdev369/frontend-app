import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../serverUrl";

const initialState = {allProducts: [],queryProduct: [],totalProduct:0,sortByPrice: "Max to Min",sortByStoke: true,singleProduct: {}};

export const getProducts = createAsyncThunk( // load products data from server
    'product/get-products-admin',
    async (pageNo) => {
        const response = await axios.get(`${backendUrl}/api/v1/product/all-products?pageNo=${pageNo}`)
        return response.data
    })


export const getSingleProduct = createAsyncThunk( // load single product data from server
  "product/fetch-singleProduct",
  async (id) => {
    const response = await axios.get(`${backendUrl}/api/v1/product/single-product/${id}`);
    return response.data;
  });


export const fetchCategoryProducts = createAsyncThunk( // load categoryProducts data from server
  "product/fetch-categoryProduct",
  async () => {
    const response = await axios.get(`${backendUrl}/api/v1/product/category-products`);
    console.log("product: ", response);
    return response.data;
  });


export const fetchProductByQuery = createAsyncThunk( // load filter Products data from server
  "product/fetchProduct-query",
  async (query) => {
    const response = await axios.get(`${backendUrl}/api/v1/product/all-products?category=${query}&sort=price`,);
    return response.data;
  });

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
   priceHandler: (state, action) => {
    state.sortByPrice = action.payload
   },
stokeHandler: (state, action) => {
    state.sortByStoke = action.payload
   }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload.myProductCategory;
      })
      .addCase(fetchCategoryProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = "something wrong";
      })
      .addCase(fetchProductByQuery.pending, (state) => {
        state.qloading = true;
      })

      .addCase(getSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductByQuery.fulfilled, (state, action) => {
        state.qloading = false;
        let filteredProducts = action.payload.data;
          filteredProducts = filteredProducts.sort((a, b) => {
            return state.sortByPrice === "Max to Min"
              ? b.price - a.price
              : a.price - b.price;
          });
        
        if (state.sortByStoke) {
         filteredProducts = filteredProducts.filter(product => product.stock);
        }
        state.queryProduct = filteredProducts;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload.product;
      })
     .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload.data
                state.totalProduct = action.payload.totalProduct
            })
  },
});

export const { stokeHandler, priceHandler } = productSlice.actions;

export default productSlice.reducer;