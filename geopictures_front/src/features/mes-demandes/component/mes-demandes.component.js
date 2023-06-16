import {ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {BACKGROUND_ASSETS} from "../../../utils/store.utils";
import * as React from "react";
import {Text} from "@rneui/base";
import {EtatDemande, getEtatDemandeLibelle} from "../enums/etat-demande.enum";
import {getTypeDemandeLibelle} from "../enums/type-demande.enum";
import Picker from "@ouroboros/react-native-picker";
import {PHOTO, ZONE, TOUS} from "../../../commons/consts/filtre-type.const";

export default function MesDemandes({ demandes, openModal, handleSelectedTypes, selectedTypes, selectedEtat, handleSelectedEtat, handleAnnulationDemande }) {

    function getDate(date) {
        const event = new Date(date);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return event.toLocaleDateString('fr-FR', options);
    }

    function getLibelle(libelle) {
        return libelle.length > 5 ? libelle.slice(0, 5) + "..." : libelle;
    }

    function getStyleLigne(etatDemande) {
        switch (etatDemande) {
            case EtatDemande.EN_ATTENTE: return {...style.ligneDemande, color: 'darkblue'};
            case EtatDemande.ACCEPTE: return {...style.ligneDemande, color: 'darkgreen'};
            case EtatDemande.REFUSE: return {...style.ligneDemande, color: 'darkred'};
            case EtatDemande.ANNULE: return {...style.ligneDemande, color: 'grey'};
        }
    }

    const handleOpenModal = (demande) => {
        openModal('ModalInfosDemande', {demande: demande, callback: () => handleAnnulationDemande(demande)});
    }

    return(
        <ImageBackground
            source={ BACKGROUND_ASSETS.bordure } style={{ padding:5 }} borderRadius={20}>
            <ImageBackground source={ BACKGROUND_ASSETS.background } borderRadius={20}>
                <View style={style.containerMesDemandes}>
                    <Text style={style.titre}>Mes demandes</Text>

                    <View style={ style.pickersContainer}>
                        <View  style={ style.pickerTypeContainer}>
                            <Picker
                                onChanged={handleSelectedTypes}
                                options={[
                                    {text: "Tous", value: TOUS},
                                    {text: "Photo", value: PHOTO},
                                    {text: "Zone", value: ZONE},
                                ]}
                                style={{padding: 5}}
                                value={selectedTypes}
                            />
                        </View>

                        <View style={ style.pickerEtatContainer}>
                            <Picker
                                onChanged={handleSelectedEtat}
                                options={[
                                    {text: getEtatDemandeLibelle(EtatDemande.TOUS), value: EtatDemande.TOUS},
                                    {text: getEtatDemandeLibelle(EtatDemande.EN_ATTENTE), value: EtatDemande.EN_ATTENTE},
                                    {text: getEtatDemandeLibelle(EtatDemande.ACCEPTE), value: EtatDemande.ACCEPTE},
                                    {text: getEtatDemandeLibelle(EtatDemande.REFUSE), value: EtatDemande.REFUSE},
                                    {text: getEtatDemandeLibelle(EtatDemande.ANNULE), value: EtatDemande.ANNULE},
                                ]}
                                style={{padding: 5}}
                                value={selectedEtat}
                            />
                        </View>
                    </View>

                    <View style={style.titreDemandeContainer}>
                        <Text style={style.titreDemande}>Date</Text>
                        <Text style={style.titreDemande}>Type</Text>
                        <Text style={style.titreDemande}>Libelle</Text>
                        <Text style={style.titreDemande}>Etat</Text>
                    </View>
                    <ScrollView style={style.listeDemandesContainer} showsVerticalScrollIndicator={false}>
                        {
                            demandes && demandes.length > 0 ?
                            demandes.map((demande, index) => {
                                return(
                                    <TouchableOpacity key={index} style={style.demandeContainer} onPress={() => handleOpenModal(demande)}>
                                        <Text style={getStyleLigne(demande.etatDemande)}>{getDate(demande.dateDemande)}</Text>
                                        <Text style={getStyleLigne(demande.etatDemande)}>{getTypeDemandeLibelle(demande.typeDemande)}</Text>
                                        <Text style={getStyleLigne(demande.etatDemande)}>{getLibelle(demande.libelle)}</Text>
                                        <Text style={getStyleLigne(demande.etatDemande)}>{getEtatDemandeLibelle(demande.etatDemande)}</Text>
                                    </TouchableOpacity>
                                )
                            }) : <View style={style.aucuneDemandeContainer}><Text style={style.aucuneDemandeLibelle}>Aucune demandes en cours</Text></View>
                        }
                    </ScrollView>
                </View>
            </ImageBackground>
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    containerMesDemandes: {
       height: '100%'
    },
    titre: {
        fontWeight:'bold',
        fontSize:24,
        marginLeft:'auto',
        marginRight:'auto',
        marginTop: 10,
        marginBottom:10
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
    listeDemandesContainer: {
        margin: 10
    },
    titreDemandeContainer: {
        flexDirection: 'row',
        margin:10,

    },
    demandeContainer: {
        flexDirection: 'row',
        marginBottom: 15,
        paddingTop:20,
        paddingBottom:20,
        borderRadius:5,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    ligneDemande: {
        flex:1,
        textAlign:'center',
        fontSize:16,
    },
    titreDemande: {
        flex:1,
        textAlign:'center',
        fontWeight:'bold',
    },
    pickersContainer: {
        flexDirection:'row',

    },
    pickerTypeContainer: {
        flex:1,
        backgroundColor: 'white',
        borderRadius: 20,
        marginTop:10,
        marginBottom:10,
        marginLeft:10,
        marginRight:5,
    },
    pickerEtatContainer: {
        flex:1,
        backgroundColor: 'white',
        borderRadius: 20,
        marginLeft:5,
        marginRight:10,
        marginTop:10,
        marginBottom:10,
    },
});