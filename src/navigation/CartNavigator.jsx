import React from 'react'
import { Cart } from '../screen/Cart'
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export const CartNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Cart"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
    );
};




