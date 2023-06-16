import FormNouveauJoueur from "../components/form-nouveau-joueur.component";
import {useEffect, useState} from "react";
import {JOUEUR, save} from "../../../utils/store.utils";
import {createJoueur, getAvatarsFree} from "../services/creation.service";
import Toast from "react-native-root-toast";

export default function CreationContainer({ navigation }) {

    const [responseAvailable, setResponseAvailable] = useState(null);
    const [loadingCreateJoueur, setLoadingCreateJoueur] = useState(false);
    const [avatars, setAvatars] = useState([]);

    const init = () => {
        getAvatarsFree(setAvatars)
            .then(res => setAvatars(res.data))
            .catch(err => Toast.show("Une erreur est survenu"))
    }

    const handleCreateJoueur = async (nom, avatar) => {
        const data = {
            nom: nom,
            avatarId: avatar.id
        }

        setLoadingCreateJoueur(true);

        const joueur = await createJoueur(data);

        if(!joueur.data) {
            return;
        }

        await save(JOUEUR, {id: joueur.data.id, token: joueur.data.token});
        setLoadingCreateJoueur(false);

        navigation.navigate('accueil');
    }

    useEffect(init, []);

    return(
        <>
            <FormNouveauJoueur setResponseAvailable={ setResponseAvailable }
                               loadingCreateJoueur={ loadingCreateJoueur }
                               responseAvailable={ responseAvailable }
                               handleCreateJoueur={ handleCreateJoueur }
                               avatars={ avatars }>
            </FormNouveauJoueur>
        </>
    )
}