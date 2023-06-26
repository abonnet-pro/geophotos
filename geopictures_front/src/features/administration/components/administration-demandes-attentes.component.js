import {Image, ImageBackground, ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {BACKGROUND_ASSETS} from "../../../utils/store.utils";
import * as React from "react";
import {Button, Text} from "@rneui/base";
import {useEffect, useState} from "react";
import {TypeDemande} from "../../mes-demandes/enums/type-demande.enum";
import LoadingView from "../../../commons/component/loading.component";
import {URL_API} from "../../../utils/url.utils";
import {commonsStyle, font, primary1} from "../../../commons/styles/commons.styles";
import {formatDate} from "../../../utils/date.utils";

export default function AdministrationDemandesAttentes({ demandesEnAttentes, handlePressImage, handleRefuseDemande, handleAcceptDemande }) {

    const [demandeSelected, setDemandeSelected] = useState(null);
    const [nombreDemandes, setNombreDemandes] = useState(null);
    const [demandeSelectedIndex, setDemandeSelectedIndex] = useState(null);
    const [commentaire, setCommentaire] = useState(null);

    const init = () => {
        if(demandesEnAttentes && demandesEnAttentes.length > 0) {
            setDemandeSelected(demandesEnAttentes[0]);
            setNombreDemandes(demandesEnAttentes.length);
            setDemandeSelectedIndex(0);
        }
    }

    const handleNextDemande = () => {
        if(isDerniereDemande()) {
            return;
        }

        setDemandeSelectedIndex(demandeSelectedIndex + 1);
        setDemandeSelected(demandesEnAttentes[demandeSelectedIndex + 1]);
    }

    const handlePreviusDemande = () => {
        if(isPremiereDemande()) {
            return;
        }

        setDemandeSelectedIndex(demandeSelectedIndex - 1);
        setDemandeSelected(demandesEnAttentes[demandeSelectedIndex - 1]);
    }

    const isPremiereDemande = () => {
        return demandeSelectedIndex - 1 < 0;
    }

    const isDerniereDemande = () => {
        return demandeSelectedIndex + 1 >= demandesEnAttentes.length;
    }

    const getPrecedentImage = () => {
        return isPremiereDemande() ? require('../../../../assets/precedent_disabled.png') : require('../../../../assets/precedent.png');
    }

    const getSuivantImage = () => {
        return isDerniereDemande() ? require('../../../../assets/suivant_disabled.png') : require('../../../../assets/suivant.png');
    }

    useEffect(init, [demandesEnAttentes]);

    return(
        <ImageBackground
            source={ BACKGROUND_ASSETS.bordure } style={{ padding:5 }} borderRadius={20}>
            <ImageBackground source={ BACKGROUND_ASSETS.background } borderRadius={20}>
                <View style={style.containerDemandes}>
                    <Text style={style.titre}>Demandes en attentes</Text>
                    {
                        demandesEnAttentes && demandesEnAttentes.length > 0 ?
                            <>
                                <View style={style.containerListe}>
                                    <TouchableOpacity style={style.precedentContainer} onPress={handlePreviusDemande} disabled={isPremiereDemande()}>
                                        <Image style={style.chevron} source={getPrecedentImage()}></Image>
                                    </TouchableOpacity>

                                    <View style={style.etatListeContainer}>
                                        <Text style={style.libelle}>Demande {demandeSelectedIndex + 1} / {nombreDemandes} </Text>
                                    </View>

                                    <TouchableOpacity style={style.suivantContainer} onPress={handleNextDemande} disabled={isDerniereDemande()}>
                                        <Image style={style.chevron} source={getSuivantImage()}></Image>
                                    </TouchableOpacity>
                                </View>

                                <ScrollView style={style.demandeContainer} showsVerticalScrollIndicator={false}>

                                    <View style={style.typeDemandeContainer}>
                                        <Text style={style.typeDemande}>{demandeSelected?.typeDemande}</Text>
                                    </View>

                                    <View style={style.infosContainer}>
                                        <Text style={style.libelle}><Text style={{fontWeight:'bold'}}>Publié par :</Text> {demandeSelected?.nomJoueur}</Text>
                                        <Text style={style.libelle}><Text style={{fontWeight:'bold'}}>Le :</Text> {formatDate(demandeSelected?.dateDemande)}</Text>
                                    </View>

                                    <View style={style.infosContainer}>
                                        {demandeSelected?.typeDemande === TypeDemande.PHOTO ? <Text style={style.libelle}><Text style={{fontWeight:'bold'}}>Zone :</Text> {demandeSelected?.zone}</Text> : <></>}
                                        <Text style={style.libelle}><Text style={{fontWeight:'bold'}}>Région :</Text> {demandeSelected?.region}</Text>
                                    </View>

                                    <View style={style.infosContainer}>
                                        <Text style={style.libelle}><Text style={{fontWeight:'bold'}}>Titre :</Text> {demandeSelected?.libelle}</Text>
                                        { demandeSelected?.typeDemande === TypeDemande.PHOTO && <Text style={style.libelle}><Text style={{fontWeight:'bold'}}>Indice :</Text> {demandeSelected?.indice}</Text>}
                                    </View>

                                    {
                                        demandeSelected?.image ?
                                            <TouchableOpacity style={style.imageContainer} onPress={() => handlePressImage(demandeSelected?.image)}>
                                                <Image style={ style.image }
                                                       borderRadius={10}
                                                       PlaceholderContent={ <LoadingView/>}
                                                       source={{ uri: `${URL_API}/photos/${demandeSelected?.image}` }}
                                                />
                                            </TouchableOpacity>
                                            :
                                            <></>
                                    }

                                    <Text style={{...style.libelle, fontWeight:'bold', marginBottom:5}}>Commentaire :</Text>
                                    <View style={ style.formulaireInputContainer}>
                                        <TextInput onChangeText={setCommentaire} multiline={true} numberOfLines={5} />
                                    </View>

                                    <View style={style.actionsContainer}>
                                        <Button
                                            onPress={() => handleRefuseDemande(demandeSelected, commentaire)}
                                            title="Refuser"
                                            raised={true}
                                            radius={20}
                                            titleStyle={ font(15, 'bold') }
                                            containerStyle={style.actionContainer}
                                            buttonStyle={ commonsStyle.boutonDanger }/>

                                        <Button
                                            onPress={() => handleAcceptDemande(demandeSelected, commentaire)}
                                            title="Valider"
                                            raised={true}
                                            radius={20}
                                            titleStyle={ font(15, 'bold') }
                                            containerStyle={style.actionContainer}
                                            buttonStyle={ commonsStyle.boutonSuccess }/>
                                    </View>
                                </ScrollView>
                            </>
                        :
                        <View style={style.aucuneDemandeContainer}><Text style={style.aucuneDemandeLibelle}>Aucune demandes en cours</Text></View>
                    }

                </View>
            </ImageBackground>
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    containerDemandes: {
        height:'100%',
    },
    titre: {
        fontWeight:'bold',
        fontSize:24,
        marginLeft:'auto',
        marginRight:'auto',
        marginTop: 10,
        marginBottom:10
    },
    demandeContainer: {
        flex:1,
        margin:10
    },
    precedentContainer: {
        marginLeft:5,
    },
    suivantContainer: {
        marginRight:5,
    },
    etatListeContainer: {
        alignSelf:'center',
    },
    containerListe : {
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 10,
        justifyContent:"space-between",
    },
    chevron : {
        width: 45,
        height: 45
    },
    aucuneDemandeContainer: {
        marginTop:50,
        marginLeft:'auto',
        marginRight:'auto'
    },
    aucuneDemandeLibelle: {
        fontSize:18,
        color:'#460000'
    },
    imageContainer: {
        marginBottom:20,
        alignSelf:'center'
    },
    image: {
        width:250,
        height:250
    },
    formulaireInputContainer: {
        padding:5,
        backgroundColor: 'white',
        borderRadius: 20,
        marginBottom:20
    },
    libelle: {
        fontSize:18
    },
    typeDemandeContainer: {
        alignSelf:'center',
        marginBottom:20
    },
    typeDemande: {
        fontWeight:"bold",
        fontSize:24
    },
    infosContainer: {
        marginBottom: 20
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent:'center',
        marginBottom:10
    },
    actionContainer: {
        marginLeft:5,
        marginRight:5,
        minWidth: 100
    }
});