import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { colors } from '../global/color';
import { imageMap } from '../global/imagenMap';
import { useGetPeliculasQuery } from '../services/shopService';

export const Home = ({ navigation }) => {
    const { data: peliculas, error, isLoading } = useGetPeliculasQuery()


    return (
        <View style={styles.homeContainer}>
            <FlatList
                data={peliculas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => navigation.navigate('Details', {
                            productId: item.id,
                            titulo: item.titulo,
                            horarios: item.horarios
                        })}
                    >
                        <Image
                            source={imageMap[item.imagen]}
                            style={[styles.img]}
                            resizeMode="cover"
                        />
                        <Text style={styles.textPelicula}>{item.titulo}</Text>
                    </TouchableOpacity>
                )}
                numColumns={2}
                contentContainerStyle={styles.carteleraContain}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 20,
        paddingTop: 20,
        width: '100%',
        backgroundColor: colors.uno
    },
    carteleraContain: {
        justifyContent: 'center',
        marginTop: 20,
        paddingBottom: 50
    },

    itemContainer: {
        alignItems: 'center',
        marginVertical: 2,
        marginHorizontal: 3,
        padding: 5,
        borderRadius: 3,
    },
    img: {
        width: 150,
        height: 250,
        marginVertical: 10,
    },
    textPelicula: {
        color: colors.tres,
        textTransform: 'uppercase',
        letterSpacing: 1,
        textAlign: 'center',
        width: 150,
        fontSize: 12,
        fontFamily : 'Oswald'
        
    },
});
