import {getValueFor, JOUEUR} from "../../../utils/store.utils";
import axios from "axios";
import {URL_API} from "../../../utils/url.utils";
import {header} from "../../../utils/http.utils";
import {TypeDemande} from "../enums/type-demande.enum";

export async function loadDemandes() {
    const joueur = await getValueFor(JOUEUR);
    return axios.get(`${URL_API}/collaboration/demandes`, header(joueur.token));
}

export async function annulationDemande(demande) {
    const joueur = await getValueFor(JOUEUR);
    const type = demande.typeDemande === TypeDemande.PHOTO ? "photo" : "zone";
    return axios.post(`${URL_API}/collaboration/demande/annulation/${type}/${demande.id}`, {}, header(joueur.token));
}