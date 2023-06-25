import {getValueFor, JOUEUR, save, TOKEN_GOOGLE, USER_GOOGLE} from "../../../utils/store.utils";
import axios from "axios";
import {URL_API} from "../../../utils/url.utils";
import {header} from "../../../utils/http.utils";

export async function getUserDataAndSave (accessToken) {
    let userInfoReponse = await fetch("https://www.googleapis.com/userinfo/v2/me" , {
      headers:  { Authorization: `Bearer ${accessToken}` }
    })

    const userInfo = await userInfoReponse.json();

    await save(TOKEN_GOOGLE, accessToken);
    await save(USER_GOOGLE, userInfo);
}

export async function getUserData (accessToken) {
    let userInfoReponse = await fetch("https://www.googleapis.com/userinfo/v2/me" , {
        headers:  { Authorization: `Bearer ${accessToken}` }
    })

    return await userInfoReponse.json();
}

export async function checkUtilisateurGoogle(checkGoogleUtilisateurRequest) {
    return axios.post(`${URL_API}/authentification/google/check`, checkGoogleUtilisateurRequest);
}

export async function synchorniseUtilisateurGoogle(checkGoogleUtilisateurRequest) {
    const joueur = await getValueFor(JOUEUR);
    return axios.post(`${URL_API}/authentification/google/synchronisation`, checkGoogleUtilisateurRequest, header(joueur.token));
}