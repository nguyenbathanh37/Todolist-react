import { configureStore } from "@reduxjs/toolkit";
import todoListReducer from "../components/Todolist/todoListSlice"
import i18nReducer from "../i18n/i18nSlice";

const store = configureStore({
    reducer: {
        todoList: todoListReducer,
        i18n: i18nReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store