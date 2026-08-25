import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { backendUrl } from "../../serverUrl"

const initialState = {orders: [],allOrders: [],singleOrderInfo: []}

export const allOrder = createAsyncThunk(
    'order/getAll-order-user',
    async () => {
        const response = await axios.post(`${backendUrl}/api/v1/order/all-order`,{},{withCredentials: true})
        return response.data
    })


export const allOrderAdmin = createAsyncThunk(
    'order/getAll-order-admin',
    async () => {
        const response = await axios.post(`${backendUrl}/api/v1/order/all-orders-admin`, {},{withCredentials: true})
        return response.data
    })


export const singleOrder = createAsyncThunk(
    'order/single-order',
    async (id) => {
        const response = await axios.post(`${backendUrl}/api/v1/order/single-order-admin/${id}`,{},{withCredentials: true})
        return response.data
    })


export const updateOrder = createAsyncThunk(
    'order/update-order-admin',
    async ({ orderStatus, id }) => {
        const response = await axios.put(`${backendUrl}/api/v1/order/update-order-admin/${id}`, {orderStatus}, {withCredentials: true})
        return response.data
    })

    
const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
      .addCase(allOrder.pending, (state) => {
                state.loading = true
            })
            .addCase(allOrder.fulfilled, (state, action) => {
                state.loading = false
                state.orders = action.payload.orders
            })
            .addCase(allOrder.rejected, (state, action) => {
                state.loading = false
                state.error = "some error occured"
            })
              .addCase(allOrderAdmin.pending, (state) => {
                            state.loading = true
            })
            .addCase(allOrderAdmin.fulfilled, (state, action) => {
                state.loading = false
                state.allOrders = action.payload.orders
            })
            .addCase(allOrderAdmin.rejected, (state, action) => {
                state.loading = false
                state.error = "some error occured"
            })
            .addCase(updateOrder.pending, (state) => {
                state.loading = true
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.loading = false
                state.error = "some error occured"
            })
            .addCase(singleOrder.pending, (state) => {
                state.Sloading = true
            })
            .addCase(singleOrder.fulfilled, (state, action) => {
                state.Sloading = false
                state.singleOrderInfo = action.payload.getorder
            })            
    }
})

export default orderSlice.reducer