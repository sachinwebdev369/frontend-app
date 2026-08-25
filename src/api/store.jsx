import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./features/user"
import productSlice from "./features/product"
import cartSlice from "./features/cart"
import orderSlice from "./features/order"

const store = configureStore({
    reducer: {
        user: userSlice,
        product: productSlice,
        cart: cartSlice,
        order: orderSlice
    }
})

export default store