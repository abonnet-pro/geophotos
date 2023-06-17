import {commonsStyle, containerStyle, font} from "../../../commons/styles/commons.styles";
import LoadingGeneral from "../../../commons/component/loading-general.component";
import * as React from "react";
import {Image, ImageBackground, StyleSheet, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import {Button} from "@rneui/base";
import MesDemandes from "../../mes-demandes/component/mes-demandes.component";
import {BACKGROUND_ASSETS} from "../../../utils/store.utils";

export default function AdministrationContainer({ navigation }) {

    const [loading, setLoading] = useState(false);

    return(
        <ImageBackground
            source={require('../../../../assets/auth_background.jpg')}
            style={ containerStyle.backgroundHover100 }>
            { loading && <LoadingGeneral titre={"Chargement en cours"}/> }

            <View style={ style.backContainer }>
                <TouchableOpacity onPress={ () => navigation.goBack() }>
                    <Image style={ style.back } source={require('../../../../assets/back.png')}></Image>
                </TouchableOpacity>
            </View>

            <View style={style.containerBody}>
                <View>
                    <ImageBackground
                        source={ BACKGROUND_ASSETS.bordure } style={{ padding:5 }} borderRadius={20}>
                        <ImageBackground source={ BACKGROUND_ASSETS.background } borderRadius={20}>
                            <View style={style.containerDemandes}>
                            </View>
                        </ImageBackground>
                    </ImageBackground>
                </View>
            </View >

        </ImageBackground>
    )
}

const style = StyleSheet.create({
    containerBody: {
        marginTop:5,
        marginRight:10,
        marginLeft:10,
        marginBottom:10,
        flex:1
    },
    boutonsHeaderContainer: {
        // flexDirection: "row",
        // marginTop:10,
        // marginRight:10,
        // marginLeft:10,
        // marginBottom:5,
        // justifyContent:'flex-start'
    },
    containerDemandes: {
        height:'100%'
    },
    back: {
        width: 50,
        height: 50
    },
    backContainer: {
        marginLeft: 10,
        flexDirection: "row",
        alignItems:'center',
        marginTop:5,
        marginBottom:5
    }
});