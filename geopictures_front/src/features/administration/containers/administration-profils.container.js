import {Image, ImageBackground, StyleSheet, TouchableOpacity, View} from "react-native";
import LoadingGeneral from "../../../commons/component/loading-general.component";
import {useEffect, useState} from "react";
import {commonsStyle, containerStyle, font} from "../../../commons/styles/commons.styles";
import AdministrationProfil from "../components/administration-profils.component";
import {Button} from "@rneui/base";
import * as React from "react";
import {loadJoueurs, suppressionUtilisateur, suspensionUtilisateur} from "../services/administration.services";
import Toast from "react-native-root-toast";
import {modalfy} from "react-native-modalfy";
import AdministrationDetailsProfil from "../components/administration-details-profil.component";

export default function AdministrationProfilsContainer({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [joueurs, setJoueurs] = useState(null);
    const {currentModal,openModal,closeModal,closeModals,closeAllModals} = modalfy();
    const [profilSelected, setProfilSelected] = useState(null);
    const [raisonSuspension, setRaisonSuspension] = useState(null);

    const handleBack = () => {
        if(profilSelected) {
            setProfilSelected(null);
            load();
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'mes-demandes-container'}],
            });
        }

    }

    const handlePressLigne = (profil) => {
        setProfilSelected(profil);
    }

    const init = () => {
        load();
    }

    const load = () => {
        setLoading(true);
        loadJoueurs()
            .then(joueurs => setJoueurs(joueurs.data))
            .catch(err => Toast.show("Une erreur est survenu, veuillez contacter le support"))
            .finally(() => setLoading(false));
    }

    const handleValidSuspension = (profil, actif) => {
        const title = "Suspension du compte";
        const action = profil.actif ? "suspendre" : "activer";
        const description = `Etes vous sur de vouloir ${action} le compte du joueur ${profil.nom} ?`;

        openModal("ModalChoixValid", {title: title, description: description, callback: () => handleSuspensionUtilisateur(profil, actif)});
    }

    const handleValidSuppression = (profil) => {
        const title = "Suppression du compte";
        const description = `Etes vous sur de vouloir supprimer le compte du joueur ${profil.nom} ?`;

        openModal("ModalChoixValid", {title: title, description: description, callback: () => handleSuppressionUtilisateur(profil)});
    }

    const handleSuppressionUtilisateur = (profil) => {
        setLoading(true);

        suppressionUtilisateur(profil.utilisateurId)
            .then(_ => {
                setProfilSelected(null);
                setRaisonSuspension(null);
                Toast.show("Suppression effectué avec succès")
                handleBack();
            })
            .catch(err => Toast.show("Une erreur est survenu, veuillez contacter le support"))
            .finally(() => setLoading(false))
    }

    const handleSuspensionUtilisateur = (profil, actif) => {

        const suspensionRequest = {
            utilisateurId: profil.utilisateurId,
            actif: actif,
            raisonSuspension: raisonSuspension
        }

        setLoading(true);

        suspensionUtilisateur(suspensionRequest)
            .then(profil => {
                setProfilSelected(profil.data);
                setRaisonSuspension(null);
            })
            .catch(err => Toast.show("Une erreur est survenu, veuillez contacter le support"))
            .finally(() => setLoading(false))
    }

    useEffect(init, []);

    return(
        <ImageBackground
            source={require('../../../../assets/auth_background.jpg')}
            style={ containerStyle.backgroundHover100 }>
            { loading && <LoadingGeneral titre={"Chargement en cours"}/> }

            <View style={ style.backContainer }>
                <TouchableOpacity onPress={ handleBack }>
                    <Image style={ style.back } source={require('../../../../assets/back.png')}></Image>
                </TouchableOpacity>

                <Button
                    onPress={() => navigation.navigate("administration-demandes-container")}
                    title={"Demandes"}
                    raised={true}
                    radius={20}
                    containerStyle={ style.containerBoutonDemandes }
                    titleStyle={ font(15, 'bold') }
                    buttonStyle={ commonsStyle.boutonSuccess }/>
            </View>

            <View style={style.containerBody}>
                {
                    profilSelected ?
                        <AdministrationDetailsProfil profil={profilSelected}
                                                     handleValidSuppression={handleValidSuppression}
                                                     handleValidSuspension={handleValidSuspension}
                                                     setRaisonSuspension={setRaisonSuspension}
                                                     raisonSuspension={raisonSuspension}>
                        </AdministrationDetailsProfil>
                        :
                        <AdministrationProfil joueurs={joueurs}
                                              handlePressLigne={handlePressLigne}>
                        </AdministrationProfil>
                }
            </View >
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    containerBody: {
        marginTop:5,
        marginRight:10,
        marginLeft:10,
        marginBottom:10,
        flex:1
    },
    back: {
        width: 50,
        height: 50
    },
    backContainer: {
        marginLeft: 10,
        flexDirection: "row",
        alignItems:'center',
        marginTop:5,
        marginBottom:5,
        justifyContent: "space-between"
    },
    containerBoutonDemandes: {
        marginRight: 10
    }
});