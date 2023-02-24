import FranceSelectRegion from "../components/france-select-region.component";
import {Image, ImageBackground, StyleSheet, TouchableOpacity, View} from "react-native";
import {commonsStyle, containerStyle, font} from "../../../commons/styles/commons.styles";
import {Button} from "@rneui/base";
import {useState} from "react";

export default function RegionsContainer({ navigation }) {

    const [regionSelected, setRegionSelected] = useState();

    const goToZones = async () => {
        navigation.navigate("zones", {
            regionCode: regionSelected
        })
    }

    const goBack = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'accueil' }],
        });
    }

    return(
        <>
            <ImageBackground
                source={require('../../../../assets/auth_background.jpg')}
                style={ containerStyle.backgroundHover100 }>
                <View style={ style.backContainer }>
                    <TouchableOpacity onPress={ () => goBack() }>
                        <Image style={ style.back } source={require('../../../../assets/back.png')}></Image>
                    </TouchableOpacity>
                </View>
                <View style={ style.franceContainer }>
                    <FranceSelectRegion regionSelected={ regionSelected } setRegionSelected={ setRegionSelected }/>
                </View>
                {
                    regionSelected ?
                        <>
                            <Button onPress={() => goToZones()}
                                    title="Valider"
                                    raised={true}
                                    radius={20}
                                    titleStyle={ font(35, 'bold') }
                                    buttonStyle={ commonsStyle.boutonSuccess }
                                    containerStyle={ style.containerValid }/>
                        </>
                        : null
                }
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
    franceContainer: {
        marginTop: 40,
    },
    containerValid: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 'auto',
        marginTop: -200,
    }
});