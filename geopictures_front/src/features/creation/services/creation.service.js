import axios from "axios";
import {URL_API} from "../../../utils/url.utils";

export function getAvatarsFree() {
    return axios.get(`${URL_API}/avatar/free`)
}

export function createJoueur(data) {
    return axios.post(`${URL_API}/authentification/create`, data);
}

export function checkNomSaisi(nom) {
    return axios.post(`${URL_API}/authentification/check/nom/${nom}`)
}