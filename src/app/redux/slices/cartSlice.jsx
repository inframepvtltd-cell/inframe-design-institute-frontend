import { createSlice } from "@reduxjs/toolkit";

export let cartSlice = createSlice({
    name: 'cartData',
    initialState: {
        cartAllData: []
    },
    reducers: {
        cartDataFunc: function (state, reqData) {
            state.cartAllData = reqData.payload
        }
    }
})

export const { cartDataFunc } = cartSlice.actions
export default cartSlice.reducer