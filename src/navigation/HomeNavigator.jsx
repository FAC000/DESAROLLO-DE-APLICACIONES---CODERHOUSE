import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from '../components/Header'
import { Home } from '../screen/Home';
import { Details } from '../screen/Details';
import { Login } from '../screen/Login';
import { Register } from '../screen/Register';


const Stack = createNativeStackNavigator();

export function HomeNavigator() {

    return (
        <Stack.Navigator
            initialRouteName={"CINEVA"}
            screenOptions={{
                header: () => <Header />,
            }}
        >
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="CINEVA"
                component={Home}
                options={{
                    header: () => <Header title="CINEVA" />,
                }}
            />

            <Stack.Screen
                name="Details"
                component={Details}
                options={({ route }) => ({
                    header: () => <Header title={route.params?.titulo?.toUpperCase() || 'DETALLES'} />,
                })}
            />
        </Stack.Navigator>
    );
}
