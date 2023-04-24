import {useEffect, useState} from "react";
import {Image, ImageBackground, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {containerStyle} from "../../../commons/styles/commons.styles";
import * as React from "react";
import ZoneList from "../component/zone-list.component";
import ZoneRecherche from "../component/zone-recherche.component";


export default function ZoneContainer({ navigation, route }) {

    const [zones, setZones] = useState(null);
    const [recherche, setRecherche] = useState(null);

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

    useEffect(init, []);

    return(
        <>
            <ImageBackground
                source={require('../../../../assets/auth_background.jpg')}
                style={ containerStyle.backgroundHover100 }>
                <View style={ style.backContainer }>
                    <TouchableWithoutFeedback onPress={ () => navigation.goBack() }>
                        <Image style={ style.back } source={require('../../../../assets/back.png')}></Image>
                    </TouchableWithoutFeedback>
                </View>
                <View style={ style.zonesContainer }>
                    {
                        filterZones(recherche) ? <ZoneList zones={filterZones(recherche)}/> : null
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