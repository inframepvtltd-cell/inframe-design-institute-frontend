
import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "./slices/userSlice";
import { cartSlice } from "./slices/cartSlice";

let myStore = configureStore({
    reducer: {
        loginStore: loginSlice.reducer,
        cartStore: cartSlice.reducer,

    }
})

export default myStore;