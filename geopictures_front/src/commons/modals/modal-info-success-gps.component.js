import {Button, Text} from "@rneui/base";
import React from 'react'
import {Image, StyleSheet, View} from "react-native";

const ModalInfoSuccessGps = ({ modal: { closeModal }}) => (
        <View style={ style.modalContainer }>
            <Text style={style.title}>Success Gps</Text>
            <View style={style.descriptionContainer}>
                <Image style={style.image} source={require('../../../assets/gps_valid.png')}></Image>
                <Text style={style.descriptionText}>Le succes Gps est validé lorsque la photo a été prise à moins de 50M du points Gps d'origine.</Text>
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

export default ModalInfoSuccessGps;
