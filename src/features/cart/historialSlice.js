import { createSlice } from '@reduxjs/toolkit';

const historialSlice = createSlice({
    name: 'historial',
    initialState: {
        compras: []
    },
    reducers: {
        agregarCompra: (state, action) => {
            state.compras.push(action.payload);
        },
    }
});

export const { agregarCompra } = historialSlice.actions;
export default historialSlice.reducer;
