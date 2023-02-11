import {StyleSheet, View} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {Difficulte} from "../enums/difficulte.enum";
import * as React from "react";
import {A_JOUE, DEJA_JOUE, TOUTES} from "../../../commons/consts/photo.const";

export default function PhotoFiltre({ selectedJoues, selectedDifficulte, setSelectedJoues, setSelectedDifficulte}) {

    const handleSelectedDifficulte = (itemValue, itemIndex) => {
        setSelectedDifficulte(itemValue);
    }

    const handleSelectedJoues = (itemValue, itemIndex) => {
        setSelectedJoues(itemValue);
    }

    return(
        <>
            <View style={ style.pickerJouesContainer}>
                <Picker selectedValue={selectedJoues}
                        onValueChange={handleSelectedJoues}>
                    <Picker.Item style={ style.itemPicker } label="Toutes" value={TOUTES} />
                    <Picker.Item style={ style.itemPicker } label="Déja joués" value={DEJA_JOUE} />
                    <Picker.Item style={ style.itemPicker } label="A joués" value={A_JOUE} />
                </Picker>
            </View>
            <View  style={ style.pickerDifficulteContainer}>
                <Picker selectedValue={selectedDifficulte}
                        onValueChange={handleSelectedDifficulte}>
                    <Picker.Item style={ style.itemPicker } label="Toutes" value={Difficulte.TOUTES} />
                    <Picker.Item style={ style.itemPicker } label="Facile" value={Difficulte.FACILE} />
                    <Picker.Item style={ style.itemPicker } label="Normal" value={Difficulte.NORMAL} />
                    <Picker.Item style={ style.itemPicker } label="Difficile" value={Difficulte.DIFFICILE} />
                    <Picker.Item style={ style.itemPicker } label="Extrême" value={Difficulte.EXTREME} />
                </Picker>
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
    itemPicker: {

    },
});