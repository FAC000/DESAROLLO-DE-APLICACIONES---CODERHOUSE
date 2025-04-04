import { StyleSheet, Text, View, Pressable, ActivityIndicator, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from "../global/color";
import { useDispatch } from 'react-redux';
import { useSignUpMutation } from '../services/authService';
import { setUser } from '../features/user/userSlice';
import { registerValidation } from '../utils/yup';


export const Register = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [errorMail, setErrorMail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
    const [errorName, setErrorName] = useState('');

    const dispatch = useDispatch();
    const [triggerSignUp, result] = useSignUpMutation();

    const backgroundImage = require("../../assets/img/defaultavatar.jpg");

    useEffect(() => {
        if (result.isSuccess) {
            dispatch(setUser({
                email: result.data.email,
                token: result.data.idToken,
                localId: result.data.localId,
                name: result.data.displayName || ' ',
            }));
        }

    }, [result, dispatch, navigation, name]);

    const onSubmit = () => {
        try {
            setErrorMail('');
            setErrorPassword('');
            setErrorConfirmPassword('');
            setErrorName('');


            registerValidation.validateSync({ email, password, confirmPassword, name });


            triggerSignUp({ email, password, name, returnSecureToken: true });
        } catch (error) {
            switch (error.path) {
                case 'email':
                    setErrorMail(error.message);
                    break;
                case 'password':
                    setErrorPassword(error.message);
                    break;
                case 'confirmPassword':
                    setErrorConfirmPassword(error.message);
                    break;
                case 'name':
                    setErrorName(error.message);
                    break;
            }
        }
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.overlay}>
                <Text style={styles.title}>Registrarse</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    placeholderTextColor={colors.cinco}
                    value={name}
                    onChangeText={setName}
                />
                {errorName && <Text style={styles.error}>{errorName}</Text>}

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={colors.cinco}
                    value={email}
                    onChangeText={setEmail}
                />
                {errorMail && <Text style={styles.error}>{errorMail}</Text>}

                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor={colors.cinco}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                {errorPassword && <Text style={styles.error}>{errorPassword}</Text>}

                <TextInput
                    style={styles.input}
                    placeholder="Confirmar Contraseña"
                    placeholderTextColor={colors.cinco}
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                {errorConfirmPassword && <Text style={styles.error}>{errorConfirmPassword}</Text>}

                <TouchableOpacity onPress={onSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>

                {result.isLoading && <ActivityIndicator size="large" color={colors.primary} />}
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
        textTransform: 'uppercase',
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: colors.tres,
        backgroundColor: colors.uno,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        color: colors.cinco,
    },
    error: {
        color: colors.cinco,
        marginVertical: 10,
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
    buttonText: {
        color: colors.cinco,
        fontSize: 14,
        fontWeight: "bold",
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
});
