import {Text} from "@rneui/base";
import React, {useEffect, useState} from 'react'
import {Button, Image, StyleSheet, View} from "react-native";
import {Gadget} from "../../jeu/enums/gadget.enum";
const ModalInfoGadget = ({ modal: { closeModal, getParam  }}) => {

    const [gadget, setGadget] = useState(null);
    const [showAction, setShowAction] = useState(true);
    const [navigation, setNavigation] = useState(null);

    const init = () => {
        const gadget = getParam("gadget", null);
        setGadget(gadget);
        const showAction = getParam("showAction", true);
        setShowAction(showAction);
        const navigation = getParam("navigation", null);
        setNavigation(navigation);
    }

    function getImage() {
        switch (gadget?.code) {
            case Gadget.GPS:
                return require('../../../../assets/gadget_gps.png');
            case Gadget.DISTANCE:
                return require('../../../../assets/gadget_distance.png');
            case Gadget.INDICE:
                return require('../../../../assets/gadget_indice.png');
            case Gadget.TOP_1:
                return require('../../../../assets/gadget_premier.png');
            case Gadget.RECOMMENCER:
                return require('../../../../assets/rejouer.png');
            case Gadget.SUCCESS_ZONE:
                return require('../../../../assets/gadget_success.png');
            case Gadget.DIRECTION:
                return require('../../../../assets/gadget_cardinal.png');
        }
    }

    function getTitre() {
        switch (gadget?.code) {
            case Gadget.GPS:
                return "Gps";
            case Gadget.DISTANCE:
                return "Distance";
            case Gadget.INDICE:
                return "Indice";
            case Gadget.TOP_1:
                return "Top 1";
            case Gadget.RECOMMENCER:
                return "Recommencer";
            case Gadget.SUCCESS_ZONE:
                return "Succès zone";
            case Gadget.DIRECTION:
                return "Direction";
        }
    }

    const handlePressNavigation = () => {
        navigation.navigate("boutique");
        closeModal();
    }

    useEffect(init, []);

    return(
        <>
            <View style={ style.modalContainer }>
                <Text style={style.title}>Gadget {getTitre()}</Text>
                <View style={style.descriptionContainer}>
                    <Image style={style.image} source={getImage()}></Image>
                    <Text style={style.descriptionText}>{gadget?.libelle}</Text>
                </View>
                {showAction && <Text style={style.stock}>En stock : {gadget?.quantite}</Text>}
                { showAction && <Button title={"Acheter"} color={"green"} onPress={handlePressNavigation}></Button>}
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

export default ModalInfoGadget;
