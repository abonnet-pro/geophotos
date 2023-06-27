import {ImageBackground, StyleSheet, View} from "react-native";
import {Button, Text} from "@rneui/base";
import {BACKGROUND_ASSETS} from "../../../utils/store.utils";
import {Avatar, Image} from "@rneui/themed";
import {URL_API} from "../../../utils/url.utils";
import {commonsStyle, font} from "../../../commons/styles/commons.styles";
import * as React from "react";
import {TypeAchatBoutique} from "../enums/type-achat-boutique.enum";

export default function BorduresBoutique({ borduresBoutique, handlePressAchat }) {
    return(
        <>
            <View style={style.titreContainer}>
                <Text style={style.titre}>Bordures</Text>
            </View>

            <View style={style.listeBorudresContainer}>
                {
                    borduresBoutique && borduresBoutique.map(bordure => {
                        return (
                            <View style={style.avatarContainer} key={bordure.bordureId}>
                                <ImageBackground
                                    source={ BACKGROUND_ASSETS.bordure } style={{ padding:5 }} borderRadius={20}>
                                    <ImageBackground source={ BACKGROUND_ASSETS.background } borderRadius={20}>
                                        <View style={style.bodyContainer}>
                                            <View style={style.imageBordureContainer}>
                                                <Avatar
                                                    size={80}
                                                    key={ bordure.id }
                                                    source={{ uri :`${URL_API}/images/${bordure.image}` }}/>
                                            </View>

                                            {
                                                bordure.possede ?
                                                    <View style={style.possedeContainer}>
                                                        <Image style={style.imagePossede} source={require('../../../../assets/check.png')}></Image>
                                                    </View>
                                                    :
                                                    <View style={style.achatContainer}>
                                                        <Button onPress={() => handlePressAchat(bordure.boutiqueId, TypeAchatBoutique.BORDURE)}
                                                                raised={true}
                                                                radius={20}
                                                                titleStyle={ font(15, 'bold') }
                                                                buttonStyle={ commonsStyle.boutonSuccess }
                                                                containerStyle={style.boutonPrixContainer}>
                                                            <Image style={{width:20, height:20}} source={require('../../../../assets/gold.png')}/>
                                                            <Text style={style.prix}>{bordure.prix.toString()}</Text>
                                                        </Button>
                                                    </View>
                                            }

                                        </View>
                                    </ImageBackground>
                                </ImageBackground>
                            </View>
                        )
                    })
                }
            </View>
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
    listeBorudresContainer: {
        flexDirection: "row",
    },
    avatarContainer : {
        margin: 5,
        flex:1
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
        margin: 5
    },
    imageBordureContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        flex:2,
        justifyContent: "center"
    },
    achatContainer: {
        flex:1,
        justifyContent: "flex-end"
    },
    possedeContainer: {
        flex:1,
        justifyContent: "flex-end",
        alignSelf: "center",
    },
    imagePossede: {
        width:30,
        height:30,
        marginBottom: 10
    }
});