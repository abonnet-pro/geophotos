import {StyleSheet} from "react-native";

export const primary1 = '#005202';
export const primary2 = '#048506';
export const secondary1 = '#0f7c81';
export const secondary2 = '#17b2b7';

export const backgroundForm = '#bba98b';

export const containerStyle = StyleSheet.create({
    center: {
        marginTop: 'auto',
        marginBottom: 'auto',
        alignItems: 'center'
    },
    backgroundHover100: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    formBorder : {
        margin: 20,
        padding: 5,
    },
});

export const commonsStyle = StyleSheet.create({
    mt1: {
        marginTop: 10
    },
    bgPrimary1: {
        backgroundColor: primary1
    },
    bgPrimary2: {
        backgroundColor: primary2
    },
    bgSecondary1: {
        backgroundColor: secondary1
    },
    bgSecondary2: {
        backgroundColor: secondary2
    },
    boutonSuccess: {
        backgroundColor: primary1,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'white',
    }
});

export const font = (size, weight, align) => {
    return {
        fontWeight: weight,
        fontSize: size,
        alignSelf: align
    }
}