import {ImageBackground, ScrollView, StyleSheet, View} from "react-native";
import ZoneResume from "./zone-resume.component";
import * as React from "react";
import {Text} from "@rneui/base";
import {BACKGROUND_ASSETS} from "../../../utils/store.utils";

export default function ZoneList({ zones, handleGoListePhoto, handlePressDeleteZone, isAdmin }) {
    return(
        <ImageBackground
            source={ BACKGROUND_ASSETS.bordure } style={{ width: "100%", height:"100%"}} borderRadius={20}>
            <View style={{padding:5}}>
                <ImageBackground source={ BACKGROUND_ASSETS.background } style={{ width: "100%", height:"100%"}} borderRadius={20}>
                    <ScrollView style={ style.zones } showsVerticalScrollIndicator={false}>
                        <View style={{ marginBottom: 10}}>
                            {
                                zones && zones.length > 0 ? zones.map((zone, index) => {
                                    return(
                                        <View key={ zone.id }>
                                            <ZoneResume isAdmin={isAdmin} handlePressDeleteZone={handlePressDeleteZone} handleGoListePhoto={ handleGoListePhoto } zone={zone} last={ index === zones.length - 1 }/>
                                        </View>
                                    )
                                }) :
                                    null
                            }
                        </View>
                        {
                            zones && zones.length > 0 ? null :
                                <View  style={ style.noZoneContainer }>
                                    <Text style={ style.noZone }>{`Aucune zone de jeu trouvé.\nCréer votre propre zone depuis l'onglet collaboration pour faire jouer votre région !`}</Text>
                                </View>
                        }
                    </ScrollView>

                </ImageBackground>
            </View>
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
        marginTop: 20,
    }
});