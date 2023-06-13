import {commonsStyle, containerStyle, font} from "../../../commons/styles/commons.styles";
import {ImageBackground, Keyboard, StyleSheet, View} from "react-native";
import * as React from "react";
import NouvelleDemande from "../components/nouvelle-demande.component";
import {useEffect, useState} from "react";
import {loadZonesByCode} from "../../zone/services/zone.service";
import {Camera} from "expo-camera";
import * as Location from "expo-location";
import {modalfy} from "react-native-modalfy";
import VisualisationPhoto from "../components/visualisation-photo.component";
import LoadingGeneral from "../../../commons/component/loading-general.component";
import {demandePhoto} from "../services/collaboration.service";
import {Button} from "@rneui/base";
import Toast from "react-native-root-toast";


export default function CollaborationContainer({ navigation }) {

    const {currentModal,openModal,closeModal,closeModals,closeAllModals} = modalfy();
    const [regionSelected, setRegionSelected] = useState(null);
    const [zoneSelected, setZoneSelected] = useState(null);
    const [difficulteSelected, setDifficulteSelected] = useState(null);
    const [titre, setTitre] = useState(null);
    const [indice, setIndice] = useState(null);
    const [image, setImage] = useState(null);
    const [zonesOptions, setZonesOptions] = useState(null);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [permission, setPermission] = useState(null);
    const [location, setLocation] = useState(null);
    const [photoPrise, setPhotoPrise] = useState(null);
    const [formValid, setFormValid] = useState(false);
    const [loadingDemandeSend, setLoadingDemandeSend] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const handleRegionSelected = async (itemValue) => {
        setRegionSelected(itemValue);

        const zones = await loadZonesByCode(itemValue);

        if(!zones.data) {
            return;
        }

        setZonesOptions(buildOptionsZonePicker(zones.data));
        setFormValid(regionSelected && zoneSelected && difficulteSelected && titre && indice && photoPrise);
    }

    const handleZoneSelected = (itemValue) => {
        setZoneSelected(itemValue);
        setFormValid(regionSelected && zoneSelected && difficulteSelected && titre && indice && photoPrise);
    }

    const handleDifficulteSelected = (itemValue) => {
        setDifficulteSelected(itemValue);
        setFormValid(regionSelected && zoneSelected && difficulteSelected && titre && indice && photoPrise);
    }

    const handleTitreChange = (titre) => {
        setTitre(titre);
        setFormValid(regionSelected && zoneSelected && difficulteSelected && titre && indice && photoPrise);
    }

    const handleIndiceChange = (indice) => {
        setIndice(indice);
        setFormValid(regionSelected && zoneSelected && difficulteSelected && titre && indice && photoPrise);
    }

    function buildOptionsZonePicker(zones) {
        const options = [];
        zones.forEach(zone => options.push({
            text:zone.libelle, value: zone.id
        }));
        return options;
    }

    const handlePressPhoto = async () => {
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

    const handleSendDemande = async () => {
        if(!formValid) {
            return;
        }

        const title = "Valider la demande";
        const description = "Voulez-vous validez la demande actuelle ? Vous serez notifié par la validation ou non de la demande par les équipes Geopictures. Nous vous remercions de votre collaboration !";

        openModal("ModalChoixValid", {title: title, description: description, callback: () => sendDemande()});
    }

    const sendDemande = async () => {
        setLoadingDemandeSend(true);
        const location = await Location.getCurrentPositionAsync({});

        const demandePhotoRequest = {
            zoneId: zoneSelected,
            difficulte: difficulteSelected,
            titre: titre,
            indice: indice,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        };

        demandePhoto(demandePhotoRequest, photoPrise.uri)
            .then(res => {
                Toast.show("Demande envoyée avec succès !");
                navigation.navigate('mes-demandes-container');
            })
            .catch(err => Toast.show("Une erreur est survenue"))
            .finally(() => setLoadingDemandeSend(false));
    }

    return (
        <ImageBackground
            source={require('../../../../assets/auth_background.jpg')}
            style={ containerStyle.backgroundHover100 }>
            { loadingDemandeSend && <LoadingGeneral/> }
            <Button
                onPress={() => navigation.navigate("mes-demandes-container")}
                title="Mes demandes"
                raised={true}
                radius={20}
                containerStyle={ style.containerBoutonNavigation }
                titleStyle={ font(15, 'bold') }
                buttonStyle={ commonsStyle.boutonSuccess }/>
            <View style={ style.nouvelleDemandeContainer }>
                <NouvelleDemande regionSelected={regionSelected}
                                 handleRegionSelected={handleRegionSelected}
                                 zonesOptions={zonesOptions}
                                 zoneSelected={zoneSelected}
                                 handleZoneSelected={handleZoneSelected}
                                 difficulteSelected={difficulteSelected}
                                 handleDifficulteSelected={handleDifficulteSelected}
                                 handleTitreChange={handleTitreChange}
                                 handlePressPhoto={handlePressPhoto}
                                 handleIndiceChange={handleIndiceChange}>
                </NouvelleDemande>
            </View>
            {
                !isKeyboardVisible &&
                <View style={style.visualisationContainer}>
                    {
                        permission && location && location.status === "granted" && permission.status === "granted" &&
                        <VisualisationPhoto location={location}
                                            permission={permission}
                                            photoPrise={photoPrise}
                                            setPhotoPrise={setPhotoPrise}
                                            formValid={formValid}
                                            handleSendDemande={handleSendDemande}>
                        </VisualisationPhoto>
                    }
                </View>
            }
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    nouvelleDemandeContainer: {
        flex:1,
        marginTop:5,
        marginRight:10,
        marginLeft:10,
        marginBottom:5
    },
    visualisationContainer: {
        flex:1,
        margin:5,
        marginTop:5,
        marginRight:10,
        marginLeft:10,
        marginBottom:10
    },
    containerBoutonNavigation: {
        alignSelf:"flex-end",
        marginTop:10,
        marginRight:10,
        marginBottom:5
    }
})