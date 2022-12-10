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
            axios.get(`${URL_API}/joueur/${joueur.id}`, header(joueur.token))
                .then(async res => {
                    setJoueurInformations(res.data)
                })
                .catch(error => console.log(error))
        })
}

export function createJoueur(data, setJoueurInformations, setRegistered) {
    axios.post(`${URL_API}/authentification/create`, data)
        .then(async res => {
            await save(JOUEUR, {id: res.data.id, token: res.data.utilisateur.token})
            setJoueurInformations(res.data)
            setRegistered(true)
        })
        .catch(error => console.log(error))
}

export function checkNomSaisi(nom, setResponseAvailable) {
    axios.post(`${URL_API}/authentification/check/nom/${nom}`)
        .then(res => setResponseAvailable(res.data))
        .catch(error => console.log(error))
}