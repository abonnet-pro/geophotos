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