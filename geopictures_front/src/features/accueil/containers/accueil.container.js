import {useEffect, useState} from "react";
import Accueil from "../components/accueil.component";
import {loadAccueil} from "../services/accueil.service";
import {BackHandler} from "react-native";

export default function AccueilContainer({ navigation }) {

    const [joueurInformations, setJoueurInformations] = useState(null);
    const [loadingAccueil, setLoadingAccuil] = useState(false);

    const init = () => {
        BackHandler.addEventListener("hardwareBackPress", () => true);

        setLoadingAccuil(true);
        loadAccueil()
            .then(joueurInformations => setJoueurInformations(joueurInformations.data))
            .catch(err => console.log(err))
            .finally(() => setLoadingAccuil(false))
    }
    useEffect(init, []);

    return(
        <>
            <Accueil joueurInformations={ joueurInformations }
                     navigation={ navigation }
                     loadingAccueil={ loadingAccueil }>
            </Accueil>
        </>
    )
}