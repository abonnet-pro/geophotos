import {useEffect, useState} from "react";
import FormNouveauJoueur from "../components/form-nouveau-joueur.component";
import Accueil from "../components/accueil.component";
import {createJoueur, getAvatarsFree, loadAccueil} from "../services/accueil.service";
import {JOUEUR, save} from "../../../utils/store.utils";
import {BackHandler} from "react-native";

export default function AccueilContainer({ navigation, route }) {

    const [avatars, setAvatars] = useState([]);
    const [bordure, setBordure] = useState(null);
    const [background, setBackground] = useState(null);
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
        BackHandler.addEventListener("hardwareBackPress", () => true)
        setBordure(require('../../../../assets/bordure_wood.jpg'));
        setBackground(require('../../../../assets/background_wood.jpg'));

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
                                       avatars={ avatars }
                                       bordure={ bordure }
                                       background={ background }>
                    </FormNouveauJoueur>
                    :
                    <Accueil joueurInformations={ joueurInformations }
                             navigation={ navigation }>
                    </Accueil>
            }
        </>
    )
}