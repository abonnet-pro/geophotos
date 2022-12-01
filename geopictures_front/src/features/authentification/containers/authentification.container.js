import Authentification from "../components/authentification.component";
import {useEffect} from "react";
import {getValueFor, JOUEUR} from "../../../utils/store.utils";

export default function AuthentificationContainer({ navigation }) {

    const checkAuthenticated = () => {
        getValueFor(JOUEUR).then(r => r !== null ? navigation.navigate('accueil') : null);
    }

    useEffect(checkAuthenticated, []);

    return(
        <>
            <Authentification navigation={ navigation }/>
        </>
    )
}