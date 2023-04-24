import {ImageBackground, StyleSheet, View} from "react-native";
import {BACKGROUND_ASSETS} from "../../../utils/store.utils";
import {Text} from "@rneui/base";
import {getDifficulteColor, getDifficulteLibelle} from "../../photo/enums/difficulte.enum";
import {Image} from "@rneui/themed";
import LoadingView from "../../../commons/component/loading.component";
import {URL_API} from "../../../utils/url.utils";
import * as React from "react";

export default function JeuImageDetail({ photo, handlePressImage}) {
    return (
        <>
            <ImageBackground
                source={BACKGROUND_ASSETS.bordure} style={{width: "100%", height: '100%'}} borderRadius={20}>
                <View style={{padding: 5}}>
                    <ImageBackground source={BACKGROUND_ASSETS.background} style={{width: "100%", height: '100%'}}
                                     borderRadius={20}>
                        <View style={style.containerTopTitre}>
                            <Text style={ style.textTop1 }>{ photo?.titre }</Text>
                            <Text style={{...style.textTop2, color: getDifficulteColor(photo?.difficulte)}}>{ getDifficulteLibelle(photo?.difficulte) }</Text>
                        </View>
                        <View style={style.containerTopImage}>
                            <Image
                                onPress={ () => handlePressImage(photo?.image) }
                                style={ style.image }
                                PlaceholderContent={ <LoadingView/>}
                                source={{ uri: `${URL_API}/photos/${photo?.image}` }}
                            />
                        </View>
                    </ImageBackground>
                </View>
            </ImageBackground>
        </>
    )
}

const style = StyleSheet.create({
    textTop1: {
        fontWeight: "bold",
        fontSize: 20,
        alignSelf: "center"
    },
    textTop2: {
        fontSize: 15,
        alignSelf: "center",
    },
    image: {
        width: "100%",
        height: "100%",
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
    },
    containerTopTitre: {
        flex: 1,
        flexDirection:"row",
        justifyContent: "space-between",
        paddingLeft: 10,
        paddingRight:10,
    },
    containerTopImage: {
        flex: 6,
    }
})