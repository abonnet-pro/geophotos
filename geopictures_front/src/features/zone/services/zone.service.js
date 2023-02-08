import axios from "axios";
import {URL_API} from "../../../utils/url.utils";
import {getValueFor, JOUEUR} from "../../../utils/store.utils";
import {header} from "../../../utils/http.utils";

export async function loadZonesByCode(regionCode) {
    const joueur = await getValueFor(JOUEUR);
    return axios.get(`${URL_API}/zone/region/${regionCode}`, header(joueur.token))

        // .then(joueur => {
        //     axios.get(`${URL_API}/zone/region/${regionCode}`, header(joueur.token))
        //         .then(async res => {
        //             setZones(res.data)
        //         })
        //         .catch(error => console.log(error))
        // });
}