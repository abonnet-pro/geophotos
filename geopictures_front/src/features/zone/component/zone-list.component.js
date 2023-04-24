import {ImageBackground, ScrollView, StyleSheet, View} from "react-native";
import ZoneResume from "./zone-resume.component";
import * as React from "react";
import {Text} from "@rneui/base";

export default function ZoneList({zones}) {
    return(
        <ImageBackground
            source={ require('../../../../assets/bordure_wood.jpg') } style={{ padding:5}} borderRadius={20}>
            <ImageBackground source={ require('../../../../assets/background_wood.jpg') }  borderRadius={20}>
                <ScrollView style={ style.zones } showsVerticalScrollIndicator={false}>
                    <View style={{ marginBottom: 10}}>
                        {
                            zones.length > 0 ? zones.map((zone, index) => {
                                return(
                                    <View key={ zone.id }>
                                        <ZoneResume zone={zone} last={ index === zones.length - 1 }/>
                                    </View>
                                )
                            }) :
                                <View  style={ style.noZoneContainer }>
                                    <Text style={ style.noZone }>{`Aucune zone de jeu trouvé.\nCréer votre propre zone depuis l'onglet collaboration pour faire jouer votre région !`}</Text>
                                </View>
                        }
                    </View>
                </ScrollView>
            </ImageBackground>
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    zones: {
        padding: 10,
        height: '100%'
    },
    noZone: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'center',
    },
    noZoneContainer: {
        marginTop: 20
    }
});