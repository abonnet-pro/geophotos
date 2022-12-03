import {Button, Text} from "@rneui/base";
import {containerStyle} from "../../../commons/styles/commons.styles";
import {deleteStore, JOUEUR} from "../../../utils/store.utils";

export default function Accueil({ joueurInformations, navigation }) {
    return(
        <>
            <Button containerStyle={ containerStyle.center } title="reset" onPress={ () => deleteStore(JOUEUR) }></Button>
            <Button containerStyle={ containerStyle.center } title="Select region" onPress={ () => navigation.navigate('selectRegion') }></Button>
            <Text style={ containerStyle.center }>Bonjour {joueurInformations?.utilisateur?.nom}</Text>
        </>
    )
}