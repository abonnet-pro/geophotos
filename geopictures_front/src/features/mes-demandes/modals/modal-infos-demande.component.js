import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, View} from "react-native";
import {Button} from "@rneui/themed";
import {EtatDemande} from "../enums/etat-demande.enum";
import {TypeDemande} from "../enums/type-demande.enum";
import LoadingView from "../../../commons/component/loading.component";
import {URL_API} from "../../../utils/url.utils";
import {Image} from "@rneui/themed";

const ModalInfosDemande = ({ modal: { closeModal, getParam }}) => {

    const [demande, setDemande] = useState(null);

    const init = () => {
        const demande = getParam("demande");
        setDemande(demande);
    }

    function getSource() {
        return demande?.typeDemande === TypeDemande.ZONE ? require('../../../../assets/demande-zone.png') : require('../../../../assets/demande-photo.png');
    }

    function getEtatDemandeSource() {
        switch (demande?.etatDemande) {
            case EtatDemande.EN_ATTENTE: return require('../../../../assets/attente_validation.png');
            case EtatDemande.ACCEPTE: return require('../../../../assets/valid.png');
            case EtatDemande.REFUSE: return require('../../../../assets/wrong.png');
            case EtatDemande.ANNULE: return require('../../../../assets/demande-annule.png');
        }
    }

    function getLibelleEtatDemande() {
        switch (demande?.etatDemande) {
            case EtatDemande.EN_ATTENTE: return "En attente de validation";
            case EtatDemande.ACCEPTE: return "Demande acceptée";
            case EtatDemande.REFUSE: return "Demande refusée";
            case EtatDemande.ANNULE: return "Vous avez annulé la demande";
        }
    }

    useEffect(init, []);

    return(
        <View style={style.modalContainer}>
            <View style={style.titleContainer}>
                <Text style={style.title}>Votre demande</Text>
            </View>
            <View style={style.descriptionContainer}>
                <Text style={style.dateDemande}>Envoyé le : {new Date(demande?.dateDemande).toLocaleDateString('fr')}</Text>
                <View style={style.typeLibelleContainer}>
                    <Image style={ style.image } source={getSource()}/>
                    <Text style={style.libelle}>{demande?.libelle}</Text>
                </View>
                {
                    demande?.image ?
                        <View style={style.photoContainer}>
                            <Image style={ style.photo }
                                   borderRadius={10}
                                   PlaceholderContent={ <LoadingView/>}
                                   source={{ uri: `${URL_API}/photos/${demande?.image}` }}
                            />
                        </View>
                        :
                        <></>
                }
            </View>
            <View style={style.etatDemandeContainer}>
                <Image style={style.image} source={getEtatDemandeSource()}></Image>
                <Text style={style.libelle}>{getLibelleEtatDemande()}</Text>
            </View>
            {
                demande?.etatDemande === EtatDemande.REFUSE ?
                    <Text style={style.libelle}>Raison : "{demande?.commentaire}"</Text>
                    :
                    <></>
            }
            {
                demande?.etatDemande === EtatDemande.EN_ATTENTE ?
                    <View style={style.boutonContainer}>
                        <Button buttonStyle={style.boutonCancel} title={"Annuler la demande"} onPress={() => closeModal(undefined, getParam('callback'))}></Button>
                    </View>
                    :
                    <></>
            }

        </View>
    )
};

const style = StyleSheet.create({
    modalContainer: {
        backgroundColor: "#5f5f5f",
        padding: 20,
        borderRadius: 20,
        borderWidth:2,
        margin:10
    },
    titleContainer: {
        alignSelf:'center',
        margin:5
    },
    title: {
        fontWeight:'bold',
        color:'white',
        fontSize:20,
    },
    descriptionContainer: {
        margin:5
    },
    libelle: {
        color:'white',
        alignSelf:'center',
        margin:10
    },
    boutonContainer: {
        flexDirection:'row',
        alignSelf:'center',
        marginTop:10
    },
    boutonCancel: {
        borderRadius:10,
        margin:5,
        backgroundColor:'darkred'
    },
    image: {
        width:50,
        height:50
    },
    photo: {
        width:250,
        height:250
    },
    typeLibelleContainer: {
        flexDirection:'row'
    },
    etatDemandeContainer: {
        flexDirection:'row',
        marginTop:20,
        marginBottom:20,
        alignSelf:'center'
    },
    dateDemande: {
        color:'white',
        marginTop:10,
        marginBottom:10
    },
    photoContainer: {
        marginTop:20,
        alignSelf:'center'
    }
})

export default ModalInfosDemande;
