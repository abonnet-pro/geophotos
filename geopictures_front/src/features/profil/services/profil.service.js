import {getValueFor, JOUEUR} from "../../../utils/store.utils";
import axios from "axios";
import {URL_API} from "../../../utils/url.utils";
import {header} from "../../../utils/http.utils";

export async function loadProfil() {
    const joueur = await getValueFor(JOUEUR);
    return axios.get(`${URL_API}/profil`, header(joueur.token));
}

export async function saveProfil(profilActif) {
    const joueur = await getValueFor(JOUEUR);
    return axios.post(`${URL_API}/profil`, profilActif, header(joueur.token));
}

export async function getJoueurProfil(utilisateurId) {
    const joueur = await getValueFor(JOUEUR);
    return axios.get(`${URL_API}/profil/joueur/${utilisateurId}`, header(joueur.token));
}