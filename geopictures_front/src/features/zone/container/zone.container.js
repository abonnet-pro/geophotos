import {useEffect, useState} from "react";
import {Image, ImageBackground, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {containerStyle} from "../../../commons/styles/commons.styles";
import * as React from "react";
import ZoneList from "../component/zone-list.component";
import ZoneRecherche from "../component/zone-recherche.component";
import {loadPhotoByZone} from "../../photo/services/photo.service";
import Toast from "react-native-root-toast";


export default function ZoneContainer({ navigation, route }) {

    const [zones, setZones] = useState(null);
    const [recherche, setRecherche] = useState(null);
    const [loadingPhotos, setLoadingPhotos] = useState(false);

    const init = () => {
        const zones = route.params.zones
        setZones(zones);
    }

    const filterZones = (recherche) => {
        if(!recherche) {
            return zones;
        }
        return zones?.filter(zone => zone.libelle.toLowerCase().includes(recherche.toLowerCase()));
    }

    const handleGoListePhoto = async (zoneId) => {
        setLoadingPhotos(true);
        const photos = await loadPhotoByZone(zoneId);
        setLoadingPhotos(false);

        if(!photos.data) {
            Toast.show("Erreur veuillez réessayer plus tard");
            return;
        }

        navigation.navigate("photos", {
            photos: photos.data
        })
    }

    useEffect(init, []);

    return(
        <>
            <ImageBackground
                source={require('../../../../assets/auth_background.jpg')}
                style={ containerStyle.backgroundHover100 }>
                <View style={ style.backContainer }>
                    <TouchableOpacity onPress={ () => navigation.goBack() }>
                        <Image style={ style.back } source={require('../../../../assets/back.png')}></Image>
                    </TouchableOpacity>
                </View>
                <View style={ style.zonesContainer }>
                    {
                        filterZones(recherche) ? <ZoneList loadingPhotos={ loadingPhotos } handleGoListePhoto={ handleGoListePhoto } zones={filterZones(recherche)}/> : null
                    }
                </View>
                <View style={{ flex: 1 }}>
                    <ZoneRecherche recherche={ recherche } setRecherche={ setRecherche }/>
                </View>
            </ImageBackground>
        </>
    )
}

const style = StyleSheet.create({
    backContainer: {
        marginLeft: 10,
    },
    back: {
        width: 50,
        height: 50
    },
    zonesContainer: {
        margin: 10,
        flex: 10
    },
    zones: {
        padding: 10,
        height: '100%'
    }
});