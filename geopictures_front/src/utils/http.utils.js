import Toast from "react-native-root-toast";

const FORBIDDEN = 403

export const header = (token) => {
    return { headers: {'Authorization': 'Bearer ' + token } }
}

export const headerMultiPart = (token) => {
    return {
        headers: {
            'Authorization': 'Bearer ' + token,
            "Content-Type": "multipart/form-data",
        }
    }
}

export const handleError = (error, navigation) => {
    if(error.response.status !== FORBIDDEN) {
        return;
    }

    navigation.reset({
        index: 0,
        routes: [{ name: 'authentification'}],
    });
}

