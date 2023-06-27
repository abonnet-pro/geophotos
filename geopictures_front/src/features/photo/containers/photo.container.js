import {commonsStyle, containerStyle, font} from "../../../commons/styles/commons.styles";
import {
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import PhotoList from "../components/photo-list.component";
import {Difficulte} from "../enums/difficulte.enum";
import PhotoFiltre from "../components/photo-filtre.component";
import {A_JOUE, DEJA_JOUE, TOUTES} from "../../../commons/consts/photo.const";
import {loadPhotoByZone, suppressionPhoto} from "../services/photo.service";
import LoadingGeneral from "../../../commons/component/loading-general.component";
import Toast from "react-native-root-toast";
import {handleError} from "../../../utils/http.utils";
import {getValueFor, JOUEUR} from "../../../utils/store.utils";
import {modalfy} from "react-native-modalfy";
import {Button} from "@rneui/base";

export default function PhotoContainer({ navigation, route }) {

    const [photos, setPhotos] = useState([]);
    const [selectedDifficulte, setSelectedDifficulte] = useState(Difficulte.TOUTES);
    const [selectedJoues, setSelectedJoues] = useState(TOUTES);
    const [loadingPhotos, setLoadingPhotos] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [zoneId, setZoneId] = useState(null);
    const {currentModal,openModal,closeModal,closeModals,closeAllModals} = modalfy();

    const init = () => {

        getValueFor(JOUEUR).then(joueur => setIsAdmin(joueur.isAdmin));
        const zoneId = route.params.zoneId;
        setZoneId(zoneId);
        load(zoneId);
    }

    const load = (zoneId) => {
        setLoadingPhotos(true);
        loadPhotoByZone(zoneId)
            .then(photos => setPhotos(photos.data))
            .catch(err => {
                handleError(err, navigation);
                Toast.show(err.response.data);
            })
            .finally(() => setLoadingPhotos(false))
    }

    const goBack = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'zones', params: {regionCode: photos[0].regionCode} }],
        });
    }


    const handlePressPhoto = (photo) => {
        navigation.navigate("jeu", {
            photo: photo
        });
    }

    const handlePressImage = (image) => {
        navigation.navigate("imageZoom", {
            image: image
        });
    }

    function getPhotosFiltered() {
        if(selectedDifficulte === Difficulte.TOUTES && selectedJoues === TOUTES) {
            return photos;
        }

        const photosFiltered = photos.filter(photo => {
            if(selectedDifficulte === Difficulte.TOUTES) {
                return true;
            }

            return selectedDifficulte === photo.difficulte;
        });

        return photosFiltered.filter(photo => {
            if(selectedJoues === TOUTES) {
                return true;
            }

            if(selectedJoues === DEJA_JOUE && photo.score !== null) {
                return true;
            }

            if(selectedJoues === A_JOUE && photo.score === null) {
                return true;
            }
        });
    }

    const handlePressSuppressionPhoto = (photo) => {
        const title = "Suppression Photo";
        const description = `Voulez vous vraiment supprimer la photo ${photo.titre} ?`;

        openModal("ModalChoixValid", {title: title, description: description, callback: () => handleValidSuppressionPhoto(photo)});
    }

    const handleValidSuppressionPhoto = (photo) => {
        setLoadingPhotos(true);

        suppressionPhoto(photo)
            .then(_ => load(zoneId))
            .catch(err => {
                Toast.show("Une erreur est survenu, veuillez contacter le support")
            })
            .finally(() => setLoadingPhotos(false));
    }

    useEffect(init, []);

    return(
        <>
            <ImageBackground
                source={require('../../../../assets/auth_background.jpg')}
                style={ containerStyle.backgroundHover100 }>
                {loadingPhotos && <LoadingGeneral titre={"Chargement en cours ..."}></LoadingGeneral>}
                <View style={ style.backContainer }>
                    <TouchableOpacity onPress={ () => goBack() }>
                        <Image style={ style.back } source={require('../../../../assets/back.png')}></Image>
                    </TouchableOpacity>
                    <View style={ style.pickers }>
                        <PhotoFiltre selectedDifficulte={ selectedDifficulte }
                                     selectedJoues={ selectedJoues }
                                     setSelectedJoues={ setSelectedJoues }
                                     setSelectedDifficulte={ setSelectedDifficulte }>
                        </PhotoFiltre>
                    </View>
                </View>
                <ScrollView>
                    <PhotoList handlePressSuppressionPhoto={handlePressSuppressionPhoto} isAdmin={isAdmin} handlePressImage={ handlePressImage } handlePressPhoto={ handlePressPhoto } photos={ getPhotosFiltered() }/>
                </ScrollView>
            </ImageBackground>
        </>
    )
}

const style = StyleSheet.create({
    backContainer: {
        marginLeft: 10,
        flexDirection: "row",
        alignItems:'center',
        marginTop:5,
        marginBottom:5
    },
    back: {
        width: 50,
        height: 50,
    },
    pickers: {
        flex:1,
        flexDirection: "row",
        marginLeft: 10,
        marginRight: 10
    },
    deleteContainer: {
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5
    }
});