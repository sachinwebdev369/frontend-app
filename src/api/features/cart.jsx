import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { backendUrl } from "../../serverUrl"
const initialState = {cart: []}

export const getAllCart = createAsyncThunk( // load all cart data from server
    "cart/getAllCart",
    async () => {
        const response = await axios.get(`${backendUrl}/api/v1/cart/get-all-cart`,{ withCredentials: true })
        return response.data
    })

 
export const updateCart = createAsyncThunk( // update cart from server
    "cart/updateCart",
    async ({ id, qty }) => {
        const response = await axios.put(`${backendUrl}cart/updateCart/${id}`, {qty},{ withCredentials: true })
        return response.data
    })


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(getAllCart.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllCart.fulfilled, (state, action) => {
                state.loading = false
                state.cart = action.payload.cart
            })
            .addCase(getAllCart.rejected, (state, action) => {
                state.loading = false
                state.error = "some error occured"
            })
            .addCase(updateCart.pending, (state) => {
                state.uloading = true
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.uloading = false
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.loading = false
                state.error = "some error occured"
            })
    }
})

export default cartSlice.reducer