import { useEffect, useState } from "react";
import { containerStyle } from "../../../commons/styles/commons.styles";
import ClassementList from "../component/classement-list.component";
import { loadClassement, getAllRegion, getClassementByCodeRegion } from "../services/classement.service";
import { ImageBackground, StyleSheet, View } from "react-native";
import LoadingGeneral from "../../../commons/component/loading-general.component";
import { JOUEUR, getValueFor } from "../../../utils/store.utils";
import ClassementPlayer from "../component/classement-player.component";
import ClassementFiltre from "../component/classement-filtre.component";
import { modalfy } from 'react-native-modalfy'

export default function ClassementContainer({ navigation }) {

    const {currentModal,openModal,closeModal,closeModals,closeAllModals} = modalfy();
    const [classementInformations, setClassementInformations] = useState(null);
    const [loadingClassement, setLoadingClassement] = useState(false);
    const [userActifId, setUserActifId] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState("TOUTES");
    const [classementPlayer, setClassementPlayer] = useState(null);

    const init = () => {
        getValueFor(JOUEUR).then(userId => {
            setUserActifId(userId.id);
            load(userId.id);
        })
    }

    const load = (userId) => {
        setLoadingClassement(true);
        loadClassement()
            .then(classementInformations => {
                setClassementInformations(classementInformations.data);
                getPlayerClassement(classementInformations.data, userId);
            })
            .catch(err => console.log(err))
            .finally(() => setLoadingClassement(false));
    }

    const getPlayerClassement = (classementInformations, userId) => {
            const index = classementInformations.classement.findIndex(x => x.utilisateurId === userId)
            if(index !== -1) {
                classementInformations.classement[index].index = index;
                setClassementPlayer(classementInformations.classement[index]);
            } else {
                setClassementPlayer(null);
            }
    }

    const handleGoListeUser = async (utilisateurId) => {
        openModal('ModalCarteVisiteClassement', {utilisateurId: utilisateurId})
    }

    const handleRegionSelected = (regionSelected) => {
        setSelectedRegion(regionSelected);

        if(regionSelected === "TOUTES") {
            load();
            return;
        }

        setLoadingClassement(true);
        getClassementByCodeRegion(regionSelected)
            .then(classementInformations => {
                setClassementInformations(classementInformations.data);
                getPlayerClassement(classementInformations.data, userActifId);
            })
            .catch(err => console.log(err))
            .finally(() => setLoadingClassement(false));
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
                            <ClassementFiltre handleRegionSelected={handleRegionSelected} selectedRegion={selectedRegion}></ClassementFiltre>
                        </View>
                        <View style={style.playerContainer} key={1}>
                            <ClassementPlayer handleGoListeUser={handleGoListeUser} classement={classementPlayer}/>
                        </View>
                        <View style={style.zonesContainer} key={2}>
                            <ClassementList handleGoListeUser={handleGoListeUser} classement={classementInformations} />
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
        marginRight: 10,
        marginTop: 10
    },
});