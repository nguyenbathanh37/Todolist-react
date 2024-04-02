import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoListReducer from "../components/Todolist/todoListSlice"
import i18nReducer from "../i18n/i18nSlice";
import filterReducer from "../components/Filter/filterSlice";
import authReducer from "../components/Login/authSlice"
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
}


const rootReducer = combineReducers({
    todoList: todoListReducer,
    i18n: i18nReducer,
    filter: filterReducer,
    auth: authReducer
})

const persistedAuthReducer = persistReducer(persistConfig, rootReducer) 

const store = configureStore({
    reducer: persistedAuthReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// const store = configureStore({
//     reducer: {
//         todoList: todoListReducer,
//         i18n: i18nReducer,
//         filter: filterReducer,
//         auth: authReducer
//     }
// })

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store

export const persistor = persistStore(store)