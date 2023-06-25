import {StyleSheet, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {URL_API} from "../../../utils/url.utils";
import {Divider, Text} from "@rneui/base";
import LoadingView from "../../../commons/component/loading.component";
import {Image} from "@rneui/themed";

export default function ZoneResume({ zone, last, handleGoListePhoto, handlePressDeleteZone, isAdmin }) {

    function getUri() {
        if(zone.image) {
            return { uri: `${URL_API}/photos/${zone.image}` }
        } else {
            return require('../../../../assets/geopictures_logo_1.png');
        }
    }

    return(
        <>
            <View style={ style.zoneContainer }>
                <View style={ style.image }>
                    <Image resizeMode={"contain"}
                           style={ style.image }
                           PlaceholderContent={ <LoadingView/>}
                           source={getUri()}
                    />
                </View>
                <View style={ style.descriptionContainer }>
                    <View style={ style.row}>
                        {
                            isAdmin &&
                            <View style={style.imageCroixContainer}>
                                <Image onPress={() => handlePressDeleteZone(zone.id)} style={ style.imageCroix } source={require('../../../../assets/cross.png')}></Image>
                            </View>
                        }
                        <Text style={ style.nomZone }>{zone.libelle}</Text>
                    </View>
                    <View style={ style.photos }>
                        <View style={ style.nombrePhotosContainer }>
                            <Image style={{ width: 30, height: 30}} source={require('../../../../assets/camera.png')}></Image>
                            <Text style={ style.nombrePhotos }>{zone.nombrePhotosDisponibles}</Text>
                        </View>
                        <View style={ style.nombrePhotosContainer }>
                            <Image style={{ width: 30, height: 30}} source={require('../../../../assets/tick_success.png')}></Image>
                            <Text style={ style.nombrePhotos }>{zone.nombrePhotosJoues}</Text>
                        </View>
                    </View>
                </View>
                <View style={ style.chevronContainer }>
                    <TouchableOpacity style={zone.nombrePhotosDisponibles === 0 ? {opacity:0.5} : null} disabled={ zone.nombrePhotosDisponibles === 0 } onPress={ () => handleGoListePhoto(zone.id) }>
                        <Image style={{ width: 30, height: 30}} source={require('../../../../assets/chevron-droit.png')}></Image>
                    </TouchableOpacity>
                </View>
            </View>
            {
                last ? null : <Divider color={"black"} style={{width:"100%"}}></Divider>
            }
        </>
    )
}

const style = StyleSheet.create({
    zoneContainer: {
        flexDirection: "row",
        margin: 10,
        width: '100%',
    },
    image: {
        width: 100,
        height: 100
    },
    descriptionContainer: {
        marginLeft: 20,
        flex:3
    },
    nomZone: {
        marginTop: 'auto',
        marginBottom: 'auto',
        fontSize: 20,
        fontWeight: "bold"
    },
    photos: {
        flexDirection: "row",
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    nombrePhotosContainer: {
        flexDirection: "row",
        alignItems:"center",
        marginRight: 20
    },
    nombrePhotos: {
        marginLeft: 10,
        marginRight: 10
    },
    chevronContainer: {
        alignSelf: "center",
        flex:1,
        justifyContent: "flex-end",
    },
    imageCroix: {
        width:25,
        height:25,
        marginRight: 5
    },
    row: {
        flexDirection: "row",
        alignItems: 'center'
    }
});