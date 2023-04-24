import {ImageBackground, StyleSheet, View} from "react-native";
import {BACKGROUND_VIEW} from "../../../utils/store.utils";
import {Button} from "@rneui/base";
import {commonsStyle, font} from "../../../commons/styles/commons.styles";
import * as React from "react";

export default function JeuNonValide() {
    return(
        <>
            <ImageBackground
                source={BACKGROUND_VIEW.bordure} style={{width: "100%", height: '100%'}} borderRadius={20}>
                <View style={{padding: 5}}>
                    <ImageBackground source={BACKGROUND_VIEW.background} style={{width: "100%", height: '100%'}}
                                     borderRadius={20}>
                        <View style={ style.containerPhoto }>
                            <Button
                                title="Prendre une photo"
                                raised={true}
                                radius={20}
                                containerStyle={ style.containerBoutonPhoto }
                                titleStyle={ font(25, 'bold') }
                                buttonStyle={ style.bouttonPhoto }/>
                        </View>
                    </ImageBackground>
                </View>
            </ImageBackground>
        </>
    )
}

const style = StyleSheet.create({
    containerPhoto: {
        height:"100%",
        marginTop:'auto',
        marginBottom:'auto',
        marginStart:'auto',
        marginEnd:'auto',
    },
    bouttonPhoto: {
        ...commonsStyle.boutonSuccess,
    },
    containerBoutonPhoto: {
        marginTop:'auto',
        marginBottom:'auto',
        marginStart:'auto',
        marginEnd:'auto',
    }
})