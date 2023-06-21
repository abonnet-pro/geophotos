import {useEffect, useState} from "react";
import {Image, ImageBackground, StyleSheet, TouchableOpacity, View} from "react-native";
import {containerStyle} from "../../../commons/styles/commons.styles";
import * as React from "react";
import ZoneList from "../component/zone-list.component";
import ZoneRecherche from "../component/zone-recherche.component";
import {loadZonesByCode} from "../services/zone.service";
import LoadingGeneral from "../../../commons/component/loading-general.component";
import Toast from "react-native-root-toast";
import {handleError} from "../../../utils/http.utils";


export default function ZoneContainer({ navigation, route }) {

    const [zones, setZones] = useState(null);
    const [recherche, setRecherche] = useState(null);
    const [loadingZones, setLoadingZone] = useState(false);

    const init = () => {
        const regionCode = route.params.regionCode;
        setLoadingZone(true);
        loadZonesByCode(regionCode)
            .then(zones => {
                setZones(zones.data);
            })
            .catch(err => {
                handleError(err, navigation);
                Toast.show("Une erreur est survenu, veuillez contacter le support")
            })
            .finally(() => setLoadingZone(false))
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
                {
                    loadingZones ? <LoadingGeneral titre={"Chargement en cours ..."}></LoadingGeneral>
                        :
                        <>
                            <View style={ style.backContainer }>
                                <TouchableOpacity onPress={ () => goBack() }>
                                    <Image style={ style.back } source={require('../../../../assets/back.png')}></Image>
                                </TouchableOpacity>
                            </View>
                            <View style={ style.zonesContainer }>
                                {
                                    filterZones(recherche) ? <ZoneList handleGoListePhoto={ handleGoListePhoto } zones={filterZones(recherche)}/> : null
                                }
                            </View>
                            <View style={{ flex: 1, marginBottom:5 }}>
                                <ZoneRecherche recherche={ recherche } setRecherche={ setRecherche }/>
                            </View>
                        </>
                }
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