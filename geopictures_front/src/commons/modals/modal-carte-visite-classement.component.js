import React, {useEffect, useState} from 'react'
import {ImageBackground, ScrollView, StyleSheet, View} from "react-native";
import {Button} from "@rneui/themed";
import { getClassementByPhotoId } from '../../features/classement/services/classement.service';
import { Text } from '@rneui/base';
import ClassementResume from '../../features/classement/component/classement-resume.component';
import { getJoueurProfil } from '../../features/profil/services/profil.service';
import CarteVisite from '../../features/profil/components/carte-visite.component';

const ModalCarteVisiteClassement = ({ modal: { closeModal, getParam }}) => {

    const [joueurProfil, setJoueurProfil] = useState("");

    const init = () => {
        const joueurId = getParam("joueurId", "");
        getJoueurProfil(joueurId)
            .then(joueurProfil => setJoueurProfil(joueurProfil.data))
            .catch(err => console.log(err));
    }

    useEffect(init, []);

    return(
        <View style={style.modalContainer}>
        <CarteVisite profil={joueurProfil}/>
        </View>
    )
};

const style = StyleSheet.create({
    modalContainer: {
        padding: 20,
        marginTop: "auto",
        marginBottom: "auto",
        width: 350,
        height: 150
    },
    titleContainer: {
        alignSelf:'center',
        margin:5
    },
    title: {
        fontWeight:'bold',
        color:'white',
        fontSize:20,
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

export default ModalCarteVisiteClassement;
