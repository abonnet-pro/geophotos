import {commonsStyle, containerStyle, font} from "../../../commons/styles/commons.styles";
import LoadingGeneral from "../../../commons/component/loading-general.component";
import * as React from "react";
import {Image, ImageBackground, StyleSheet, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {BACKGROUND_ASSETS, getValueFor, JOUEUR} from "../../../utils/store.utils";
import AdministrationDemandesAttentes from "../components/administration-demandes-attentes.component";
import Toast from "react-native-root-toast";
import {loadDemandesEnAttentes, updateDemande} from "../services/administration.services";

export default function AdministrationDemandesContainer({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [demandesEnAttentes, setDemandesEnAttentes] = useState(null);

    const init = () => {
        getValueFor(JOUEUR).then(joueur => {
            if(!joueur.isAdmin) {
                navigation.navigate("accueil-stack");
            } else {
                load();
            }
        });
    }

    const load = () => {
        setLoading(true);
        loadDemandesEnAttentes()
            .then(demandes => {
                setDemandesEnAttentes(demandes.data);
            })
            .catch(err => Toast.show("Une erreur est survenu, veuillez contacter le support"))
            .finally(() => setLoading(false));
    }

    const handlePressImage = (image) => {
        navigation.navigate("imageZoom", {
            image: image
        });
    }

    const handleRefuseDemande = (demande, commentaire) => {
        const updateRequest = {
            commentaire: commentaire,
            typeDemande: demande.typeDemande,
            accept: false,
            demandeId: demande.id
        }

        setLoading(true);
        updateDemande(demande, updateRequest)
            .then(_ => {
                Toast.show("Demande refusée");
                load()
            })
            .catch(err => Toast.show("Une erreur est survenu, veuillez contacter le support"))
            .finally(() => setLoading(false));
    }

    const handleAcceptDemande = (demande, commentaire) => {
        const updateRequest = {
            commentaire: commentaire,
            accept: true,
            typeDemande: demande.typeDemande,
            demandeId: demande.id
        }

        setLoading(true);
        updateDemande(demande, updateRequest)
            .then(_ => {
                Toast.show("Demande acceptée");
                load();
            })
            .catch(err => Toast.show("Une erreur est survenu, veuillez contacter le support"))
            .finally(() => setLoading(false));
    }

    const goBack = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'mes-demandes-container' }],
        });
    }

    useEffect(init, []);

    return(
        <ImageBackground
            source={require('../../../../assets/auth_background.jpg')}
            style={ containerStyle.backgroundHover100 }>
            { loading && <LoadingGeneral titre={"Chargement en cours"}/> }

            <View style={ style.backContainer }>
                <TouchableOpacity onPress={ () => goBack() }>
                    <Image style={ style.back } source={require('../../../../assets/back.png')}></Image>
                </TouchableOpacity>
            </View>

            <View style={style.containerBody}>
                <AdministrationDemandesAttentes demandesEnAttentes={demandesEnAttentes}
                                                handlePressImage={handlePressImage}
                                                handleRefuseDemande={handleRefuseDemande}
                                                handleAcceptDemande={handleAcceptDemande}>
                </AdministrationDemandesAttentes>
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
        marginBottom:5
    }
});