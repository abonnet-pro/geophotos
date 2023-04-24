import {Image, StyleSheet, View} from "react-native";
import {Text} from "@rneui/base";
import {useEffect, useState} from "react";
import LoadingView from "./loading.component";

export default function LoadingGeneral({ titre }) {
    return (
        <View style={ style.loadingGeneralContainer }>
            <View style={style.centerContainer}>
                <Image resizeMode={"contain"} style={ style.loadingGeneraleImage } source={require('../../../assets/geopictures_logo_1.png')}></Image>
                <Text style={ style.texte }>{titre}</Text>
                <LoadingView color={"white"}></LoadingView>
            </View>

        </View>
    )
}

const style = StyleSheet.create({
    loadingGeneralContainer: {
        width: "100%",
        height:"100%",
        position:'absolute',
        zIndex:1,
        backgroundColor: 'rgba(0,0,0,0.75)',
    },
    loadingGeneraleImage: {
        width:200,
        height:200,
        alignSelf:'center',
    },
    centerContainer: {
        marginTop:'auto',
        marginBottom:'auto',
    },
    texte: {
        margin: 20,
        fontSize: 20,
        fontWeight:"bold",
        color:"white",
        alignSelf:'center'
    }
})