import * as SecureStore from 'expo-secure-store';
export const TOKEN_API = "TOKEN_API";
export const TOKEN_GOOGLE = "TOKEN_GOOGLE";
export const USER = "USER";
export const USER_GOOGLE = "USER_GOOGLE";

export async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key) {
    return await SecureStore.getItemAsync(key);
}