import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { agregarAlCarrito, decrementarCantidad } from '../features/shop/carritoSlice';
import { colors } from '../global/color';

export const Counter = ({ titulo, horario, cantidad, imagen }) => {
    const dispatch = useDispatch();

    const manejarIncrementar = () => {
        dispatch(agregarAlCarrito({ titulo, horario, imagen }));
    };

    const manejarDecrementar = () => {
        if (cantidad > 1) {
            dispatch(decrementarCantidad({ titulo, horario }));
        }
    };

    return (
        <View style={styles.contadorContainer}>
            <TouchableOpacity onPress={manejarDecrementar} style={styles.button}>
                <AntDesign name="minussquareo" size={22} color="white" />
            </TouchableOpacity>
            <Text style={styles.cantidadText}>{cantidad}</Text>
            <TouchableOpacity onPress={manejarIncrementar} style={styles.button}>
                <AntDesign name="plussquareo" size={22} color="white" />
            </TouchableOpacity>


        </View>
    );
};

const styles = StyleSheet.create({
    contadorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    incrementButton: {
        color: colors.cuatro,
    },
    decrementButton: {
        color: colors.cuatro,

    },
    cantidadText: {
        fontSize: 18,
        marginHorizontal: 20,
        color: colors.cinco
    },
});


