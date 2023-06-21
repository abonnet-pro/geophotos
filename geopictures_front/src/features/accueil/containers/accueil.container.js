import {useEffect, useState} from "react";
import Accueil from "../components/accueil.component";
import {loadAccueil} from "../services/accueil.service";
import {BackHandler} from "react-native";
import Toast from "react-native-root-toast";
import {getValueFor, JOUEUR, resetStore, save, TOKEN_GOOGLE, USER_GOOGLE} from "../../../utils/store.utils";
import {modalfy} from "react-native-modalfy";
import * as Google from "expo-auth-session/providers/google";
import {
    checkUtilisateurGoogle, getUserData,
    synchorniseUtilisateurGoogle
} from "../../authentification/services/authentification.service";
import {handleError} from "../../../utils/http.utils";

export default function AccueilContainer({ navigation }) {

    const [joueurInformations, setJoueurInformations] = useState(null);
    const [loadingAccueil, setLoadingAccuil] = useState(false);
    const [userGoogle, setUserGoogle] = useState(null);
    const {currentModal,openModal,closeModal,closeModals,closeAllModals} = modalfy();

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: "549351708019-q9d71fkan3u185bfsg1b3j2svg9ccpob.apps.googleusercontent.com",
        iosClientId: "549351708019-ggoc5m3p20e8begl25tl1a87v7c1v3uo.apps.googleusercontent.com",
        androidClientId: "549351708019-hhbd8evh0vbj1os4577p2e9jguruotil.apps.googleusercontent.com"
    });

    const init = () => {
        BackHandler.addEventListener("hardwareBackPress", () => true);

        setLoadingAccuil(true);

        getValueFor(USER_GOOGLE).then(userGoogle => {
            setUserGoogle(userGoogle)
        });

        loadAccueil()
            .then(joueurInformations => setJoueurInformations(joueurInformations.data))
            .catch(err => {
                handleError(err, navigation);
                Toast.show("Une erreur est survenu, veuillez contacter le support");
            })
            .finally(() => setLoadingAccuil(false))
    }

    const handleSynchronisationGoogle = () => {
        const title = "Synchroniser votre compte Google";
        const description = "Voulez-vous synchronisez vos données actuelle avec votre identifiant Google ? Vous pourrez retrouver vos données sur un autre appareil";

        openModal("ModalChoixValid", {title: title, description: description, callback: () => synchronisationGoogle()});
    }

    const synchronisationGoogle = async () => {
        closeModal("ModalChoixValid");

        const result = await promptAsync({showInRecents: true});

        if (result?.type === 'success') {
            setLoadingAccuil(true);
            const userGoogle = await getUserData(result.authentication.accessToken);

            const checkGoogleUtilisateurRequest = {
                email: userGoogle.email,
                id: userGoogle.id
            }

            const utilisateur = await checkUtilisateurGoogle(checkGoogleUtilisateurRequest);

            if(utilisateur.data) {
                await handleSynchronisationGoogleUtilisateurExistant(userGoogle, utilisateur.data, result.authentication.accessToken)
            } else {
                await handleSynchronisationGoogleUtilisateurInexistant(userGoogle, checkGoogleUtilisateurRequest, result.authentication.accessToken)
            }
        }
    }

    const handleSynchronisationGoogleUtilisateurInexistant = async (userGoogle, checkGoogleUtilisateurRequest, accessToken) => {

        const userGoogleExisting = await getValueFor(USER_GOOGLE);

        if(userGoogleExisting) {
            const title = "Synchroniser votre compte Google";
            const description = "Aucun compte Geopictures n'a été trouvé sur cet identifiant Google, voulez-vous créer un nouveau compte lié à cet identifiant ?";

            openModal("ModalChoixValid", {title: title, description: description, callback: () => handleCreateNouveauCompteGoogle(userGoogle, accessToken)});
        } else {
            synchorniseUtilisateurGoogle(checkGoogleUtilisateurRequest)
                .then(_ => {
                    save(TOKEN_GOOGLE, accessToken);
                    save(USER_GOOGLE, userGoogle);
                    setUserGoogle(userGoogle);
                })
                .catch(err => {
                    handleError(err, navigation);
                    Toast.show("Une erreur est survenu, veuillez contacter le support")
                })
                .finally(() => setLoadingAccuil(false));
        }
    }

    const handleCreateNouveauCompteGoogle = (userGoogle, accessToken) => {
        navigation.navigate("creation", {userGoogle: userGoogle, accessToken: accessToken});
    }

    const handleSynchronisationGoogleUtilisateurExistant = async (userGoogle, utilisateur, accessToken) => {
        setLoadingAccuil(false);

        const title = "Synchroniser votre compte Google";
        const description = "Une compte geopictures est déja existant avec cet identifiant google, voulez vous bacsuler sur ce compte ? Attention si votre compte actuelle n'est pas synchronisé avec Google vous perdrez toutes les données existantes.";

        openModal("ModalChoixValid", {title: title, description: description, callback: () => synchronisationGoogleUtilisateurExistant(userGoogle, utilisateur, accessToken)});
    }

    const synchronisationGoogleUtilisateurExistant = async (userGoogle, utilisateur, accessToken) => {
        await resetStore();
        await save(JOUEUR, {id: utilisateur.id, token: utilisateur.token, isAdmin: utilisateur.admin});
        await save(TOKEN_GOOGLE, accessToken);
        await save(USER_GOOGLE, userGoogle);
        setUserGoogle(userGoogle);

        setLoadingAccuil(true);

        loadAccueil()
            .then(joueurInformations => setJoueurInformations(joueurInformations.data))
            .catch(err => {
                handleError(err, navigation);
                Toast.show("Une erreur est survenu, veuillez contacter le support")
            })
            .finally(() => setLoadingAccuil(false))
    }

    useEffect(init, []);

    return(
        <>
            <Accueil joueurInformations={ joueurInformations }
                     navigation={ navigation }
                     loadingAccueil={ loadingAccueil }
                     userGoogle={userGoogle}
                     handleSynchronisationGoogle={handleSynchronisationGoogle}>
            </Accueil>
        </>
    )
}