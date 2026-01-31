import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export let loginSlice = createSlice({
    name: 'loginData',
    initialState: {
        user: Cookies.get("USER") ? JSON.parse(Cookies.get("USER")) : null,
        token: Cookies.get("TOKEN") ?? ""
    },
    reducers: {
        loginUserData: function (state, reqData) {
            state.user = reqData.payload.user
            state.token = reqData.payload.token
            Cookies.set("USER", JSON.stringify(reqData.payload.user))
            Cookies.set("TOKEN", state.token)
        },
        logoutUser: function (state) {
            state.user = null
            state.token = ''
            Cookies.remove("USER")
            Cookies.remove("TOKEN")
        }
    }
})

export const { loginUserData, logoutUser } = loginSlice.actions;
export default loginSlice.reducer