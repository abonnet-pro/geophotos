import axios from "axios";
import {URL_API} from "../../../utils/url.utils";
import {header} from "../../../utils/http.utils";

export function getAvatarsFree(setAvatars) {
    axios.get(`${URL_API}/avatar/free`)
        .then(res => setAvatars(res.data))
        .catch(error => console.log(error))
}

export function loadAccueil(token) {
    return axios.get(`${URL_API}/accueil`, header(token))
}

export function createJoueur(data) {
    return axios.post(`${URL_API}/authentification/create`, data);
}

export function checkNomSaisi(nom) {
    return axios.post(`${URL_API}/authentification/check/nom/${nom}`)
}