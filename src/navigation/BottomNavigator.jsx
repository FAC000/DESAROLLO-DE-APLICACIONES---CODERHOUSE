import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeNavigator } from './HomeNavigator';
import { colors } from '../global/color';
import { View, Text } from 'react-native';
import { CartNavigator } from './CartNavigator';
import { Profile } from '../screen/Profile';


const Tab = createBottomTabNavigator();

export const BottomNavigator = () => {
    const carrito = useSelector((state) => state.carrito.peliculas);

    const totalItems = carrito.reduce((total, pelicula) => {
        return total + pelicula.cantidad;
    }, 0);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
                headerShown: false,
            }}
        >

            <Tab.Screen
                name="CARTELERA"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={styles.icon}>
                                <MaterialCommunityIcons
                                    name="movie-open-outline"
                                    size={24}
                                    color={focused ? colors.cinco : colors.tres} />
                            </View>
                        );
                    },
                }}
            />

            <Tab.Screen
                name="CARRITO"
                component={CartNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={styles.icon}>
                                <Feather
                                    name="shopping-cart"
                                    size={24}
                                    color={focused ? colors.cinco : colors.tres}
                                />
                                {totalItems > 0 && (
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>{totalItems}</Text>
                                    </View>
                                )}
                            </View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={styles.icon}>
                                <AntDesign
                                    name="user"
                                    size={24}
                                    color={focused ? colors.cinco : colors.tres} />
                            </View>
                        );
                    },
                }}
            />


        </Tab.Navigator >
    )
}



const styles = StyleSheet.create({

    tabBar: {
        backgroundColor: colors.dos,
        borderColor: colors.dos,
        paddingTop: 3
    },
    icon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    badge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: colors.tres,
        width: 18,
        height: 18,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        fontSize: 12,
        color: colors.cinco,
        fontWeight: 'bold',
    },
});

