import { configureStore } from "@reduxjs/toolkit";
import { PeliApi } from "../services/shopService";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../services/authService";
import carritoReducer from '../features/shop/carritoSlice'
import authReducer from '../features/user/userSlice'
import historialReducer from '../features/cart/historialSlice'

const store = configureStore({
    reducer: {
        carrito: carritoReducer,
        auth: authReducer,
        historial: historialReducer,
        [PeliApi.reducerPath]: PeliApi.reducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(PeliApi.middleware)
            .concat(authApi.middleware)
})

setupListeners(store.dispatch)

export default store;