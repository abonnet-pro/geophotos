import {Text} from "@rneui/base";
import React, {useEffect, useState} from 'react'
import {Button, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {getGadget, useGadget} from "../services/jeu.service";
import {Gadget} from "../enums/gadget.enum";
import LoadingView from "../../../commons/component/loading.component";
import * as Clipboard from 'expo-clipboard';
import Toast from "react-native-root-toast";

const ModalUseGadgetGps = ({ modal: { closeModal, getParam  }}) => {

    const [gadget, setGadget] = useState(null);
    const [loading, setLoading] = useState(false);

    const init = () => {
        const photoId = getParam('photoId', null);
        setLoading(true);
        getGadget(Gadget.GPS, photoId)
            .then(res => setGadget(res.data))
            .catch(err => Toast.show("Une erreur est survenu"))
            .finally(() => setLoading(false));
    }

    const handlePressUseGadgetGps = async () => {
        setLoading(true);
        const photoId = getParam('photoId', null);
        useGadget(Gadget.GPS, photoId)
            .then(res => setGadget(res.data))
            .catch(err => Toast.show("Une erreur est survenu"))
            .finally(() => setLoading(false));
    }

    const handlePressClipboard = async () => {
        await Clipboard.setStringAsync(gadget.reponse);
    }

    useEffect(init, []);

    return(
        <>
            {
                loading ?
                    <LoadingView color={"white"}/>
                    :
                    <View style={ style.modalContainer }>
                        <Text style={style.title}>Gadget Gps</Text>
                        <View style={style.descriptionContainer}>
                            <Image style={style.image} source={require('../../../../assets/gadget_gps.png')}></Image>
                            <Text style={style.descriptionText}>{gadget?.libelle}</Text>
                        </View>
                        <Text style={style.stock}>En stock : {gadget?.quantite}</Text>
                        {
                            gadget?.reponse ?
                                <View style={style.reponseContainer}>
                                    <Text style={style.reponse}>{gadget.reponse}</Text>
                                    <TouchableOpacity onPress={handlePressClipboard}>
                                        <Image style={style.copyImage} source={require('../../../../assets/copy.png')}/>
                                    </TouchableOpacity>
                                </View>
                                :
                                <>
                                {
                                    gadget?.quantite > 0 ?
                                        <Button title={"utiliser"} color={"green"} onPress={handlePressUseGadgetGps}></Button>
                                        :
                                        <Button title={"Acheter"} color={"green"}></Button>
                                }
                                </>
                        }
                    </View>
            }
        </>

        )
};

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
        borderWidth:2,
        width: 100,
        height: 100
    },
    descriptionContainer: {
        padding: 10,
        flexDirection: "row",
        justifyContent:'space-between'
    },
    descriptionText: {
        maxWidth: "50%",
        color:"#ffffff",
        alignSelf:'center'
    },
    stock: {
        alignSelf:'center',
        margin:10,
        color:"white",
        fontWeight:'bold'
    },
    reponseContainer: {
        margin:10,
        flexDirection:"row",
        alignSelf:'center'
    },
    reponse: {
        color:"white",
        fontWeight:'bold',
    },
    copyImage: {
        width:20,
        height:20,
        marginLeft: 10,
    }
})

export default ModalUseGadgetGps;
