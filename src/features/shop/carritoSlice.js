import { createSlice } from "@reduxjs/toolkit";

const carritoSlice = createSlice({
    name: 'carrito',
    initialState: {
        peliculas: [],
    },
    reducers: {
        agregarAlCarrito: (state, action) => {
            const { titulo, horario, imagen } = action.payload;

            const existePeliculaConHorario = state.peliculas.find(
                pelicula => pelicula.titulo === titulo && pelicula.horario.hora === horario.hora
            );

            if (existePeliculaConHorario) {
                existePeliculaConHorario.cantidad += 1;
            } else {
                state.peliculas.push({
                    titulo,
                    horario,
                    imagen,
                    cantidad: 1,
                    precio: horario.precio
                });
            }
        },

        eliminarDelCarrito: (state, action) => {
            const { titulo, horario } = action.payload;
            state.peliculas = state.peliculas.filter(
                pelicula => !(pelicula.titulo === titulo && pelicula.horario.hora === horario)
            );
        },


        decrementarCantidad: (state, action) => {
            const { titulo, horario } = action.payload;
            const producto = state.peliculas.find(
                item => item.titulo === titulo && item.horario.hora === horario.hora
            );

            if (producto && producto.cantidad > 1) {
                producto.cantidad -= 1;
            }
        },
        vaciarCarrito: (state) => {
            state.peliculas = [];
        },
        setCarrito: (state, action) => {
            state.peliculas = action.payload;
        },

    }
});

export const { agregarAlCarrito, eliminarDelCarrito, decrementarCantidad, vaciarCarrito, setCarrito } = carritoSlice.actions;

export default carritoSlice.reducer;
