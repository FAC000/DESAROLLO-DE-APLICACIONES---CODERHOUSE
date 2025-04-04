import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { eliminarDelCarrito, vaciarCarrito } from "../features/shop/carritoSlice";
import { Counter } from '../components/Counter';
import { colors } from '../global/color';
import { agregarCompra } from '../features/cart/historialSlice';


export const Cart = ({ navigation }) => {
    const carrito = useSelector((state) => state.carrito.peliculas);
    const dispatch = useDispatch();

    const manejarEliminarDelCarrito = (titulo, horario) => {
        dispatch(eliminarDelCarrito({ titulo, horario }));
    };

    const totalCarrito = carrito.reduce((total, pelicula) => {
        return total + (pelicula.horario.precio * pelicula.cantidad);
    }, 0);


    const handleFinalizarCompra = () => {
        if (carrito.length > 0) {
            dispatch(agregarCompra(carrito));
            navigation.navigate('Profile')
            dispatch(vaciarCarrito());
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.carritoTitle}>Carrito de Compras</Text>

            {carrito.length > 0 ? (
                <FlatList
                    data={carrito}
                    keyExtractor={(item, index) => `${item.titulo}-${item.horario.hora}`}
                    renderItem={({ item }) => (
                        <View style={styles.carritoItem}>
                            <View style={styles.containerImage}>
                                <Image source={item.imagen} style={styles.imagenCarrito} />
                            </View>

                            <View style={styles.infoContainer}>
                                <Text style={styles.carritoText}>{item.titulo}</Text>
                                <Text style={styles.horarioText}>Horario: {item.horario.hora}</Text>
                                <Text style={styles.textIdiomaFormato}>
                                    {item.horario.formato} - {item.horario.idioma} - ${item.horario.precio}
                                </Text>

                                <View style={styles.contadorContainer}>
                                    <Counter
                                        titulo={item.titulo}
                                        horario={item.horario}
                                        cantidad={item.cantidad}
                                        imagen={item.imagen}
                                    />
                                    <TouchableOpacity onPress={() => manejarEliminarDelCarrito(item.titulo, item.horario.hora)}>
                                        <Text style={styles.eliminarHorario}>
                                            <AntDesign name="delete" size={16} />
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.carritoVacio}>El carrito está vacío</Text>
            )}

            <View style={styles.totalPrecioContainer}>
                <Text style={styles.totalText}>Total a pagar: </Text>
                <Text style={styles.totalPrecio}>${totalCarrito}</Text>
            </View>


            {carrito.length > 0 && (
                <TouchableOpacity style={styles.finalizarButton} onPress={handleFinalizarCompra}>
                    <Text style={styles.finalizarButtonText}>Finalizar Compra</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.uno,
        width: '100%',
    },
    carritoTitle: {
        color: colors.cuatro,
        fontSize: 20,
        fontWeight: "bold",
        textTransform: 'uppercase',
        letterSpacing: 2,
        textShadowColor: colors.tres,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        textAlign: 'center',
        marginBottom: 50,
        marginTop: 30,
        width: '100%',
    },
    carritoItem: {
        flexDirection: 'row',
        height: 'auto',
        padding: 10,
        borderRadius: 5,
        backgroundColor: colors.dos,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    containerImage: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    imagenCarrito: {
        width: 100,
        height: 150,
        borderRadius: 4,
    },
    infoContainer: {
        flex: 1,
        alignItems: 'center',
    },
    carritoText: {
        fontSize: 20,
        color: colors.cinco,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginVertical: 10,
        textShadowColor: colors.tres,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        fontFamily : 'Oswald'
    },

    textIdiomaFormato: {
        color: 'white',
        fontSize: 12,
        textTransform: 'uppercase',
        marginTop: 5,
        fontFamily : 'Oswald',
        letterSpacing: 1
    },
    horarioText: {
        fontSize: 16,
        color: 'white',
        textTransform: 'uppercase',
        letterSpacing: 2,
        fontFamily : 'Oswald'
    },
    contadorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginTop: 10,
    },
    eliminarHorario: {
        color: colors.cinco,
        marginLeft: 40,
    },
    carritoVacio: {
        color: colors.cuatro,
        fontSize: 15,
        textTransform: 'uppercase',
        letterSpacing: 2,
        textShadowColor: colors.tres,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        textAlign: 'center',
        marginBottom: 50,
        marginTop: 30,
    },
    totalPrecioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.dos,
        

    },
    totalText: {
        fontSize: 14,
        fontFamily : 'Oswald',
        color: colors.cinco,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    totalPrecio: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.cinco,
        letterSpacing: 1,
        marginVertical: 10,
        textShadowColor: colors.tres,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },

    finalizarButton: {
        backgroundColor: colors.dos,
        marginTop: 15,
        paddingVertical: 8
    },
    finalizarButtonText: {
        color: colors.cuatro,
        letterSpacing: 2,
        textTransform: 'uppercase',
        textAlign: 'center'
    }

});
