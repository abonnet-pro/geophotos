import {BackHandler, Image, ImageBackground, StyleSheet, View} from "react-native";
import {containerStyle, primary1} from "../../commons/styles/commons.styles";
import {Text} from "@rneui/base";
import {useEffect} from "react";
import {getValueFor, JOUEUR} from "../../utils/store.utils";

export default function ChargementContainer({ navigation }) {

    const init = () => {
        BackHandler.addEventListener("hardwareBackPress", () => true)
        getValueFor(JOUEUR).then(r => r !== null ? navigation.navigate('accueil') : navigation.navigate('authentification'));
    }

    useEffect(init, []);

    return(
        <>
            <ImageBackground
                source={require('../../../assets/auth_background.jpg')}
                style={ containerStyle.backgroundHover100 }>
                <View style={ containerStyle.center }>
                    <Image
                        source={require('../../../assets/geopictures_logo_2.png')}
                        style={style.logo}/>
                    <Text style={ style.textChargement }>Chargement en cours ...</Text>
                </View>
            </ImageBackground>
        </>
    )
}

const style = StyleSheet.create({
    logo: {
        width: "70%",
        height: "70%",
        resizeMode: "contain",
    },
    textChargement: {
        fontSize: 25,
        color: 'white',
        fontWeight: "bold"
    }
});