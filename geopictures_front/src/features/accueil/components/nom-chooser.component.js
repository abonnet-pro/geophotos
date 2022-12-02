import {Button, Text} from "@rneui/themed";
import {commonsStyle, font, primary1} from "../../../commons/styles/commons.styles";
import {ActivityIndicator, ImageBackground, StyleSheet, TextInput, View} from "react-native";
import {Icon} from "@rneui/base";
import {checkNomSaisi} from "../services/accueil.service";

export default function NomChooser({ setResponseAvailable, responseAvailable, nom, setNom, setNomSaisi, bordure, background}) {

    const changeText = (nom) => {
        setResponseAvailable(null)
        setNom(nom)
    }

    return(
        <>
            {
                bordure && background ?
                    <ImageBackground
                        source={ bordure } style={ style.border } borderRadius={20}>
                        <ImageBackground source={ background } borderRadius={20}>
                            <View style={ style.form }>
                                <Text style={ font(18, 'bold', 'center') }>Bienvenue dans geopictures !</Text>
                                <Text style={ font(18, 'bold', 'center') }>Veuillez choisir un nom d'utilisateur</Text>
                                {
                                    responseAvailable && !responseAvailable.available ? <Text style={ style.checkNom }>* Nom d'utilisateur déjà utilisé</Text> : <></>
                                }
                                <View style={ style.inline }>
                                    <TextInput
                                        style={ style.inputForm }
                                        value={nom}
                                        onChangeText={changeText}
                                        placeholder={'Entrez votre nom d\'utilisateur'}
                                    />
                                    <Button type="clear" onPress={ () => checkNomSaisi(nom, setResponseAvailable) } buttonStyle={ style.async }><Icon name={responseAvailable && responseAvailable.available ? "check" : "sync"} /></Button>
                                </View>

                                <Button
                                    disabled={!responseAvailable ||  responseAvailable && !responseAvailable.available}
                                    onPress={ () => setNomSaisi(true) }
                                    title="Valider"
                                    raised={true}
                                    radius={20}
                                    titleStyle={ font(20, 'bold') }
                                    buttonStyle={ commonsStyle.boutonSuccess }/>
                            </View>
                        </ImageBackground>
                    </ImageBackground> :
                    <ActivityIndicator size="large" color={ primary1 } />
            }
        </>
    )
}

const style = StyleSheet.create({
    form: {
        borderRadius: 20,
        padding: 10,
    },
    inputForm: {
        width:'90%',
        marginTop: 20,
        marginBottom: 20,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 20,
    },
    border : {
        margin: 20,
        padding: 5,
    },
    checkNom: {
        fontSize:8,
        color: 'red',
        marginBottom: -10,
        marginTop: 10,
        marginStart:5
    },
    inline: {
        flexDirection: 'row',
        alignContent:'space-around',
    },
    async: {
        flex:1,
        justifyContent: 'flex-end'
    }
})