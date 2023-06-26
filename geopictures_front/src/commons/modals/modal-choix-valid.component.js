import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, View} from "react-native";
import {Button} from "@rneui/themed";

const ModalChoixValid = ({ modal: { closeModal, getParam }}) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleValid = () => {
        closeModal(undefined, getParam('callback'));
    }

    const init = () => {
        const title = getParam("title", "");
        const description = getParam("description", "");
        setTitle(title);
        setDescription(description);
    }

    useEffect(init, []);

    return(
        <>
            <View style={style.modalContainer}>
                <View style={style.titleContainer}>
                    <Text style={style.title}>{title}</Text>
                </View>
                <View style={style.descriptionContainer}>
                    <Text style={style.description}>{description}</Text>
                </View>
                <View style={style.boutonContainer}>
                    <Button buttonStyle={style.boutonValid} title={"Valider"} onPress={handleValid}></Button>
                    <Button buttonStyle={style.boutonCancel} title={"Annuler"} onPress={closeModal}></Button>
                </View>
            </View>
        </>
    )
};

const style = StyleSheet.create({
    modalContainer: {
        backgroundColor: "#5f5f5f",
        padding: 20,
        borderRadius: 20,
        borderWidth:2,
        margin:20
    },
    titleContainer: {
        alignSelf:'center',
        margin:5
    },
    title: {
        fontWeight:'bold',
        color:'white',
        fontSize:20,
        textAlign:'center'
    },
    descriptionContainer: {
        margin:5
    },
    description: {
        color:'white',
        textAlign:'center'
    },
    boutonContainer: {
        flexDirection:'row',
        alignSelf:'center',
        marginTop:10
    },
    boutonValid: {
        margin:5,
        backgroundColor:'darkgreen',
        borderRadius:10
    },
    boutonCancel: {
        borderRadius:10,
        margin:5,
        backgroundColor:'darkred'
    }
})

export default ModalChoixValid;
