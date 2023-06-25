import {BACKGROUND_ASSETS} from "../../../utils/store.utils";
import {Text} from "@rneui/base";
import * as React from "react";
import {Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {formatDate} from "../../../utils/date.utils";

export default function AdministrationProfil({ joueurs, handlePressLigne }) {

    const getImageActif = (actif) => {
        return actif ? require('../../../../assets/check.png') : require('../../../../assets/cross.png')
    }

    return(
        <ImageBackground
            source={ BACKGROUND_ASSETS.bordure } style={{ padding:5 }} borderRadius={20}>
            <ImageBackground source={ BACKGROUND_ASSETS.background } borderRadius={20}>
                <View style={style.containerDemandes}>
                    <Text style={style.titre}>Profils joueurs</Text>

                    <View style={style.titreProfilContainer}>
                        <Text style={style.titreProfil}>Nom</Text>
                        <Text style={style.titreProfil}>Date création</Text>
                        <Text style={style.titreProfil}>Derniere connexion</Text>
                        <Text style={style.titreProfil}>Actif</Text>
                    </View>
                    <ScrollView style={style.listeProfilsContainer} showsVerticalScrollIndicator={false}>
                        {
                            joueurs && joueurs.length > 0 ?
                                joueurs.map((joueur, index) => {
                                    return(
                                        <TouchableOpacity key={index} style={style.profilContainer} onPress={() => handlePressLigne(joueur)}>
                                            <Text style={style.ligneProfil}>{joueur?.nom}</Text>
                                            <Text style={style.ligneProfil}>{formatDate(joueur?.dateCreation)}</Text>
                                            <Text style={style.ligneProfil}>{formatDate(joueur?.dateDerniereConnexion)}</Text>
                                            <View style={style.ligneProfil}>
                                                <Image source={getImageActif(joueur.actif)} style={style.imageActif}/>
                                            </View>

                                        </TouchableOpacity>
                                    )
                                }) : <View style={style.aucunProfilContainer}><Text style={style.aucunProfilLibelle}>Aucun joueurs</Text></View>
                        }
                    </ScrollView>
                </View>
            </ImageBackground>
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    containerDemandes: {
        height: '100%',
    },
    titre: {
        fontWeight: 'bold',
        fontSize: 24,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        marginBottom: 10
    },
    titreProfilContainer: {
        flexDirection: 'row',
        margin:10,
    },
    titreProfil: {
        flex:1,
        textAlign:'center',
        fontWeight:'bold',
        alignSelf:'center'
    },
    listeProfilsContainer: {
        margin: 10
    },
    profilContainer: {
        flexDirection: 'row',
        marginBottom: 15,
        paddingTop:20,
        paddingBottom:20,
        borderRadius:5,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    ligneProfil: {
        flex:1,
        textAlign:'center',
        fontSize:14,
        alignItems:'center'
    },
    aucunProfilContainer: {
        marginTop:50,
        marginLeft:'auto',
        marginRight:'auto'
    },
    aucunProfilLibelle: {
        fontSize:18,
        color:'#460000'
    },
    imageActif: {
        width: 20,
        height: 20,
    }
});