import {getValueFor, JOUEUR} from "../../../utils/store.utils";
import axios from "axios";
import {URL_API} from "../../../utils/url.utils";
import {header} from "../../../utils/http.utils";

export async function loadBoutique() {
    const joueur = await getValueFor(JOUEUR);
    return axios.get(`${URL_API}/boutique`, header(joueur.token));
}

export async function achatBoutique(achatBoutiqueRequest) {
    const joueur = await getValueFor(JOUEUR);
    return axios.post(`${URL_API}/boutique/achat`, achatBoutiqueRequest, header(joueur.token));
}