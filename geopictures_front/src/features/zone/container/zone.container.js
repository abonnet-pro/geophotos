import {useEffect, useState} from "react";
import {Text} from "@rneui/base";
import {Image, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {back} from "../../../utils/uri.utils";
import {loadZonesByCode} from "../services/zone.service";

export default function ZoneContainer({ navigation, route }) {

    const [zones, setZones] = useState([]);

    const loadZones = () => {
        const regionCode = route.params.regionCode;

        if(!regionCode) {
            navigation.navigate("accueil");
        }

        loadZonesByCode(regionCode, setZones);
    }

    useEffect(loadZones, []);

    return(
        <>
            <View style={ style.backContainer }>
                <TouchableWithoutFeedback onPress={ () => navigation.goBack() }>
                    <Image style={ style.back } source={{ uri: back }}></Image>
                </TouchableWithoutFeedback>
            </View>
            {
                zones.map(zone => {
                    return(
                        <>
                            <Text>{zone.libelle}</Text>
                        </>
                    )
                })
            }
        </>
    )
}

const style = StyleSheet.create({
    backContainer: {
        marginLeft: 10
    },
});