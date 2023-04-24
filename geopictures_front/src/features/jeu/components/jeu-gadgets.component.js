import {ImageBackground, StyleSheet, View} from "react-native";
import {BACKGROUND_ASSETS} from "../../../utils/store.utils";
import {Image} from "@rneui/themed";
import * as React from "react";
import {primary1} from "../../../commons/styles/commons.styles";

export default function JeuGadgets() {
    return(
        <>
            <ImageBackground
                source={BACKGROUND_ASSETS.bordure} style={{width: "100%", height: '100%'}} borderRadius={20}>
                <View style={{padding: 5}}>
                    <ImageBackground source={BACKGROUND_ASSETS.background} style={{width: "100%", height: '100%'}}
                                     borderRadius={20}>
                        <View style={ style.containerGadgets }>
                            <View style={ style.containerGadget }>
                                <View style={ style.containerImageGadget }>
                                    <Image style={ style.imageGadget } source={require('../../../../assets/gadget_gps.png')}/>
                                </View>
                            </View>
                            <View style={ style.containerGadget }>
                                <View style={ style.containerImageGadget }>
                                    <Image style={ style.imageGadget } source={require('../../../../assets/gadget_distance.png')}/>
                                </View>
                            </View>
                            <View style={ style.containerGadget }>
                                <View style={ style.containerImageGadget }>
                                    <Image style={ style.imageGadget } source={require('../../../../assets/gadget_cardinal.png')}/>
                                </View>
                            </View>
                            <View style={ style.containerGadget }>
                                <View style={ style.containerImageGadget }>
                                    <Image style={ style.imageGadget } source={require('../../../../assets/gadget_success.png')}/>
                                </View>
                            </View>
                            <View style={ style.containerGadget }>
                                <View style={ style.containerImageGadget }>
                                    <Image style={ style.imageGadget } source={require('../../../../assets/gadget_premier.png')}/>
                                </View>
                            </View>
                            <View style={ style.containerGadget }>
                                <View style={ style.containerImageGadget }>
                                    <Image style={ style.imageGadget } source={require('../../../../assets/gadget_indice.png')}/>
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
    containerGadgets: {
        height:"100%",
        flexDirection:"row",
    },
    containerGadget: {
        flex:1,
        alignSelf:'center',
        borderWidth:1,
        borderColor:'white',
        margin:5,
        borderRadius: 50,
        width:50,
        height:50,
        backgroundColor: primary1,
    },
    containerImageGadget: {
        height:"100%",
        width:"100%",
        alignSelf:'center',
        padding:5
    },
    imageGadget: {
        marginTop:'auto',
        marginBottom:'auto',
        marginStart:'auto',
        marginEnd:'auto',
        width:"100%",
        height:"100%",
    },
})