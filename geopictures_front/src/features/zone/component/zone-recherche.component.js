import {StyleSheet} from "react-native";
import { Input } from '@rneui/themed';

export default function ZoneRecherche({ setRecherche, recherche }) {
    return(
        <>
            <Input containerStyle={ style.inputContainer }
                   inputStyle={ style.input }
                   inputContainerStyle={{borderBottomWidth:0}}
                   value={recherche}
                   onChangeText={setRecherche}
                   placeholder={'Recherchez votre zone de jeu'}
            />
        </>
    )
}

const style = StyleSheet.create({
    input: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 5
    }
})