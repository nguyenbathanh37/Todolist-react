import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

interface User {
    email: string,
    fullname: string,
    isLoggin: boolean
}

const initialState: User = {
    email: '',
    fullname: '',
    isLoggin: false
}

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{email: string, fullname: any}>) => {
            state.isLoggin = true
            state.fullname = action.payload.fullname
            state.email = action.payload.email
        },
        logout: (state) => {
            state.isLoggin = false
            state.fullname = ''
            state.email = ''
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer

export const selectIsLoggin = (state: RootState) => state.auth.isLoggin