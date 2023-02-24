import axios from "axios";
import {URL_API} from "../../../utils/url.utils";
import {header} from "../../../utils/http.utils";
import {getValueFor, JOUEUR} from "../../../utils/store.utils";


export async function loadAccueil() {
    const joueur = await getValueFor(JOUEUR);
    return axios.get(`${URL_API}/accueil`, header(joueur.token))
}