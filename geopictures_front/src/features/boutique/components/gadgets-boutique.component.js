import {Button, Text} from "@rneui/base";
import {ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {BACKGROUND_ASSETS} from "../../../utils/store.utils";
import {Avatar, Icon, Image} from "@rneui/themed";
import {URL_API} from "../../../utils/url.utils";
import * as React from "react";
import {commonsStyle, font, primary1} from "../../../commons/styles/commons.styles";
import {Gadget} from "../../jeu/enums/gadget.enum";
import {TypeAchatBoutique} from "../enums/type-achat-boutique.enum";

export default function GadgetsBoutique({ gadgetsBoutique, handlePressGadgetInfos, handlePressAchat }) {

    function getImageByGadgetCode(gadgetCode) {
        switch(gadgetCode) {
            case Gadget.GPS:
                return require('../../../../assets/gadget_gps.png');
            case Gadget.TOP_1:
                return require('../../../../assets/gadget_premier.png');
            case Gadget.INDICE:
                return require('../../../../assets/gadget_indice.png');
            case Gadget.DIRECTION:
                return require('../../../../assets/gadget_cardinal.png');
            case Gadget.DISTANCE:
                return require('../../../../assets/gadget_distance.png');
            case Gadget.RECOMMENCER:
                return require('../../../../assets/rejouer.png');
            case Gadget.SUCCESS_ZONE:
                return require('../../../../assets/gadget_success.png');
        }
    }

    return(
        <>
            <View style={style.titreContainer}>
                <Text style={style.titre}>Gadgets</Text>
            </View>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                    gadgetsBoutique && gadgetsBoutique.map(gadget => {
                        return (
                            <View style={style.avatarContainer} key={gadget.gadgetId}>
                                <ImageBackground
                                    source={ BACKGROUND_ASSETS.bordure } style={{ padding:5 }} borderRadius={20}>
                                    <ImageBackground source={ BACKGROUND_ASSETS.background } borderRadius={20}>
                                        <View style={style.bodyContainer}>
                                            <TouchableOpacity onPress={() => handlePressGadgetInfos(gadget)} style={style.imageGadgetContainer}>
                                                <Image style={ style.imageGadget } source={getImageByGadgetCode(gadget.code)}/>
                                            </TouchableOpacity>

                                            <Button onPress={() => handlePressAchat(gadget.boutiqueId, TypeAchatBoutique.GADGET)}
                                                    raised={true}
                                                    radius={20}
                                                    titleStyle={ font(15, 'bold') }
                                                    buttonStyle={ commonsStyle.boutonSuccess }
                                                    containerStyle={style.boutonPrixContainer}>
                                                <Image style={{width:20, height:20}} source={require('../../../../assets/gold.png')}/>
                                                <Text style={style.prix}>{gadget.prix.toString()}</Text>
                                            </Button>
                                        </View>
                                    </ImageBackground>
                                </ImageBackground>
                             </View>
                        )
                    })
                }
            </ScrollView>
        </>
    )
}

const style = StyleSheet.create({
    titreContainer: {
        margin: 20
    },
    titre: {
        fontSize: 24,
        fontWeight: "bold"
    },
    avatarContainer : {
        margin: 5,
        width: 120
    },
    bodyContainer: {
        height: 150,
    },
    prix: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 5
    },
    boutonPrixContainer: {
        margin: 5,
    },
    imageGadgetContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',

        borderWidth:1,
        borderColor:"white",
        borderRadius:100,
        width:70,
        height:70,
        backgroundColor: primary1,

    },
    imageGadget: {
        width: 70,
        height: 70
    }
});