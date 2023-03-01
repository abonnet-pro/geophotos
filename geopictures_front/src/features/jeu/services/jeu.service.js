import {getValueFor, JOUEUR} from "../../../utils/store.utils";
import axios from "axios";
import {URL_API} from "../../../utils/url.utils";
import {header, headerMultiPart} from "../../../utils/http.utils";

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

export async function getGadget(code, photoId) {
    const joueur = await getValueFor(JOUEUR);
    return axios.post(`${URL_API}/gadgets/nombre`, { code: code, photoId: photoId }, header(joueur.token))
}

export async function getGadgetLocation(code, photoId, location) {
    const joueur = await getValueFor(JOUEUR);
    console.log(location)
    return axios.post(`${URL_API}/gadgets/nombre/location`, { code: code, photoId: photoId, latitude: location.coords.latitude, longitude: location.coords.longitude }, header(joueur.token))
}

export async function useGadget(code, photoId) {
    const joueur = await getValueFor(JOUEUR);
    return axios.post(`${URL_API}/gadgets/utilisation`, { code: code, photoId: photoId }, header(joueur.token))
}

export async function useGadgetLocation(code, photoId, location) {
    const joueur = await getValueFor(JOUEUR);
    return axios.post(`${URL_API}/gadgets/utilisation/location`, { code: code, photoId: photoId, latitude: location.coords.latitude, longitude: location.coords.longitude }, header(joueur.token))
}
