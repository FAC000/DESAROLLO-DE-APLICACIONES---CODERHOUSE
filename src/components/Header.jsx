import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../global/color'

export const Header = ({ title }) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.textoContainer}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 100,
        backgroundColor: colors.dos,
        justifyContent: "center",
        alignItems: "center"
    },
    textoContainer: {
        color: colors.cuatro,
        fontSize: 22,
        fontWeight: "bold",
        textTransform: 'uppercase',
        letterSpacing: 10,
        textShadowColor: colors.tres,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        textAlign: 'center'
    }

})