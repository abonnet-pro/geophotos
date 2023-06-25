import {StyleSheet, View} from "react-native";
import * as React from "react";
import {Text} from "@rneui/base";
import Picker from '@ouroboros/react-native-picker';

export default function ClassementFiltre({ regionsInformation, setSelectedRegion, selectedRegion }) {
    const handleSelectedJoues = (itemValue) => {
    }

    const regionInfo = Object.values(regionsInformation);

    return(
        <>
            <View style={ style.pickerJouesContainer}>
            <Picker
                    onChanged={handleSelectedJoues}
                    options={[
                        {text: "Toutes", value: "TOUTES"},
                        {text: "A jouées", value: "A JOUE"},
                        {text: "Déjà jouées", value: "DEJA_JOUE"},
                        /* regionInfo.forEach((region, index) => ({
                            text: region.libelle,
                            value: region.code,
                            key: index
                        })) */
                    ]}
                    style={{padding: 5}}
                    value={"TOUTES"}
                />
            </View>
        </>
    )
}

const style = StyleSheet.create({
    pickerJouesContainer: {
        marginRight:5,
        marginTop: 5,
        width: 100,
        height: 50,
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 20
    },
    pickerDifficulteContainer: {
        flex:1,
        marginLeft:5,
        backgroundColor: 'white',
        borderRadius: 20
    },
});