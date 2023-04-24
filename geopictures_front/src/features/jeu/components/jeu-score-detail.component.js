import {BACKGROUND_VIEW} from "../../../utils/store.utils";
import {ImageBackground, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {Image} from "@rneui/themed";
import {primary1} from "../../../commons/styles/commons.styles";
import {getColorByScore} from "../../../commons/consts/photo.const";
import { modalfy } from 'react-native-modalfy'

export default function JeuScoreDetail({photo}) {

   const {currentModal,openModal,closeModal,closeModals,closeAllModals} = modalfy();

    function getSuccesGps() {
        if(photo?.succesGps) {
            return require('../../../../assets/gps_valid.png');
        }
        return require('../../../../assets/gps_wrong.png');
    }

    function getSuccesGlobale() {
        if(photo?.succesGlobale) {
            return require('../../../../assets/global_valid.png');
        }
        return require('../../../../assets/global_wrong.png');
    }

    return(
        <>
            <ImageBackground
                source={BACKGROUND_VIEW.bordure} style={{width: "100%", height: '100%'}} borderRadius={20}>
                <View style={{padding: 5}}>
                    <ImageBackground source={BACKGROUND_VIEW.background} style={{width: "100%", height: '100%'}}
                                     borderRadius={20}>
                        <View style={ style.container }>
                            <View style={{height:"100%", justifyContent:"space-between"}}>
                                <View style={ style.rowContainer }>
                                    <Text style={{ fontSize:15, fontWeight: "bold"}}>Ressemblance : <Text style={{color:getColorByScore(photo?.score)}}>{photo?.score}%</Text></Text>
                                    <View style={ style.containerImageClassement }>
                                        <Image style={ style.image } source={require('../../../../assets/podium.png')}/>
                                    </View>
                                </View>
                                <View style={ style.rowContainer }>
                                    <Text style={{ fontSize:15, fontWeight: "bold"}}>Success : </Text>
                                    <View style={ style.containerSuccess }>
                                        <Image onPress={() => openModal('ModalInfoSuccessGps')} style={ style.image } source={getSuccesGps()}/>
                                    </View>
                                    <View style={ style.containerSuccess }>
                                        <Image onPress={() => openModal('ModalInfoSuccessGlobale')} style={ style.image } source={getSuccesGlobale()}/>
                                    </View>
                                </View>
                            </View>
                            <View style={{alignSelf:'center'}}>
                                <View style={ style.containerImageRejouer }>
                                    <Image style={ style.image } source={require('../../../../assets/rejouer.png')}/>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </ImageBackground>
        </>
    )
}

const style = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        height:"100%"
    },
    rowContainer: {
        flexDirection: "row",
    },
    containerImageClassement: {
        marginLeft: 5,
        borderWidth: 1,
        borderColor: "white",
        width: 20,
        height:20,
        backgroundColor: primary1,
        borderRadius: 30,
        padding: 3
    },
    containerImageRejouer: {
        marginLeft: 5,
        borderWidth: 1,
        borderColor: "white",
        width: 35,
        height:35,
        backgroundColor: primary1,
        borderRadius: 50,
        padding: 5
    },
    containerSuccess: {
        marginLeft: 5,
        width: 20,
        height:20,
    },
    image: {
        width: "100%",
        height: "100%"
    },
});