import { useEffect, useState } from "react";
import {containerStyle} from "../../../commons/styles/commons.styles";
import ClassementList from "../component/classement-list.component";
import {loadClassement} from "../services/classement.service";
import {Image, ImageBackground, StyleSheet, View} from "react-native";
import LoadingGeneral from "../../../commons/component/loading-general.component";
import { JOUEUR, getValueFor } from "../../../utils/store.utils";
import ClassementPlayer from "../component/classement-player.component";

export default function ClassementContainer({ navigation }) {

    const [classementInformations, setClassementInformations] = useState(null);
    const [classementPlayerInformations, setClassementPlayerInformations] = useState(null);
    const [recherche, setRecherche] = useState(null);
    const [loadingClassement, setLoadingClassement] = useState(false);

    let playerIdClassement = 0

    getValueFor(JOUEUR).then(joueur => playerIdClassement = joueur.id);

    const init = () => {

        setLoadingClassement(true);
        loadClassement()
            .then(classementInformations => { setClassementInformations(classementInformations.data); setClassementPlayerInformations(classementInformations.data) })
            .catch(err => console.log(err))
            .finally(() => setLoadingClassement(false))
    }

    const playerClassement = () => {
        if(classementPlayerInformations !== null) {
            return classementPlayerInformations.classement?.filter(classement => classement.joueurId == 2);
        }
        
    }

    const filterClassement = (recherche) => {
        if(!recherche) {
            return classementInformations;
        }
        console.log(classementInformations)
        return classementInformations?.filter(classement => classement.joueurNom.toLowerCase().includes(recherche.toLowerCase()));
    }

    const handleGoListeUser = async (joueurId) => {
        navigation.navigate("profil", {
            userId: joueurId
        })
    }

    useEffect(init, []);

    return (
        <ImageBackground
                source={require('../../../../assets/auth_background.jpg')}
                style={ containerStyle.backgroundHover100 }>
                {
                    loadingClassement ? <LoadingGeneral titre={"Chargement en cours ..."}></LoadingGeneral>
                        :
                        <>
                        <View style={ style.playerContainer } key={1}>
                                {
                                    playerClassement()? <ClassementPlayer handleGoListeUser={ handleGoListeUser } classement={playerClassement()}/> : null
                                }
                            </View>
                            <View style={ style.zonesContainer } key={2}>
                                {
                                    filterClassement(recherche) ? <ClassementList handleGoListeUser={ handleGoListeUser } classement={filterClassement(recherche)}/> : null
                                }
                            </View>
                        </>
                }
            </ImageBackground>
        
    )
}

const style = StyleSheet.create({
    backContainer: {
        flex:1,
        marginLeft: 10,
    },
    back: {
        width: 50,
        height: 50
    },
    zonesContainer: {
        margin: 10,
        flex: 15
    },
    playerContainer: {
        margin: 10,
        flex: 2
    },
    zones: {
        padding: 10,
        height: '100%'
    }
});