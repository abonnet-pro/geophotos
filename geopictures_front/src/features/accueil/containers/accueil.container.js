import {useEffect, useState} from "react";
import FormNouveauJoueur from "../components/form-nouveau-joueur.component";
import Accueil from "../components/accueil.component";
import {createJoueur, getAvatarsFree, loadAccueil} from "../services/accueil.service";
import {JOUEUR, save} from "../../../utils/store.utils";
import {BackHandler} from "react-native";
import {StatusBar} from "expo-status-bar";

export default function AccueilContainer({ navigation, route }) {

    const [avatars, setAvatars] = useState([]);
    const [joueurInformations, setJoueurInformations] = useState(null);
    const [responseAvailable, setResponseAvailable] = useState(null);
    const [loadingCreateJoueur, setLoadingCreateJoueur] = useState(false);

    const handleCreateJoueur = async (nom, avatar) => {
        const data = {
            nom: nom,
            avatarId: avatar.id
        }

        setLoadingCreateJoueur(true);

        const joueur = await createJoueur(data);

        if(!joueur.data.id) {
            return;
        }

        await save(JOUEUR, {id: joueur.data.id, token: joueur.data.token});
        const informations = await loadAccueil(joueur.data.token);
        setJoueurInformations(informations.data);
        setLoadingCreateJoueur(false);
    }

    const init = () => {
        BackHandler.addEventListener("hardwareBackPress", () => true);

        const joueur = route.params.joueurInformations;
        setJoueurInformations(joueur);

        if(!joueur) {
            getAvatarsFree(setAvatars);
        }
    }

    useEffect(init, []);

    return(
        <>
            {
                !joueurInformations ?
                    <FormNouveauJoueur setResponseAvailable={ setResponseAvailable }
                                       loadingCreateJoueur={ loadingCreateJoueur }
                                       responseAvailable={ responseAvailable }
                                       handleCreateJoueur={ handleCreateJoueur }
                                       avatars={ avatars }>
                    </FormNouveauJoueur>
                    :
                    <Accueil joueurInformations={ joueurInformations }
                             navigation={ navigation }>
                    </Accueil>
            }
        </>
    )
}