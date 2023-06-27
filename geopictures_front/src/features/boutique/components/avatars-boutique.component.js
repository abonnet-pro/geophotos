import {Button, Text} from "@rneui/base";
import {ImageBackground, StyleSheet, View} from "react-native";
import {BACKGROUND_ASSETS} from "../../../utils/store.utils";
import {Avatar, Icon, Image} from "@rneui/themed";
import {URL_API} from "../../../utils/url.utils";
import * as React from "react";
import {commonsStyle, font} from "../../../commons/styles/commons.styles";
import {TypeAchatBoutique} from "../enums/type-achat-boutique.enum";

export default function AvatarsBoutique({ avatarsBoutique, handlePressAchat }) {
    return(
        <>
            <View style={style.titreContainer}>
                <Text style={style.titre}>Avatars</Text>
            </View>

            <View style={style.listeAvatarsContainer}>
                {
                    avatarsBoutique && avatarsBoutique.map(avatar => {
                        return (
                            <View style={style.avatarContainer} key={avatar.avatarId}>
                                <ImageBackground
                                    source={ BACKGROUND_ASSETS.bordure } style={{ padding:5 }} borderRadius={20}>
                                    <ImageBackground source={ BACKGROUND_ASSETS.background } borderRadius={20}>
                                        <View style={style.bodyContainer}>
                                            <View style={style.imageAvatarContainer}>
                                                <Avatar
                                                    size={80}
                                                    key={ avatar.id }
                                                    rounded
                                                    source={{ uri :`${URL_API}/images/${avatar.image}` }}/>
                                            </View>

                                            {
                                                avatar.possede ?
                                                    <View style={style.possedeContainer}>
                                                        <Image style={style.imagePossede} source={require('../../../../assets/check.png')}></Image>
                                                    </View>
                                                    :
                                                    <View style={style.achatContainer}>
                                                        <Button onPress={() => handlePressAchat(avatar.boutiqueId, TypeAchatBoutique.AVATAR)}
                                                                raised={true}
                                                                radius={20}
                                                                titleStyle={ font(15, 'bold') }
                                                                buttonStyle={ commonsStyle.boutonSuccess }
                                                                containerStyle={style.boutonPrixContainer}>
                                                            <Image style={{width:20, height:20}} source={require('../../../../assets/gold.png')}/>
                                                            <Text style={style.prix}>{avatar.prix.toString()}</Text>
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
    listeAvatarsContainer: {
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
        margin: 5,
    },
    imageAvatarContainer: {
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