import {useEffect, useState} from "react";
import FormNouveauJoueur from "../components/form-nouveau-joueur.component";
import {getRegister} from "../../../utils/authentification.utils";
import Accueil from "../components/accueil.component";
import {createJoueur, getAvatarsFree, loadJoueur} from "../services/accueil.service";
import axios from "axios";
import {URL_API} from "../../../utils/url.utils";

export default function AccueilContainer() {

    const [registered, setRegistered] = useState(false);
    const [avatars, setAvatars] = useState([]);
    const [bordure, setBordure] = useState(null);
    const [background, setBackground] = useState(null);
    const [joueurInformations, setJoueurInformations] = useState(null);
    const [responseAvailable, setResponseAvailable] = useState(null)

    const handleCreateJoueur = (nom, avatar) => {
        const data = {
            nom: nom,
            avatarId: avatar.id
        }
        createJoueur(data, setJoueurInformations, setRegistered)
    }

    const checkNomSaisi = (nom) => {
        axios.post(`${URL_API}/authentification/check/nom/${nom}`)
            .then(res => setResponseAvailable(res.data))
            .catch(error => console.log(error))
    }

    const init = () => {
        setBordure(require('../../../../assets/bordure_wood.jpg'))
        setBackground(require('../../../../assets/background_wood.jpg'))

        getRegister().then(isRegister => {
            setRegistered(isRegister);
            isRegister ? loadJoueur(setJoueurInformations) : getAvatarsFree(setAvatars)
        });
    }

    useEffect(init, []);

    return(
        <>
            {
                !registered ?
                    <FormNouveauJoueur setResponseAvailable={ setResponseAvailable } responseAvailable={ responseAvailable } checkNomSaisi={ checkNomSaisi } handleCreateJoueur={ handleCreateJoueur } avatars={ avatars } bordure={ bordure } background={ background }/>
                    :
                    <Accueil joueurInformations={ joueurInformations }></Accueil>
            }
        </>
    )
}