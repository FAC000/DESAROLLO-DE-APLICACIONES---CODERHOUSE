import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ExpoLibrary from "expo-media-library";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { colors } from "../global/color";
import { useGetProfileImageQuery, usePostProfileImageMutation } from '../services/shopService';
import { useDispatch, useSelector } from 'react-redux';
import { setCameraImage, clearUser } from '../features/user/userSlice';
import { HistorialCompras } from '../components/Comprobant';

const defaultProfileImage = require("../../assets/img/defaultavatar.jpg");

export const Profile = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const [isImageFromCamera, setIsImageFromCamera] = useState(false);
    const [imageUri, setImageUri] = useState("");

    const { localId } = useSelector(state => state.auth.value);
    const { data: imageFromBase } = useGetProfileImageQuery(localId);

    const [triggerPostImage] = usePostProfileImageMutation();
    const dispatch = useDispatch();

    const vefifyCameraPermissions = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        return granted;
    };

    const vefifyGalleryPermissions = async () => {
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        return granted;
    };

    const pickLibraryImage = async () => {
        try {
            setIsImageFromCamera(false);
            const permissionGallery = await vefifyGalleryPermissions();
            if (permissionGallery) {
                const result = await ImagePicker.launchImageLibraryAsync({
                    base64: true,
                    allowsEditing: true,
                    aspect: [1, 1],
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    quality: 0.2,
                });

                if (!result.canceled) {
                    const img = `data:image/jpeg;base64,${result.assets[0].base64}`;
                    setImage(img);
                }
            }
        } catch (err) {
        }
    };

    const pickImage = async () => {
        setIsImageFromCamera(true);
        try {
            const permissionCamera = await vefifyCameraPermissions();
            if (permissionCamera) {
                let result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    base64: true,
                    quality: 0.2,
                });

                if (!result.canceled) {
                    setImageUri(result.assets[0].uri);
                    const img = `data:image/jpg;base64,${result.assets[0].base64}`;
                    setImage(img);
                }
            }
        } catch (error) {
        }
    };

    const confirmImage = async () => {
        try {
            dispatch(setCameraImage(image));
            triggerPostImage({ image, localId });
            if (isImageFromCamera) {
                await ExpoLibrary.createAssetAsync(imageUri);
            }
            navigation.goBack();
        } catch (err) {
        }
    };

    const handleSignOut = () => {
        dispatch(clearUser());

    };

    const imageSource = image || imageFromBase?.image
        ? { uri: image || `data:image/jpeg;base64,${imageFromBase?.image}` }
        : defaultProfileImage;

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                <Text style={styles.signOutButtonText}>Sign out</Text>
            </TouchableOpacity>

            <View style={styles.imageContainer}>
                <Image
                    source={imageSource}
                    style={styles.profileImage}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={pickImage}>
                    <Text style={styles.buttonText}><MaterialIcons name="add-a-photo" size={24} color="white" /></Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={pickLibraryImage}>
                    <Text style={styles.buttonText}> <MaterialIcons name="photo-library" size={24} color="white" /></Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={confirmImage}>
                    <Text style={styles.buttonText}>   <Entypo name="check" size={24} color="white" /></Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={[<HistorialCompras />]}
                renderItem={({ item }) => item}
                keyExtractor={(item, index) => `${index}`}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: colors.uno,
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderRadius: 200,
        overflow: 'hidden',
        marginVertical: 20,
        borderWidth: 3,
        borderColor: colors.dos,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80
    },
    profileImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    buttonContainer: {
        width: '50%',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        paddingVertical: 10,
        borderRadius: 8,
        width: '50%',
        marginTop: 10,
        marginHorizontal: 10,

    },
    buttonText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',

    },
    signOutButton: {
        position: 'absolute',
        top: 20,
        right: 10,
        backgroundColor: colors.dos,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        zIndex: 1,
    },
    signOutButtonText: {
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    historialContainer: {
        marginTop: 30,
        width: '100%',
    },
});


