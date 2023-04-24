import {ImageBackground, StyleSheet, TouchableOpacity, View} from "react-native";
import {containerStyle} from "../../../commons/styles/commons.styles";
import * as React from "react";
import {useEffect, useState} from "react";
import {Image} from "@rneui/themed";
import JeuImageDetail from "../components/jeu-image-detail.component";
import JeuGadgets from "../components/jeu-gadgets.component";
import JeuNonValide from "../components/jeu-non-valide.component";
import JeuValide from "../components/jeu-valide.component";
import JeuScoreDetail from "../components/jeu-score-detail.component";

export default function JeuContainer({route, navigation}) {

    const [photo, setPhoto] = useState(null);

    const init = () => {
        const photo = route.params.photo;
        setPhoto(photo);
    }

    const handlePressImage = (image) => {
        navigation.navigate("imageZoom", {
            image: image
        });
    }

    useEffect(init, []);

    return (
        <>
            <ImageBackground
                source={require('../../../../assets/auth_background.jpg')}
                style={containerStyle.backgroundHover100}>
                <View style={style.backContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={style.back} source={require('../../../../assets/back.png')}></Image>
                    </TouchableOpacity>
                </View>
                <View style={style.containerTop}>
                    <JeuImageDetail photo={photo} handlePressImage={handlePressImage}/>
                </View>
                <View style={style.containerMiddle}>
                    {
                        photo?.score ? <JeuScoreDetail photo={photo}/> : <JeuGadgets/>
                    }
                </View>
                <View style={style.containerBottom}>
                    {
                        photo?.score ? <JeuValide photo={photo}/> : <JeuNonValide/>
                    }
                </View>
            </ImageBackground>
        </>
    )
}

const style = StyleSheet.create({
    backContainer: {
        marginLeft: 10,
        flexDirection: "row",
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    back: {
        width: 50,
        height: 50,
    },
    containerTop: {
        flex: 4,
        margin: 10
    },
    containerMiddle: {
        flex: 1,
        margin: 10,
    },
    containerBottom: {
        flex: 4,
        margin: 10
    }
})