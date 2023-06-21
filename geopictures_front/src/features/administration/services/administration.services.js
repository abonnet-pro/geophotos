import {getValueFor, JOUEUR} from "../../../utils/store.utils";
import axios from "axios";
import {URL_API} from "../../../utils/url.utils";
import {header} from "../../../utils/http.utils";

export async function loadDemandesEnAttentes() {
    const joueur = await getValueFor(JOUEUR);
    return axios.get(`${URL_API}/collaboration/demandes/attente`, header(joueur.token));
}

export async function updateDemande(demande, updateRequest) {
    const joueur = await getValueFor(JOUEUR);
    return axios.post(`${URL_API}/administration/demande/update`, updateRequest, header(joueur.token));
}

export async function loadJoueurs() {
    const joueur = await getValueFor(JOUEUR);
    return axios.get(`${URL_API}/administration/joueurs`, header(joueur.token));
}

export async function suspensionUtilisateur(suspensionRequest) {
    const joueur = await getValueFor(JOUEUR);
    return axios.post(`${URL_API}/administration/utilisateur/suspension`, suspensionRequest, header(joueur.token));
}

export async function suppressionUtilisateur(utilisateurId) {
    const joueur = await getValueFor(JOUEUR);
    return axios.delete(`${URL_API}/administration/utilisateur/${utilisateurId}`, header(joueur.token));
}