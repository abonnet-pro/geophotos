import {BackHandler, Image, ImageBackground, StyleSheet, View} from "react-native";
import {containerStyle} from "../../commons/styles/commons.styles";
import {Text} from "@rneui/base";
import {useEffect} from "react";
import {getValueFor, JOUEUR, storeAssets} from "../../utils/store.utils";
import { useAssets} from 'expo-asset';

export default function ChargementContainer({ navigation }) {

    const [assets, error] = useAssets([require('../../../assets/background_wood.jpg'),
        require('../../../assets/bordure_wood.jpg')
    ]);

    const init = () => {
        if(!assets || assets.length < 2) {
            return;
        }
        storeAssets(assets);

        getValueFor(JOUEUR).then(joueur => {
            if(joueur) {
                navigation.navigate('accueil');
            } else {
                navigation.navigate('authentification');
            }
        });
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