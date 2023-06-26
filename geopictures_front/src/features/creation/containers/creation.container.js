import FormNouveauJoueur from "../components/form-nouveau-joueur.component";
import {useEffect, useState} from "react";
import {getValueFor, JOUEUR, resetStore, save, TOKEN_GOOGLE, USER_GOOGLE} from "../../../utils/store.utils";
import {createJoueur, getAvatarsFree} from "../services/creation.service";
import Toast from "react-native-root-toast";

export default function CreationContainer({ navigation, route }) {

    const [responseAvailable, setResponseAvailable] = useState(null);
    const [loadingCreateJoueur, setLoadingCreateJoueur] = useState(false);
    const [avatars, setAvatars] = useState([]);
    const [userGoogle, setUserGoogle] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    const init = () => {

        const userGoogle = route.params?.userGoogle;
        const accessToken = route.params?.accessToken;
        setUserGoogle(userGoogle);
        setAccessToken(accessToken);

        getAvatarsFree(setAvatars)
            .then(res => setAvatars(res.data))
            .catch(_ => Toast.show("Une erreur est survenu, veuillez contacter le support"))
    }

    const handleCreateJoueur = async (nom, avatar) => {

        const data = {
            nom: nom,
            avatarId: avatar.id,
            email: userGoogle?.email ? userGoogle?.email : null,
            googleId: userGoogle?.id ? userGoogle?.id : null
        }

        setLoadingCreateJoueur(true);

        const joueur = await createJoueur(data);

        if(!joueur.data) {
            return;
        }

        await resetStore();

        if(userGoogle) {
            await save(TOKEN_GOOGLE, accessToken);
            await save(USER_GOOGLE, userGoogle);
        }

        await save(JOUEUR, {id: joueur.data.id, token: joueur.data.token, isAdmin: joueur.data.admin});
        setLoadingCreateJoueur(false);

        navigation.reset({
            index: 0,
            routes: [{ name: 'accueil'}],
        });
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