import {useEffect, useState} from "react";
import {Image, ImageBackground, StyleSheet, TouchableOpacity, View} from "react-native";
import {containerStyle} from "../../../commons/styles/commons.styles";
import * as React from "react";
import ZoneList from "../component/zone-list.component";
import ZoneRecherche from "../component/zone-recherche.component";
import {loadZonesByCode, suppressionZone} from "../services/zone.service";
import LoadingGeneral from "../../../commons/component/loading-general.component";
import Toast from "react-native-root-toast";
import {handleError} from "../../../utils/http.utils";
import {modalfy} from "react-native-modalfy";
import {getValueFor, JOUEUR} from "../../../utils/store.utils";


export default function ZoneContainer({ navigation, route }) {

    const [zones, setZones] = useState(null);
    const [recherche, setRecherche] = useState(null);
    const [regionCode, setRegionCode] = useState(null);
    const [loadingZones, setLoadingZone] = useState(false);
    const {currentModal,openModal,closeModal,closeModals,closeAllModals} = modalfy();
    const [isAdmin, setIsAdmin] = useState(false);

    const init = () => {
        getValueFor(JOUEUR).then(joueur => setIsAdmin(joueur.isAdmin));
        const regionCode = route.params.regionCode;
        setRegionCode(regionCode);
        load(regionCode);
    }

    const load = (regionCode) => {
        setLoadingZone(true);
        loadZonesByCode(regionCode)
            .then(zones => {
                setZones(zones.data);
            })
            .catch(err => {
                handleError(err, navigation);
                Toast.show(err.response.data);
            })
            .finally(() => setLoadingZone(false))
    }

    const handlePressDeleteZone = (zoneId) => {
        const title = "Suppression Zone";
        const description = `Voulez vous vraiment supprimer cette zone ?`;

        openModal("ModalChoixValid", {title: title, description: description, callback: () => handleValidSuppressionZone(zoneId)});
    }

    const handleValidSuppressionZone = (zoneId) => {
        setLoadingZone(true);

        suppressionZone(zoneId)
            .then(_ => {
                load(regionCode);
            })
            .catch(err => {
                Toast.show("Une erreur est survenu, veuillez contacter le support")
            })
            .finally(() => setLoadingZone(false));
    }

    const goBack = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'selectRegion' }],
        });
    }

    const filterZones = (recherche) => {
        if(!recherche) {
            return zones;
        }
        return zones?.filter(zone => zone.libelle.toLowerCase().includes(recherche.toLowerCase()));
    }

    const handleGoListePhoto = async (zoneId) => {
        navigation.navigate("photos", {
            zoneId: zoneId
        })
    }

    useEffect(init, []);

    return(
        <>
            <ImageBackground
                source={require('../../../../assets/auth_background.jpg')}
                style={ containerStyle.backgroundHover100 }>
                {loadingZones && <LoadingGeneral titre={"Chargement en cours ..."}></LoadingGeneral>}
                <View style={ style.backContainer }>
                    <TouchableOpacity onPress={ () => goBack() }>
                        <Image style={ style.back } source={require('../../../../assets/back.png')}></Image>
                    </TouchableOpacity>
                </View>
                <View style={ style.zonesContainer }>
                    <ZoneList isAdmin={isAdmin} handlePressDeleteZone={handlePressDeleteZone} handleGoListePhoto={ handleGoListePhoto } zones={filterZones(recherche)}/>
                </View>
                <View style={{ flex: 1, marginBottom:5 }}>
                    <ZoneRecherche recherche={ recherche } setRecherche={ setRecherche }/>
                </View>
            </ImageBackground>
        </>
    )
}

const style = StyleSheet.create({
    backContainer: {
        flex:1,
        marginLeft: 10,
    },
    back: {
        width: 50,
        height: 50
    },
    zonesContainer: {
        margin: 10,
        flex: 15
    },
    zones: {
        padding: 10,
        height: '100%'
    }
});