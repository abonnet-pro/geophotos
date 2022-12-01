import {ImageBackground, View} from "react-native";
import {commonsStyle, containerStyle, font} from "../../../commons/commons.style.js/styles";
import {useState} from "react";
import NomChooser from "./nom-chooser.component";
import AvatarChooser from "./avatar-chooser.component";
import {Button} from "@rneui/themed";

export default function FormNouveauJoueur({ setResponseAvailable, responseAvailable, checkNomSaisi, handleCreateJoueur, avatars, bordure, background }) {

    const [nom, setNom] = useState('');
    const [avatarChoisi, setAvatarChoisi] = useState('');
    const [nomSaisi, setNomSaisi] = useState(false);

    return(
        <>
            <ImageBackground
                source={require('../../../../assets/auth_background.jpg')}
                style={ containerStyle.backgroundHover100 }>
                <View style={ containerStyle.center }>
                    {
                        nomSaisi ?
                            <AvatarChooser avatars={ avatars } avatarChoisi={ avatarChoisi } setAvatarChoisi={ setAvatarChoisi } bordure={ bordure } background={ background }/>
                            :
                            <NomChooser setResponseAvailable={ setResponseAvailable } responseAvailable={ responseAvailable } checkNomSaisi={ checkNomSaisi } nom={ nom } setNom={ setNom } setNomSaisi={ setNomSaisi } bordure={ bordure } background={ background }/>
                    }
                    {
                        avatarChoisi ?
                            <Button
                                onPress={ () => handleCreateJoueur(nom, avatarChoisi) }
                                title="C'est parti !"
                                radius={20}
                                titleStyle={ font(20, 'bold') }
                                buttonStyle={ commonsStyle.boutonSuccess }/>
                            :
                            null
                    }
                </View>
            </ImageBackground>
        </>
    )
}

