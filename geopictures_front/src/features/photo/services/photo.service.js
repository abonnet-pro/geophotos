import {getValueFor, JOUEUR} from "../../../utils/store.utils";
import axios from "axios";
import {URL_API} from "../../../utils/url.utils";
import {header} from "../../../utils/http.utils";

export async function loadPhotoByZone(zoneId) {
    const joueur = await getValueFor(JOUEUR);
    return axios.get(`${URL_API}/photo/zone/${zoneId}`, header(joueur.token));
}