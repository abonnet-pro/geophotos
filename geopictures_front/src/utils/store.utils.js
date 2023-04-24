import * as SecureStore from 'expo-secure-store';

export const TOKEN_GOOGLE = "TOKEN_GOOGLE";
export const JOUEUR = "JOUEUR";
export const USER_GOOGLE = "USER_GOOGLE";

export const BACKGROUND_VIEW = { bordure: null, background: null };

export async function save(key, value) {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
}

export async function getValueFor(key) {
    return JSON.parse(await SecureStore.getItemAsync(key));
}

export async function deleteStore(key) {
    await SecureStore.deleteItemAsync(key)
}

export function loadBackgroundView() {
    BACKGROUND_VIEW.background = require('../../assets/background_wood.jpg');
    BACKGROUND_VIEW.bordure = require('../../assets/bordure_wood.jpg');
}