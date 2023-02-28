import {getValueFor, JOUEUR} from "../../../utils/store.utils";
import axios from "axios";
import {URL_API} from "../../../utils/url.utils";
import {headerMultiPart} from "../../../utils/http.utils";

export async function sendPhotoJouee(photoId, photoJouee, location) {
    const joueur = await getValueFor(JOUEUR);

    const formData = new FormData();
    formData.append('file', {
        uri: photoJouee,
        name: photoJouee.split("/").slice(-1).pop(),
        type: `image/${photoJouee.split(".").slice(-1).pop()}`,
    });
    formData.append('latitude', location.coords.latitude);
    formData.append('longitude', location.coords.longitude);
    return axios.post(`${URL_API}/jeu/ressemblance/${photoId}`, formData, headerMultiPart(joueur.token));
}