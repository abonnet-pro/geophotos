import {commonsStyle, containerStyle, font} from "../../../commons/styles/commons.styles";
import * as React from "react";
import {ImageBackground, StyleSheet, View} from "react-native";
import {Button, Text} from "@rneui/base";
import {useEffect, useState} from "react";
import {annulationDemande, loadDemandes} from "../services/mes-demandes.service";
import MesDemandes from "../component/mes-demandes.component";
import LoadingGeneral from "../../../commons/component/loading-general.component";
import {modalfy} from "react-native-modalfy";
import {TOUS} from "../../../commons/consts/filtre-type.const";
import {EtatDemande} from "../enums/etat-demande.enum";
import Toast from "react-native-root-toast";
import {getValueFor, JOUEUR} from "../../../utils/store.utils";
import {handleError} from "../../../utils/http.utils";


export default function MesDemandesContainer({ navigation }) {

    const [demandes, setDemandes] = useState(null);
    const [loadingDemandes, setLoadingDemandes] = useState(false);
    const {currentModal,openModal,closeModal,closeModals,closeAllModals} = modalfy();
    const [selectedTypes, setSelectedTypes] = useState(TOUS);
    const [selectedEtat, setSelectedEtat] = useState(EtatDemande.TOUS);
    const [isAdmin, setAdmin] = useState(false);

    const init = () => {
        load();
        getValueFor(JOUEUR).then(joueur => setAdmin(joueur.isAdmin));
    }

    const load = () => {
        setLoadingDemandes(true);
        loadDemandes()
            .then(demandes => setDemandes(demandes.data.mesDemandes))
            .catch(err => {
                handleError(err, navigation);
                Toast.show(err.response.data);
            })
            .finally(() => setLoadingDemandes(false))
    }

    const handleSelectedTypes = (typeSelected) => {
        setSelectedTypes(typeSelected);
    }

    const handleSelectedEtat = (etatSelected) => {
        setSelectedEtat(etatSelected);
    }

    function getDemandesFiltered() {
        if(selectedTypes === TOUS && selectedEtat === EtatDemande.TOUS) {
            return demandes;
        }

        const demandesFiltered = demandes.filter(demande => {
            if(selectedTypes === TOUS) {
                return true;
            }

            return selectedTypes === demande.typeDemande;
        });

        return demandesFiltered.filter(demande => {
            if(selectedEtat === EtatDemande.TOUS) {
                return true;
            }

            return selectedEtat === demande.etatDemande;
        });
    }

    const handleAnnulationDemande = (demande) => {
        setLoadingDemandes(true);
        annulationDemande(demande)
            .then(res => load())
            .catch(err => {
                handleError(err, navigation);
                Toast.show(err.response.data);
            })
            .finally(() => setLoadingDemandes(false))
    }

    useEffect(init, []);

    return(
        <ImageBackground
            source={require('../../../../assets/auth_background.jpg')}
            style={ containerStyle.backgroundHover100 }>
            { loadingDemandes && <LoadingGeneral titre={"Chargement en cours"}/> }
            <View style={{...style.boutonsHeaderContainer, justifyContent:`${isAdmin ? "space-between" : "flex-end"}`}}>
                {
                    isAdmin && <Button
                        onPress={() => navigation.navigate("administration-demandes-container")}
                        title="Administration"
                        raised={true}
                        radius={20}
                        titleStyle={ font(15, 'bold') }
                        buttonStyle={ commonsStyle.boutonDanger }/>
                }

                <Button
                    onPress={() => navigation.navigate("collaboration-container")}
                    title="Nouvelle demande"
                    raised={true}
                    radius={20}
                    titleStyle={ font(15, 'bold') }
                    buttonStyle={ commonsStyle.boutonSuccess }/>
            </View>

            <View style={style.containerMesDemandes}>
                <MesDemandes demandes={ getDemandesFiltered() }
                             openModal={openModal}
                             handleSelectedTypes={handleSelectedTypes}
                             handleSelectedEtat={handleSelectedEtat}
                             selectedTypes={selectedTypes}
                             selectedEtat={selectedEtat}
                             handleAnnulationDemande={handleAnnulationDemande}>
                </MesDemandes>
            </View >
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    containerMesDemandes: {
        marginTop:5,
        marginRight:10,
        marginLeft:10,
        marginBottom:10,
        flex:1
    },
    boutonsHeaderContainer: {
        flexDirection: "row",
        marginTop:10,
        marginRight:10,
        marginLeft:10,
        marginBottom:5,
    },
});