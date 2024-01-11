import { configureStore } from "@reduxjs/toolkit";
import todoListReducer from "../components/Todolist/todoListSlice"
import i18nReducer from "../i18n/i18nSlice";
import filterReducer from "../components/Filter/filterSlice";

const store = configureStore({
    reducer: {
        todoList: todoListReducer,
        i18n: i18nReducer,
        filter: filterReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store