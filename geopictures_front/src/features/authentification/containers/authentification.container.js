import Authentification from "../components/authentification.component";
import {useEffect, useState} from "react";
import {getValueFor, JOUEUR, save, TOKEN_GOOGLE, USER_GOOGLE} from "../../../utils/store.utils";
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import {checkUtilisateurGoogle, getUserData, getUserDataAndSave} from "../services/authentification.service";

WebBrowser.maybeCompleteAuthSession();

export default function AuthentificationContainer({ navigation }) {

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: "549351708019-q9d71fkan3u185bfsg1b3j2svg9ccpob.apps.googleusercontent.com",
        iosClientId: "549351708019-ggoc5m3p20e8begl25tl1a87v7c1v3uo.apps.googleusercontent.com",
        androidClientId: "549351708019-hhbd8evh0vbj1os4577p2e9jguruotil.apps.googleusercontent.com"
    });

    const handleConnexionGoogle = async () => {
        const result = await promptAsync({showInRecents: true});

        if (result?.type === 'success') {
            const userGoogle = await getUserData(result.authentication.accessToken);

            const checkGoogleUtilisateurRequest = {
                email: userGoogle.email,
                id: userGoogle.id
            }

            const utilisateur = await checkUtilisateurGoogle(checkGoogleUtilisateurRequest);
            if(utilisateur.data) {
                await save(TOKEN_GOOGLE, result.authentication.accessToken);
                await save(USER_GOOGLE, userGoogle);
                await save(JOUEUR, {id: utilisateur.data.id, token: utilisateur.data.token, isAdmin: utilisateur.data.admin});
                navigation.navigate('accueil');
            } else {
                navigation.navigate("creation", {userGoogle: userGoogle, accessToken: result.authentication.accessToken});
            }
        }
    }

    return(
        <>
            <Authentification navigation={ navigation } handleConnexionGoogle={handleConnexionGoogle}/>
        </>
    )
}