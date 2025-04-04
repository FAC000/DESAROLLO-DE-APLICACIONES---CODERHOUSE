import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { Login } from "../screen/Login";
import { Register } from "../screen/Register";
import { BottomNavigator } from "../navigation/BottomNavigator";

const Stack = createStackNavigator();

export const Navigator = () => {
    const user = useSelector((state) => state.auth.value.user); 

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                    <Stack.Screen name="CINEVA" component={BottomNavigator} />
                ) : (
                    <>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
