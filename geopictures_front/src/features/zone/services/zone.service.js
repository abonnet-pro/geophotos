import axios from "axios";
import {URL_API} from "../../../utils/url.utils";
import {getValueFor, JOUEUR} from "../../../utils/store.utils";
import {header} from "../../../utils/http.utils";

export function loadZonesByCode(regionCode, setZones) {
    getValueFor(JOUEUR)
        .then(joueur => {
            axios.get(`${URL_API}/zone/region/${regionCode}`, header(joueur.token))
                .then(async res => {
                    setZones(res.data)
                })
                .catch(error => console.log(error))
        });
}