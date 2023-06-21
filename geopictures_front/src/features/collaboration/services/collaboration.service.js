import {getValueFor, JOUEUR} from "../../../utils/store.utils";
import axios from "axios";
import {URL_API} from "../../../utils/url.utils";
import {headerMultiPart} from "../../../utils/http.utils";

export async function demandePhoto(demandePhoto, photoPrise) {
    const joueur = await getValueFor(JOUEUR);

    const formData = new FormData();
    formData.append('file', {
        uri: photoPrise,
        name: photoPrise.split("/").slice(-1).pop(),
        type: `image/${photoPrise.split(".").slice(-1).pop()}`,
    });
    formData.append('demandePhoto', JSON.stringify(demandePhoto));
    return axios.post(`${URL_API}/collaboration/demande/photo`, formData, headerMultiPart(joueur.token));
}

export async function demandeZone(demandeZone, image) {
    const joueur = await getValueFor(JOUEUR);

    const formData = new FormData();

    if(image) {
        formData.append('file', {
            uri: image,
            name: image.split("/").slice(-1).pop(),
            type: `image/${image.split(".").slice(-1).pop()}`,
        });
    }

    formData.append('demandeZone', JSON.stringify(demandeZone));
    return axios.post(`${URL_API}/collaboration/demande/zone`, formData, headerMultiPart(joueur.token));
}