import { ScrollView, View, Text, StyleSheet, FlatList, TouchableOpacity, useWindowDimensions, ActivityIndicator } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { agregarAlCarrito } from '../features/shop/carritoSlice';
import { useGetPeliculasByIdQuery } from '../services/shopService';
import { colors } from '../global/color';
import { imageMap } from '../global/imagenMap';

export const Details = ({ route }) => {
    const { productId } = route.params;
    const { data: pelicula, error, isLoading } = useGetPeliculasByIdQuery(productId);

    const { width } = useWindowDimensions();
    const videoHeight = (width * 9) / 16;

    const dispatch = useDispatch();

    const manejarAgregarAlCarrito = (horario) => {
        const imagen = imageMap[pelicula.imagen];
        dispatch(agregarAlCarrito({
            titulo: pelicula.titulo,
            horario: { 
                hora: horario.hora,
                formato: horario.formato,
                idioma: horario.idioma,
                precio: horario.precio
            },
            imagen,
            cantidad: 1, 
        }));
    };


    if (!pelicula) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#559e9e" />
            </View>
        );
    }


    const videoId = pelicula?.trailerUrl?.split("v=")[1]?.split("&")[0];

    return (
        <ScrollView style={styles.container}>
            <YoutubePlayer height={videoHeight} videoId={videoId} />
            <View style={styles.containerDuracionGenero}>
                <View style={styles.datosDuracionGenero}>
                    <Ionicons name="time-outline" size={16} color='#CBF7ED' />
                    <Text style={styles.textDuracionGenero}>{pelicula.duracion}</Text>
                </View>
                <View style={styles.datosDuracionGenero}>
                    <MaterialCommunityIcons name="movie-open-outline" size={16} color='#CBF7ED' />
                    <Text style={styles.textDuracionGenero}>{pelicula.genero}</Text>
                </View>
            </View>
            <View style={styles.informacionContainer}>
                <Text style={styles.title}>{pelicula.titulo}</Text>
                <Text style={styles.description}>{pelicula.descripcion}</Text>
            </View>
            <View style={styles.horariosContainer}>
                <FlatList
                    data={pelicula.horarios}
                    contentContainerStyle={{ width: "100%" }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.horariosButton}
                            onPress={() => manejarAgregarAlCarrito(item)}
                        >
                            <View style={styles.containerHorarioIdioma}>
                                <Text style={styles.horariosText}>{item.hora}</Text>
                                <Text style={styles.horariosIdioma}>{item.idioma} - {item.formato}</Text>
                                <Text style={styles.horariosIdioma}>$ {item.precio}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    scrollEnabled={false} 
                />

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.uno,
        flex: 1

    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.dos, 
    },
    containerDuracionGenero: {
        width: '100%',
        backgroundColor: colors.dos,
        flexDirection: 'row',
        gap: 80,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5
    },
    datosDuracionGenero: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    textDuracionGenero: {
        fontSize: 14,
        color: colors.cinco
    },
    title: {
        color: colors.cuatro,
        textTransform: 'uppercase',
        fontSize: 20,
        textShadowColor: colors.tres,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        letterSpacing: 5,
        marginTop: 25
    },
    description: {
        fontSize: 17,
        marginVertical: 20,
        textAlign: 'center',
        color: colors.tres,
        width: '85%',
        lineHeight: 25,
        letterSpacing: 1
    },
    informacionContainer: {
        alignItems: 'center'
    },
    horariosContainer: {
        width: '100%',
        marginTop: 30,
        paddingBottom: 30
    },
    horariosButton: {
        borderColor: colors.tres,
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        paddingVertical: 10,
        width: '100%'
    },

    containerHorarioIdioma: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%'
    },
    horariosText: {
        color: colors.cuatro,
        letterSpacing: 1,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 600,
        flex: 1
    },
    horariosDuracion: {
        fontSize: 18,
        marginBottom: 10,
        color: colors.cuatro
    },
    horariosIdioma: {
        textAlign: 'center',
        color: colors.cinco,
        letterSpacing: 1,
        textTransform: 'uppercase',
        fontSize: 10,
        flex: 1
    },

});
