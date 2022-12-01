import {Button, Text} from "@rneui/base";
import {containerStyle} from "../../../commons/commons.style.js/styles";
import {deleteStore, JOUEUR} from "../../../utils/store.utils";

export default function Accueil({ joueurInformations }) {
    return(
        <>
            <Button containerStyle={ containerStyle.center } title="reset" onPress={ () => deleteStore(JOUEUR) }></Button>
            <Text style={ containerStyle.center }>Bonjour {joueurInformations?.utilisateur?.nom}</Text>
        </>
    )
}