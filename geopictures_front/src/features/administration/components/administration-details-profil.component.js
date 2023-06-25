import CarteVisite from "../../profil/components/carte-visite.component";
import {Image, ImageBackground, ScrollView, StyleSheet, TextInput, View} from "react-native";
import {BACKGROUND_ASSETS} from "../../../utils/store.utils";
import {Button, Text} from "@rneui/base";
import {formatDate} from "../../../utils/date.utils";
import * as React from "react";
import {commonsStyle, font} from "../../../commons/styles/commons.styles";

export default function AdministrationDetailsProfil({ profil, setRaisonSuspension, raisonSuspension, handleValidSuspension, handleValidSuppression }) {

    const getImageActif = (actif) => {
        return actif ? require('../../../../assets/check.png') : require('../../../../assets/cross.png')
    }

    const handlePressSuspension = () => {
        const actif = !profil.actif;
        handleValidSuspension(profil, actif);
    }

    return(
        <>
            <View style={style.carteVisiteContainer}>
                <CarteVisite profil={profil}></CarteVisite>
            </View>
            <View style={style.detailsContainer}>
                <ImageBackground
                    source={ BACKGROUND_ASSETS.bordure } style={{ padding:5 }} borderRadius={20}>
                    <ImageBackground source={ BACKGROUND_ASSETS.background } borderRadius={20}>
                        <ScrollView style={style.containerBody}>
                            <View style={style.ligneInfoContainer}>
                                <Text style={style.titreLibelleInfo}>Date de création : </Text>
                                <Text style={style.libelleInfo}>{formatDate(profil.dateCreation)}</Text>
                            </View>

                            <View style={style.ligneInfoContainer}>
                                <Text style={style.titreLibelleInfo}>Date de dernière connexion : </Text>
                                <Text style={style.libelleInfo}>{formatDate(profil.dateDerniereConnexion)}</Text>
                            </View>

                            <View style={style.ligneInfoContainer}>
                                <Text style={style.titreLibelleInfo}>Synchronisé Google : </Text>
                                <Image source={getImageActif(profil.synchroGoogle)} style={style.imageActif}/>
                            </View>

                            <View style={style.ligneInfoContainer}>
                                <Text style={style.titreLibelleInfo}>Compte actif : </Text>
                                <Image source={getImageActif(profil.actif)} style={style.imageActif}/>
                            </View>

                            {
                                !profil.actif &&
                                <View style={style.ligneInfoContainer}>
                                    <Text style={style.titreLibelleInfo}>Suspendu le : </Text>
                                    <Text style={style.libelleInfo}>{formatDate(profil.dateSuspension)}</Text>
                                </View>
                            }

                            <View style={style.ligneInfoContainer}>
                                <Text style={style.titreLibelleInfo}>Raison suspension : </Text>
                                <View style={style.formulaireInputContainer}>
                                    <TextInput value={profil.raisonSuspension} onChangeText={setRaisonSuspension} multiline={true} numberOfLines={5} />
                                </View>
                            </View>

                            <View style={style.boutonsActionsContainer}>
                                <Button
                                    onPress={() => handleValidSuppression(profil)}
                                    title={"Supprimer"}
                                    raised={true}
                                    radius={20}
                                    containerStyle={ style.boutonActionContainer }
                                    titleStyle={ font(15, 'bold') }
                                    buttonStyle={ commonsStyle.boutonDanger }/>

                                <Button
                                    onPress={handlePressSuspension}
                                    disabled={profil.actif && !raisonSuspension}
                                    title={profil.actif ? "Suspendre" : "Activer"}
                                    raised={true}
                                    radius={20}
                                    containerStyle={ style.boutonActionContainer }
                                    titleStyle={ font(15, 'bold') }
                                    buttonStyle={ commonsStyle.boutonDanger }/>
                            </View>
                        </ScrollView>
                    </ImageBackground>
                </ImageBackground>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    carteVisiteContainer: {
        flex:1,
    },
    detailsContainer: {
        flex:5,
        marginTop:10
    },
    containerBody: {
        height: "100%",
        padding:20
    },
    ligneInfoContainer: {
        flexDirection: "row",
        marginBottom:15,
        flexWrap: "wrap"
    },
    titreLibelleInfo: {
        fontWeight: "bold",
        fontSize: 16
    },
    libelleInfo: {
        fontSize: 16,
    },
    imageActif: {
        width: 20,
        height: 20,
        marginLeft:5
    },
    formulaireInputContainer: {
        marginTop:10,
        padding:5,
        backgroundColor: 'white',
        borderRadius: 20,
        width:"100%"
    },
    boutonsActionsContainer: {
        flexDirection: "row",
        alignSelf:"center",
    },
    boutonActionContainer: {
        minWidth: 100,
        margin:10
    }
})