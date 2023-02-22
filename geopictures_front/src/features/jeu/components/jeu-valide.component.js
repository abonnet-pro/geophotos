import {ImageBackground, StyleSheet, View} from "react-native";
import {BACKGROUND_VIEW} from "../../../utils/store.utils";
import * as React from "react";
import {Image} from "@rneui/themed";
import LoadingView from "../../../commons/component/loading.component";
import {URL_API} from "../../../utils/url.utils";

export default function JeuValide({photo, handlePressImage}) {
    return(
        <>
            <ImageBackground
                source={BACKGROUND_VIEW.bordure} style={{width: "100%", height: '100%'}} borderRadius={20}>
                <View style={{padding: 5}}>
                    <ImageBackground source={BACKGROUND_VIEW.background} style={{width: "100%", height: '100%'}}
                                     borderRadius={20}>
                        <View>
                            <Image
                                onPress={() => handlePressImage(photo?.imageJouee)}
                                style={ style.image }
                                PlaceholderContent={ <LoadingView/>}
                                source={{ uri: `${URL_API}/photos/${photo?.imageJouee}` }}
                            />
                        </View>
                    </ImageBackground>
                </View>
            </ImageBackground>
        </>
    )
}

const style = StyleSheet.create({
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 20,
    },
})