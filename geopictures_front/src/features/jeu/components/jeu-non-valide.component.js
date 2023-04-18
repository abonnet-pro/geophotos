import {Image, ImageBackground, StyleSheet, TouchableOpacity, View} from "react-native";
import {BACKGROUND_ASSETS} from "../../../utils/store.utils";
import {Button} from "@rneui/base";
import {commonsStyle, font} from "../../../commons/styles/commons.styles";
import * as React from "react";
import {Camera} from "expo-camera";
import {useState} from "react";

export default function JeuNonValide({ handlePressJouer, permission, handleSendPhoto, location }) {

    let camera;
    const [photoPrise, setPhotoPrise] = useState(null);

    const takePicture = async () => {
        if(camera) {
            const photo = await camera.takePictureAsync();
            setPhotoPrise(photo);
        }
    }

    return(
        <>
            <ImageBackground
                source={BACKGROUND_ASSETS.bordure} style={{width: "100%", height: '100%'}} borderRadius={20}>
                <View style={{padding: 5}}>
                    <ImageBackground source={BACKGROUND_ASSETS.background} style={{width: "100%", height: '100%'}}
                                     borderRadius={20}>
                        {
                            permission && location && location.status === "granted" && permission.status === "granted" ?
                                <View style={ style.containerCamera }>
                                    {
                                        photoPrise ?
                                            <>
                                                <Image style={{width: "100%", height: "100%"}} source={{uri: photoPrise ? photoPrise.uri : ''}}></Image>
                                                <View style={ style.choixContainer }>
                                                    <TouchableOpacity onPress={() => handleSendPhoto(photoPrise)}>
                                                        <Image style={ style.choix } source={require('../../../../assets/valid.png')}></Image>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => setPhotoPrise(null)}>
                                                        <Image style={ style.choix } source={require('../../../../assets/wrong.png')}></Image>
                                                    </TouchableOpacity>
                                                </View>
                                            </>
                                            :
                                            <>
                                                <Camera on style={ style.camera } ref={(r) => {
                                                    camera = r
                                                }}></Camera>
                                                <TouchableOpacity style={ style.containerButtonTakePicture } onPress={ () => takePicture()}>
                                                    <View style={ style.buttonTakePicture }>
                                                        <View style={ style.buttonTakePicture2 }>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            </>

                                    }
                                </View>
                                :
                                <>
                                    <View style={ style.containerBouton }>
                                        <Button
                                            onPress={() => handlePressJouer()}
                                            title="Prendre une photo"
                                            raised={true}
                                            radius={20}
                                            containerStyle={ style.containerBoutonPhoto }
                                            titleStyle={ font(25, 'bold') }
                                            buttonStyle={ style.bouttonPhoto }/>
                                    </View>
                                </>

                        }
                    </ImageBackground>
                </View>
            </ImageBackground>
        </>
    )
}

const style = StyleSheet.create({
    containerBouton: {
        height:"100%",
        marginTop:'auto',
        marginBottom:'auto',
        marginStart:'auto',
        marginEnd:'auto',
    },
    bouttonPhoto: {
        ...commonsStyle.boutonSuccess,
    },
    containerBoutonPhoto: {
        marginTop:'auto',
        marginBottom:'auto',
        marginStart:'auto',
        marginEnd:'auto',
    },
    containerCamera: {
        flex:1,
        borderRadius: 20,
        overflow: 'hidden',
    },
    camera: {
        flex:1,
    },
    buttonTakePicture: {
        width: 50,
        height:50,
        borderRadius:50,
        backgroundColor:"white",
    },
    buttonTakePicture2: {
        width: 45,
        height:45,
        borderWidth:1,
        borderRadius:50,
        alignSelf:'center',
        marginTop:'auto',
        marginBottom:'auto',
        backgroundColor:"white",
    },
    containerButtonTakePicture: {
        position:"absolute",
        alignSelf:"center",
        bottom:0,
        margin:10
    },
    choixContainer: {
        position:"absolute",
        alignSelf:"center",
        bottom:0,
        margin:5,
        flexDirection:"row"
    },
    choix: {
        width:50,
        height:50,
        margin:5
    }
})