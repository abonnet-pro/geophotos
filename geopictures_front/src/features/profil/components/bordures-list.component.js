import {URL_API} from "../../../utils/url.utils";
import * as React from "react";
import {Image, StyleSheet, View} from "react-native";
import Touchable from "react-native-material-tabs/src/components/Touchable";

export default function BorduresList({ bordures, onSaveBordure }) {

    return(
        <>
            <Touchable onPress={() => onSaveBordure(null)}>
                <Image style={style.imageNone} source={require('../../../../assets/ban.png')}></Image>
            </Touchable>
            {
                bordures && bordures.map(bordure => {
                    return(
                        <Touchable key={bordure.id} onPress={() => onSaveBordure(bordure)}>
                            <Image style={style.image} source={{uri:`${URL_API}/images/${bordure.image}`}}></Image>
                        </Touchable>
                    )
                })
            }
        </>
    )
}

const style = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        margin: 5
    },
    imageNone: {
        width: 100,
        height: 100,
        margin: 5
    }
})