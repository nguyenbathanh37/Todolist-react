import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

interface User {
    user_id: string,
    email: string,
    fullname: string,
    isLoggin: boolean
}

const initialState: User = {
    user_id: '',
    email: '',
    fullname: '',
    isLoggin: false
}

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.user_id = action.payload.user_id
            state.isLoggin = action.payload.isLoggin
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
export const selectUserID = (state: RootState) => state.auth.user_id