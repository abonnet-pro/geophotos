import {ImageBackground, StyleSheet, TouchableOpacity, View} from "react-native";
import {containerStyle} from "../../../commons/styles/commons.styles";
import * as React from "react";
import {useEffect, useState} from "react";
import {Image} from "@rneui/themed";
import JeuImageDetail from "../components/jeu-image-detail.component";
import JeuGadgets from "../components/jeu-gadgets.component";
import JeuNonValide from "../components/jeu-non-valide.component";
import JeuValide from "../components/jeu-valide.component";
import JeuScoreDetail from "../components/jeu-score-detail.component";
import {Camera} from "expo-camera";
import {modalfy} from "react-native-modalfy";
import {sendPhotoJouee, useGadgetRecommencer} from "../services/jeu.service";
import LoadingGeneral from "../../../commons/component/loading-general.component";
import * as Location from 'expo-location';
import {handleError} from "../../../utils/http.utils";
import Toast from "react-native-root-toast";

export default function JeuContainer({route, navigation}) {

    const [photo, setPhoto] = useState(null);
    const [permission, setPermission] = useState(null);
    const [location, setLocation] = useState(null);
    const {currentModal,openModal,closeModal,closeModals,closeAllModals} = modalfy();
    const [loadingSendPhoto, setLoadingSendPhoto] = useState(false);
    const [photoPrise, setPhotoPrise] = useState(null);

    const init = () => {
        const photo = route.params.photo;
        setPhoto(photo);
    }

    const handlePressImage = (image, local) => {
        navigation.navigate("imageZoom", {
            image: image,
            local: local
        });

        if(!photoPrise) {
            setPermission(null);
        }
    }

    const handlePressJouer = async () => {
        const cameraPermission  = await Camera.requestCameraPermissionsAsync();
        setPermission(cameraPermission);
        if(cameraPermission.status !== 'granted') {
            openModal("ModalInfoDroitCamera");
        }

        const locationPermission = await Location.requestForegroundPermissionsAsync();
        setLocation(locationPermission);
        if(locationPermission.status !== 'granted') {
            openModal("ModalInfoDroitLocation");
        }
    }

    const handleSendPhoto = async (photoPrise) => {
        const locationPermission = await Location.requestForegroundPermissionsAsync();
        setLocation(locationPermission);

        if(locationPermission.status !== 'granted') {
            openModal("ModalInfoDroitLocation");
            return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setLoadingSendPhoto(true);

        sendPhotoJouee(photo.id, photoPrise.uri, location)
            .then(photoJoue => setPhoto(photoJoue.data))
            .catch(err => {
                handleError(err, navigation);
                Toast.show("Une erreur est survenu, veuillez contacter le support")
            })
            .finally(() => setLoadingSendPhoto(false))
    }

    const goBack = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'photos', params: {zoneId: photo.zoneId} }],
        });
    }

    const handlePressGadgetGps = async () => {
        openModal("ModalUseGadgetGps", {photoId: photo.id, navigation: navigation});
    }

    const handlePressGadgetIndice = async () => {
        openModal("ModalUseGadgetIndice", {photoId: photo.id, navigation: navigation});
    }


    const handlePressGadgetTop1 = async () => {
        openModal("ModalUseGadgetTop1", {photoId: photo.id, navigation: navigation});
    }

    const handlePressGadgetDistance = async () => {
        openModal("ModalUseGadgetDistance", {photoId: photo.id, navigation: navigation});
        const locationPermission = await Location.requestForegroundPermissionsAsync();
        setLocation(locationPermission);

        if(locationPermission.status !== 'granted') {
            openModal("ModalInfoDroitLocation");
            return;
        }

        const location = await Location.getCurrentPositionAsync({});
        closeAllModals(() => openModal("ModalUseGadgetDistance", {photoId: photo.id, location: location, navigation: navigation}));
    }

    const handlePressGadgetDirection = async () => {
        openModal("ModalUseGadgetDirection", {photoId: photo.id, navigation: navigation});
        const locationPermission = await Location.requestForegroundPermissionsAsync();
        setLocation(locationPermission);

        if(locationPermission.status !== 'granted') {
            openModal("ModalInfoDroitLocation");
            return;
        }

        const location = await Location.getCurrentPositionAsync({});
        closeAllModals(() => openModal("ModalUseGadgetDirection", {photoId: photo.id, location: location, navigation: navigation}));
    }

    const handlePressGadgetSuccessGps = async () => {
        openModal("ModalUseGadgetSuccesGps", {photoId: photo.id, navigation: navigation});
        const locationPermission = await Location.requestForegroundPermissionsAsync();
        setLocation(locationPermission);

        if(locationPermission.status !== 'granted') {
            openModal("ModalInfoDroitLocation");
            return;
        }

        const location = await Location.getCurrentPositionAsync({});
        closeAllModals(() => openModal("ModalUseGadgetSuccesGps", {photoId: photo.id, location: location, navigation: navigation}));
    }

    const handleValidRecommencer = async (photoId) => {
        useGadgetRecommencer(photoId)
            .then(photo => setPhoto(photo.data))
            .catch(err => {
                handleError(err, navigation);
                Toast.show("Une erreur est survenu, veuillez contacter le support")
            })
    }

    useEffect(init, []);

    return (
        <>
            <ImageBackground
                source={require('../../../../assets/auth_background.jpg')}
                style={containerStyle.backgroundHover100}>
                { loadingSendPhoto && <LoadingGeneral titre={"Calcul du score en cours ..."}></LoadingGeneral>}
                <View style={style.backContainer}>
                    <TouchableOpacity onPress={() => goBack()}>
                        <Image style={style.back} source={require('../../../../assets/back.png')}></Image>
                    </TouchableOpacity>
                </View>
                <View style={style.containerTop}>
                    <JeuImageDetail photo={photo} handlePressImage={handlePressImage}/>
                </View>
                <View style={style.containerMiddle}>
                    {
                        photo?.score ?
                            <JeuScoreDetail photo={photo} handleValidRecommencer={handleValidRecommencer}/>
                            :
                            <JeuGadgets handlePressGadgetGps={handlePressGadgetGps}
                                        handlePressGadgetDistance={handlePressGadgetDistance}
                                        handlePressGadgetDirection={handlePressGadgetDirection}
                                        handlePressGadgetSuccessGps={handlePressGadgetSuccessGps}
                                        handlePressGadgetTop1={handlePressGadgetTop1}
                                        handlePressGadgetIndice={handlePressGadgetIndice}/>
                    }
                </View>
                <View style={style.containerBottom}>
                    {
                        photo?.score ?
                            <JeuValide photo={photo} handlePressImage={ handlePressImage }/>
                            :
                            <JeuNonValide location={location}
                                          permission={permission}
                                          handlePressJouer={ handlePressJouer }
                                          handleSendPhoto={ handleSendPhoto }
                                          photoPrise={photoPrise}
                                          setPhotoPrise={setPhotoPrise}
                                          handlePressImage={handlePressImage}/>
                    }
                </View>
            </ImageBackground>
        </>
    )
}

const style = StyleSheet.create({
    backContainer: {
        marginLeft: 10,
        flexDirection: "row",
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    back: {
        width: 50,
        height: 50,
    },
    containerTop: {
        flex: 4,
        margin: 10
    },
    containerMiddle: {
        flex: 1,
        margin: 10,
    },
    containerBottom: {
        flex: 4,
        margin: 10
    }
})