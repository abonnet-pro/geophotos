import FranceSelectRegion from "../components/france-select-region.component";
import {Image, ImageBackground, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {back} from "../../../utils/uri.utils";
import {commonsStyle, containerStyle, font, primary1} from "../../../commons/styles/commons.styles";
import {Button} from "@rneui/base";
import {useState} from "react";

export default function RegionsContainer({ navigation }) {

    const [regionSelected, setRegionSelected] = useState();

    const goToZones = () => {
        console.log(regionSelected)
        // navigation.navigate("zones", {
        //     regionCode: regionSelected
        // })
    }

    return(
        <ImageBackground
            source={require('../../../../assets/auth_background.jpg')}
            style={ containerStyle.backgroundHover100 }>
            <View style={ style.backContainer }>
                <TouchableWithoutFeedback onPress={ () => navigation.goBack() }>
                    <Image style={ style.back } source={{ uri: back }}></Image>
                </TouchableWithoutFeedback>
            </View>
            <View style={ style.select }>
                <FranceSelectRegion regionSelected={ regionSelected } setRegionSelected={ setRegionSelected }/>
            </View>
            {
                regionSelected ? <Button
                    onPress={goToZones}
                    title="Valider"
                    raised={true}
                    titleStyle={ style.valid }
                    buttonStyle={ commonsStyle.boutonSuccess }/> : null
            }
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    backContainer: {
      marginLeft: 10
    },
    back: {
        width: 50,
        height: 50
    },
    valid: {
        padding: 20,
        backgroundColor: primary1,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 20,
        fontWeight: 'bold',
        fontSize: 35,
        marginTop: -200
    }
});