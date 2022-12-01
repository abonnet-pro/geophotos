import {getValueFor, JOUEUR} from "./store.utils";

export async function getRegister() {
    let joueur = await getValueFor(JOUEUR);
    return !!joueur;
}