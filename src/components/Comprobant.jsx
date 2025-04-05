import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { colors } from '../global/color';

export const HistorialCompras = () => {
    const compras = useSelector((state) => state.historial.compras);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Historial de Compras</Text>
            <FlatList
                data={compras}
                keyExtractor={(item, index) => `${index}`}
                renderItem={({ item }) => (
                    <View style={styles.compraItem}>
                        {item.map((peli, idx) => (
                            <Text style={styles.textHistorial} key={idx}>{peli.titulo} - {peli.horario.hora}</Text>
                        ))}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: '100%'
    },
    title: {
        marginVertical: 30,
        color: colors.cuatro,
        fontSize: 18,
        fontWeight: "bold",
        textTransform: 'uppercase',
        letterSpacing: 10,
        textShadowColor: colors.tres,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        textAlign: 'center',
        lineHeight: 30
    },
    compraItem: {

        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.tres,
        marginBottom: 10,
        backgroundColor: colors.dos,
        borderRadius: 10
    },
    textHistorial: {
        color: colors.cinco,
        textTransform: 'uppercase',
        marginVertical: 5,
        fontFamily : 'Oswald',
        textAlign: 'center'
    },
});
