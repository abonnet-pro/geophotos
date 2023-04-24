import {StyleSheet, View} from "react-native";
import * as React from "react";
import {A_JOUE, DEJA_JOUE, TOUTES} from "../../../commons/consts/photo.const";
import Picker from '@ouroboros/react-native-picker';
import {Difficulte} from "../enums/difficulte.enum";

export default function PhotoFiltre({ selectedJoues, selectedDifficulte, setSelectedJoues, setSelectedDifficulte}) {

    const handleSelectedDifficulte = (itemValue) => {
        setSelectedDifficulte(itemValue);
    }

    const handleSelectedJoues = (itemValue) => {
        setSelectedJoues(itemValue);
    }

    return(
        <>
            <View style={ style.pickerJouesContainer}>
                <Picker
                    onChanged={handleSelectedJoues}
                    options={[
                        {text: "Toutes", value: TOUTES},
                        {text: "A jouées", value: A_JOUE},
                        {text: "Déjà jouées", value: DEJA_JOUE},
                    ]}
                    style={{padding: 5}}
                    value={selectedJoues}
                />
            </View>
            <View style={ style.pickerDifficulteContainer}>
                <Picker
                    onChanged={handleSelectedDifficulte}
                    options={[
                        {text: "Toutes", value: Difficulte.TOUTES},
                        {text: "Facile", value: Difficulte.FACILE},
                        {text: "Normal", value: Difficulte.NORMAL},
                        {text: "Difficile", value: Difficulte.DIFFICILE},
                        {text: "Extrême", value: Difficulte.EXTREME},
                    ]}
                    style={{padding: 5}}
                    value={selectedDifficulte}
                />
            </View>
        </>
    )
}

const style = StyleSheet.create({
    pickerJouesContainer: {
        flex:1,
        marginRight:5,
        backgroundColor: 'white',
        borderRadius: 20
    },
    pickerDifficulteContainer: {
        flex:1,
        marginLeft:5,
        backgroundColor: 'white',
        borderRadius: 20
    },
});