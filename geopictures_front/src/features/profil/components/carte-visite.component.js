import {Image, ImageBackground, StyleSheet, View} from "react-native";
import {BACKGROUND_ASSETS} from "../../../utils/store.utils";
import * as React from "react";
import {Text} from "@rneui/base";
import {URL_API} from "../../../utils/url.utils";

export default function CarteVisite({ profil }) {
    return(
        <>
            <ImageBackground
                source={ BACKGROUND_ASSETS.bordure } style={{ padding:5 }} borderRadius={20}>
                <ImageBackground source={ BACKGROUND_ASSETS.background } borderRadius={20}>
                    <View style={ style.profilContainer }>
                        <View style={ style.avatarContainer }>
                            <ImageBackground style={{zIndex:0}} source={{ uri:`${URL_API}/images/${profil?.bordureActive?.image}` }}>
                                <View style={{zIndex:-1}}>
                                    <Image style={style.avatar} source={{ uri :`${URL_API}/images/${profil?.avatarActif?.image}` }}></Image>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={ style.InformationsContainer }>
                            <View style={style.information}>
                                <Text style={style.nom}>{profil?.nom}</Text>
                                <Text style={style.titre}>{profil?.titreActif?.libelle ? profil?.titreActif?.libelle : 'Aucun titre'}</Text>
                            </View>
                        </View>
                        <View style={ style.niveauContainer }>
                            <ImageBackground style={ style.star } source={require('../../../../assets/star.png')}>
                                <Text style={ style.niveau }>{ profil?.niveau }</Text>
                            </ImageBackground>
                        </View>
                    </View>
                </ImageBackground>
            </ImageBackground>
        </>
    )
}

const style = StyleSheet.create({
    profilContainer: {
        height:"100%",
        flexDirection: "row"
    },
    avatarContainer: {
        flex:1,
        margin:10
    },
    avatar: {
        width:"100%",
        height:"100%"
    },
    InformationsContainer: {
        flex:2,
    },
    information: {
        marginTop:'auto',
        marginBottom:'auto',
        marginLeft:20
    },
    nom: {
        fontWeight: "bold",
        fontSize: 20,
    },
    titre: {
        fontStyle: 'italic'
    },
    niveauContainer : {
        marginTop:'auto',
        marginBottom:'auto',
        marginRight:10,
        width: 50,
        height:50,
    },
    niveau: {
        alignSelf: "center",
        fontWeight: "bold",
        marginTop:'auto',
        marginBottom:'auto'
    },
    star: {
        width: "100%",
        height:"100%",
    },
    bordureContainer: {
        // width:'100%',
        // height:'100%',
        // padding:3
    }
})