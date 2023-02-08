import {Button, Text} from "@rneui/themed";
import {commonsStyle, containerStyle, font, primary1} from "../../../commons/styles/commons.styles";
import {ActivityIndicator, ImageBackground, StyleSheet, TextInput, View} from "react-native";
import {checkNomSaisi} from "../services/accueil.service";
import {useState} from "react";
import LoadingView from "../../../commons/component/loading.component";

export default function NomChooser({ setResponseAvailable, responseAvailable, nom, setNom, bordure, background}) {

    const [loading, setLoading] = useState(false);

    const changeText = (nom) => {
        setResponseAvailable(null)
        setNom(nom)
    }

    const handleCheckNom = async (nom, setResponseAvailable) => {
        setLoading(true);
        const response = await checkNomSaisi(nom, setResponseAvailable);
        setResponseAvailable(response.data);
        setLoading(false);
    }

    return(
        <ImageBackground
            source={ bordure } style={ containerStyle.formBorder } borderRadius={20}>
            <ImageBackground source={ background } borderRadius={20}>
                <View style={ style.form }>
                    <Text style={ font(18, 'bold', 'center') }>Bienvenue dans geopictures !</Text>
                    <Text style={ font(18, 'bold', 'center') }>Veuillez choisir un nom d'utilisateur</Text>
                    {
                        responseAvailable && !responseAvailable.available ? <Text style={ style.checkNom }>* Nom d'utilisateur déjà utilisé</Text> : <></>
                    }
                    <TextInput
                        style={ style.inputForm }
                        value={nom}
                        onChangeText={changeText}
                        placeholder={'Entrez votre nom d\'utilisateur'}
                    />

                    {
                        loading ?
                            <View>
                                <LoadingView/>
                            </View>
                            :
                            <Button
                                disabled={nom === ''}
                                onPress={ () => handleCheckNom(nom, setResponseAvailable) }
                                title="Valider"
                                raised={true}
                                radius={20}
                                titleStyle={ font(20, 'bold') }
                                buttonStyle={ commonsStyle.boutonSuccess }/>
                    }

                </View>
            </ImageBackground>
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    form: {
        borderRadius: 20,
        padding: 10,
    },
    inputForm: {
        marginTop: 20,
        marginBottom: 20,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 20,
    },
    checkNom: {
        fontSize:8,
        color: 'red',
        marginBottom: -10,
        marginTop: 10,
        marginStart:5
    }
})