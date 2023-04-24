import {Button, Text} from "@rneui/base";
import React from 'react'
import {Image, StyleSheet, View} from "react-native";

const ModalInfoSuccessGlobal = ({ modal: { closeModal }}) => (
    <View style={ style.modalContainer }>
        <Text style={style.title}>Success Globale</Text>
        <View style={style.descriptionContainer}>
            <Image style={style.image} source={require('../../../assets/global_valid.png')}></Image>
            <Text style={style.descriptionText}>Le succes Globale est validé lorsque le succès Gps est validé et qu'un score de minimun 80% a été réalisé.</Text>
        </View>
    </View>
);

const style = StyleSheet.create({
    modalContainer: {
        backgroundColor: "#5f5f5f",
        padding: 20,
        borderRadius: 20,
        borderWidth:2,
    },
    title: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        alignSelf:'center'
    },
    image: {
        width: 100,
        height: 100
    },
    descriptionContainer: {
        padding: 10,
        marginTop: 20,
        flexDirection: "row"
    },
    descriptionText: {
        maxWidth: "50%",
        color:"#ffffff"
    }
})

export default ModalInfoSuccessGlobal;
