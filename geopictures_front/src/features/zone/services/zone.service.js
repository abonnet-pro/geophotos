import axios from "axios";
import {URL_API} from "../../../utils/url.utils";
import {getValueFor, JOUEUR} from "../../../utils/store.utils";
import {header} from "../../../utils/http.utils";

export async function loadZonesByCode(regionCode) {
    const joueur = await getValueFor(JOUEUR);
    return axios.get(`${URL_API}/zone/region/${regionCode}`, header(joueur.token));
}

export async function suppressionZone(zoneId) {
    const joueur = await getValueFor(JOUEUR);
    return axios.delete(`${URL_API}/administration/zone/${zoneId}`, header(joueur.token));
}