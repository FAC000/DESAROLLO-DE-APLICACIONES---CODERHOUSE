import React from "react";
import {
    View, TextInput, TouchableOpacity, ActivityIndicator, Text, StyleSheet, ImageBackground
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useSignInMutation } from "../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";
import { colors } from "../global/color";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDB } from "../hooks/useDB";
import * as Yup from "yup";

const backgroundImage = require("../../assets/img/defaultavatar.jpg");

const schema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("El email es obligatorio"),
    password: Yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es obligatoria"),
});

export const Login = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const dispatch = useDispatch();
    const [signIn, { isLoading: isSigningIn, error: signInError }] = useSignInMutation();
    const { insertSession, getSessionByLocalId } = useDB();


    const handleLogin = async (data) => {
        try {
            const response = await signIn(data).unwrap();

            const userData = {
                email: data.email,
                localId: response.localId,
                token: response.idToken,
                name: response.displayName || '',
            };
            dispatch(setUser(userData));
            const existingSession = await getSessionByLocalId(userData.localId);
            if (!existingSession) {
                await insertSession(userData);
            }
        } catch (err) {

        }
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.overlay}>
                <Text style={styles.title}>¡Bienvenido!</Text>

                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor={colors.cinco}
                            onChangeText={onChange}
                            value={value}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    )}
                />
                {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Contraseña"
                            placeholderTextColor={colors.cinco}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry
                        />
                    )}
                />
                {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit(handleLogin)}
                    disabled={isSigningIn}
                >
                    {isSigningIn ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={styles.buttonText}>Iniciar Sesión</Text>
                    )}
                </TouchableOpacity>

                {signInError && <Text style={styles.error}>Error: {signInError?.data?.message || "Error desconocido"}</Text>}

                <TouchableOpacity
                    style={[styles.button, styles.registerButton]}
                    onPress={() => navigation.navigate('Register')}
                    disabled={false}
                >
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};



const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: "center",
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        textShadowColor: colors.tres,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        fontSize: 24,
        fontWeight: "bold",
        color: colors.cuatro,
        marginBottom: 40,
        letterSpacing: 3,
        textTransform: 'uppercase'
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: colors.tres,
        backgroundColor: colors.uno,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        color: colors.cinco
    },
    error: {
        color: colors.cinco,
        marginVertical: 10

    },
    button: {
        backgroundColor: colors.tres,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: 10,
    },
    registerButton: {
        backgroundColor: colors.dos,

    },
    buttonText: {
        color: colors.cinco,
        fontSize: 14,
        fontWeight: "bold",
        letterSpacing: 2,
        textTransform: 'uppercase'
    },
});
