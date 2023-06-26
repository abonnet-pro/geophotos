import {ImageBackground, StyleSheet, TouchableOpacity, View} from "react-native";
import {BACKGROUND_ASSETS} from "../../../utils/store.utils";
import {Camera} from "expo-camera";
import * as React from "react";
import {Image} from "@rneui/themed";

export default function VisualisationPhoto({handlePressImage, setFormValid, regionSelected, zoneSelected, difficulteSelected, titre, indice, permission, location, photoPrise, setPhotoPrise, formValid, handleSendDemande}) {

    let camera;

    const takePicture = async () => {
        if(camera) {
            const photo = await camera.takePictureAsync();
            setPhotoPrise(photo);
            setFormValid(regionSelected && zoneSelected && difficulteSelected && titre && indice);
        }
    }

    function getImage() {
        return formValid ? require('../../../../assets/valid.png') : require('../../../../assets/valid-disabled.png');
    }

    return(
        <ImageBackground
            source={ BACKGROUND_ASSETS.bordure } style={{ padding:5 }} borderRadius={20}>
            <ImageBackground source={ BACKGROUND_ASSETS.background } borderRadius={20}>
                <View style={ style.visualisationContainer }>
                    {
                        permission && location && location.status === "granted" && permission.status === "granted" ?
                            <View style={ style.containerCamera }>
                                {
                                    photoPrise ?
                                        <>
                                            <Image onPress={() => handlePressImage(photoPrise.uri, true)} style={{width: "100%", height: "100%"}} source={{uri: photoPrise ? photoPrise.uri : ''}}></Image>
                                            <View style={ style.choixContainer }>
                                                <TouchableOpacity onPress={handleSendDemande}>
                                                    <Image style={ style.choix } source={getImage()}></Image>
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
                            <></>
                    }
                </View>
            </ImageBackground>
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    visualisationContainer: {
        height: "100%",
    },
    containerCamera: {
        flex:1,
        borderRadius: 20,
        overflow: 'hidden',
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
    }
});