import {URL_API} from "../../../utils/url.utils";
import * as React from "react";
import {Image, StyleSheet, View} from "react-native";
import Touchable from "react-native-material-tabs/src/components/Touchable";
import {Text} from "@rneui/base";
import {modalfy} from "react-native-modalfy";

export default function TitresList({ titres, onSaveTitre }) {
    return(
        <>
            <Touchable onPress={() => onSaveTitre(null)}>
                <Image style={style.imageNone} source={require('../../../../assets/ban.png')}></Image>
            </Touchable>
            {
                titres && titres.map(titre => {
                    return(
                        <Touchable style={style.titreContainer} key={titre.id} onPress={() => onSaveTitre(titre)}>
                            <Text style={style.titre}>"{titre.libelle}"</Text>
                        </Touchable>
                    )
                })
            }
        </>
    )
}

const style = StyleSheet.create({
    titreContainer: {
        width: 100,
        height: 100,
        margin: 5,
        borderRadius:20,
        backgroundColor: "rgba(134,134,134,0.2)",
    },
    imageNone: {
        width: 100,
        height: 100,
        margin: 5
    },
    titre: {
        fontWeight:'bold',
        fontSize:15,
        fontStyle:'italic',
        textAlign:'center',
        marginTop:'auto',
        marginBottom:'auto',
        marginLeft:'auto',
        marginRight:'auto',
    }
})