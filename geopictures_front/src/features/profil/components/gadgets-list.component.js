import * as React from "react";
import {Image, StyleSheet, View} from "react-native";
import {primary1} from "../../../commons/styles/commons.styles";
import {Text} from "@rneui/base";
import {Gadget} from "../../jeu/enums/gadget.enum";
import Touchable from "react-native-material-tabs/src/components/Touchable";
import {modalfy} from "react-native-modalfy";

export default function GadgetsList({ gadgets }) {

    const {currentModal,openModal,closeModal,closeModals,closeAllModals} = modalfy();

    const handlePressGps = () => {
        openModal("ModalInfoGadget", {gadget: gadgets.find(gadget => gadget.code === Gadget.GPS)});
    }

    const handlePressDistance = () => {
        openModal("ModalInfoGadget", {gadget: gadgets.find(gadget => gadget.code === Gadget.DISTANCE)})
    }

    const handlePressDirection = () => {
        openModal("ModalInfoGadget", {gadget: gadgets.find(gadget => gadget.code === Gadget.DIRECTION)})
    }

    const handlePressPremier = () => {
        openModal("ModalInfoGadget", {gadget: gadgets.find(gadget => gadget.code === Gadget.TOP_1)})
    }

    const handlePressSuccess = () => {
        openModal("ModalInfoGadget", {gadget: gadgets.find(gadget => gadget.code === Gadget.SUCCESS_ZONE)})
    }

    const handlePressIndice = () => {
        openModal("ModalInfoGadget", {gadget: gadgets.find(gadget => gadget.code === Gadget.INDICE)})
    }

    const handlePressRecommencer = () => {
        openModal("ModalInfoGadget", {gadget: gadgets.find(gadget => gadget.code === Gadget.RECOMMENCER)})
    }

    function getQuantite(codeGadget) {
        return gadgets.find(gadget => gadget.code === codeGadget)?.quantite ? gadgets.find(gadget => gadget.code === codeGadget)?.quantite : 0;
    }

    return(
        <>
            <View style={style.containerGadget}>
                <Touchable style={style.containerImageGadget} onPress={handlePressGps}>
                    <Image style={ style.imageGadget } source={require('../../../../assets/gadget_gps.png')}/>
                </Touchable>
                <Text style={style.quantite}>Quantité : {getQuantite(Gadget.GPS)}</Text>
            </View>

            <View style={style.containerGadget}>
                <Touchable style={style.containerImageGadget} onPress={handlePressDistance}>
                    <Image style={ style.imageGadget } source={require('../../../../assets/gadget_distance.png')}/>
                </Touchable>
                <Text style={style.quantite}>Quantité : {getQuantite(Gadget.DISTANCE)}</Text>
            </View>

            <View style={style.containerGadget}>
                <Touchable style={style.containerImageGadget} onPress={handlePressDirection}>
                    <Image style={ style.imageGadget } source={require('../../../../assets/gadget_cardinal.png')}/>
                </Touchable>
                <Text style={style.quantite}>Quantité : {getQuantite(Gadget.DIRECTION)}</Text>
            </View>

            <View style={style.containerGadget}>
                <Touchable style={style.containerImageGadget} onPress={handlePressPremier}>
                    <Image style={ style.imageGadget } source={require('../../../../assets/gadget_premier.png')}/>
                </Touchable>
                <Text style={style.quantite}>Quantité : {getQuantite(Gadget.TOP_1)}</Text>
            </View>

            <View style={style.containerGadget}>
                <Touchable style={style.containerImageGadget} onPress={handlePressSuccess}>
                    <Image style={ style.imageGadget } source={require('../../../../assets/gadget_success.png')}/>
                </Touchable>
                <Text style={style.quantite}>Quantité : {getQuantite(Gadget.SUCCESS_ZONE)}</Text>
            </View>

            <View style={style.containerGadget}>
                <Touchable style={style.containerImageGadget} onPress={handlePressIndice}>
                    <Image style={ style.imageGadget } source={require('../../../../assets/gadget_indice.png')}/>
                </Touchable>
                <Text style={style.quantite}>Quantité : {getQuantite(Gadget.INDICE)}</Text>
            </View>

            <View style={style.containerGadget}>
                <Touchable style={style.containerImageGadget} onPress={handlePressRecommencer}>
                    <Image style={ style.imageGadget } source={require('../../../../assets/rejouer.png')}/>
                </Touchable>
                <Text style={style.quantite}>Quantité : {getQuantite(Gadget.RECOMMENCER)}</Text>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    containerImageGadget: {
        borderWidth:1,
        borderColor:"white",
        borderRadius:100,
        margin:5,
        width:100,
        height:100,
        backgroundColor: primary1,
    },
    imageGadget: {
        marginTop:'auto',
        marginBottom:'auto',
        marginStart:'auto',
        marginEnd:'auto',
        width:80,
        height:80,
    },
    quantite: {
        textAlign:'center',
        fontWeight:'bold'
    },
    containerGadget: {
        marginBottom:20
    }
})