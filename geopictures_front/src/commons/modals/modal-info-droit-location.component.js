import {Text} from "@rneui/base";
import React from 'react'
import {StyleSheet, View} from "react-native";

const ModalInfoDroitLocation = ({ modal: { closeModal }}) => (
    <View style={ style.modalContainer }>
        <Text style={style.title}>Authorisation refusée</Text>
        <View style={style.descriptionContainer}>
            <Text style={style.descriptionText}>Vous avez refusé le droit à géopictures de relevé votre position. Veuillez vous rendre dans les paramètres de votre appareil et autoriser la fonctionnalitée. Paramètres -> Application -> Geopictures -> Autorisation -> Position</Text>
        </View>
    </View>
);

const style = StyleSheet.create({
    modalContainer: {
        backgroundColor: "#5f5f5f",
        padding: 20,
        margin: 20,
        borderRadius: 20,
        borderWidth:2,
    },
    title: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        alignSelf:'center'
    },
    descriptionContainer: {
        padding: 10,
    },
    descriptionText: {
        color:"#ffffff",
        alignSelf:'center'
    }
})

export default ModalInfoDroitLocation;
