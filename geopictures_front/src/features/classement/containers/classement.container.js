import { useEffect, useState } from "react";
import { containerStyle } from "../../../commons/styles/commons.styles";
import ClassementList from "../component/classement-list.component";
import { loadClassement, getAllRegion, getClassementByCodeRegion } from "../services/classement.service";
import { ImageBackground, StyleSheet, View } from "react-native";
import LoadingGeneral from "../../../commons/component/loading-general.component";
import { JOUEUR, getValueFor } from "../../../utils/store.utils";
import ClassementPlayer from "../component/classement-player.component";
import ClassementFiltre from "../component/classement-filtre.component";

export default function ClassementContainer({ navigation }) {

    const [classementInformations, setClassementInformations] = useState(null);
    const [classementPlayerInformations, setClassementPlayerInformations] = useState(null);
    const [recherche, setRecherche] = useState(null);
    const [loadingClassement, setLoadingClassement] = useState(false);
    const [userActifId, setUserActifId] = useState(null);
    const [regionsInformation, setRegionsInformation] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState("PACA");


    const init = () => {

        getValueFor(JOUEUR).then(userId => setUserActifId(userId.id))

        getAllRegion()
            .then(regionInformation => setRegionsInformation(regionInformation.data))
            .catch(err => console.log(err))
            .finally(() => setLoadingClassement(false));

        setLoadingClassement(true);
        loadClassement()
            .then(classementInformations => {
                setClassementInformations(classementInformations.data);
                setClassementPlayerInformations(classementInformations.data)
            })
            .catch(err => console.log(err))
            .finally(() => setLoadingClassement(false));
    }

    const playerClassement = () => {
        if (classementPlayerInformations !== null) {
            const index = classementPlayerInformations.classement.findIndex(x => x.joueurId === userActifId)
            classementInformations.classement[index].index = index
            return classementPlayerInformations.classement?.filter(classement => classement.joueurId === userActifId);
        }
    }

    const regionFiltered = () => {
        if (regionsInformation !== null) {
            return regionsInformation;
        }
    }

    const filterClassement = (recherche) => {
        if (!recherche) {
            return classementInformations;
        }

        if(selectedRegion === "TOUTES") {
            return classementInformations
        }
        else {
            getClassementByCodeRegion(selectedRegion)
            .then(newClassement => {setClassementInformations(newClassement)})
            .catch(err => console.log(err))
            .finally(() => setLoadingClassement(false));

            return classementInformations
        }
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
            style={containerStyle.backgroundHover100}>
            {
                loadingClassement ? <LoadingGeneral titre={"Chargement en cours ..."}></LoadingGeneral>
                    :
                    <>
                        <View style={style.pickers}>
                            {
                                regionFiltered() ? <ClassementFiltre regionsInformation={regionFiltered()} setSelectedRegion={setSelectedRegion} selectedRegion={selectedRegion}></ClassementFiltre> : null
                            }
                        </View>
                        <View style={style.playerContainer} key={1}>
                            {
                                playerClassement() ? <ClassementPlayer handleGoListeUser={handleGoListeUser} classement={playerClassement()} /> : null
                            }
                        </View>
                        <View style={style.zonesContainer} key={2}>
                            {
                                filterClassement(recherche) ? <ClassementList handleGoListeUser={handleGoListeUser} classement={filterClassement(recherche)} /> : null
                            }
                        </View>
                    </>
            }
        </ImageBackground>

    )
}

const style = StyleSheet.create({
    backContainer: {
        flex: 1,
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
    },
    pickers: {
        flex: 1,
        flexDirection: "row",
        marginLeft: 10,
        marginRight: 10
    },
});