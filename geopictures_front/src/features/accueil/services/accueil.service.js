import axios from "axios";
import {URL_API} from "../../../utils/url.utils";
import {getValueFor, JOUEUR, save} from "../../../utils/store.utils";
import {header} from "../../../utils/http.utils";

export function getAvatarsFree(setAvatars) {
    axios.get(`${URL_API}/avatar/free`)
        .then(res => setAvatars(res.data))
        .catch(error => console.log(error))
}

export function loadJoueur(setJoueurInformations) {
    getValueFor(JOUEUR)
        .then(joueur => {
            console.log(joueur)
            axios.get(`${URL_API}/accueil`, header(joueur.token))
                .then(async res => {
                    console.log(res.data)
                    setJoueurInformations(res.data)
                })
                .catch(error => console.log(error))
        })
}

export function createJoueur(data) {
    return axios.post(`${URL_API}/authentification/create`, data);
}

export function checkNomSaisi(nom, setResponseAvailable) {
    axios.post(`${URL_API}/authentification/check/nom/${nom}`)
        .then(res => setResponseAvailable(res.data))
        .catch(error => console.log(error))
}