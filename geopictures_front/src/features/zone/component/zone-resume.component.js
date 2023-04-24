import {Image, StyleSheet, View} from "react-native";
import * as React from "react";
import {URL_API} from "../../../utils/url.utils";
import {Divider, Text} from "@rneui/base";
import {useState} from "react";
import LoadingView from "../../../commons/component/loading.component";

export default function ZoneResume({ zone, last }) {

    const [loading, setLoading] = useState(false);

    function getUri() {
        if(zone.image) {
            return { uri: `${URL_API}/images/${zone.image}` }
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
                           source={getUri()}
                           onLoadStart={() => setLoading(true)}
                           onLoadEnd={() => setLoading(false)}
                    />
                    {loading && <LoadingView/>}
                </View>
                <View style={ style.descriptionContainer }>
                    <Text style={ style.nomZone }>{zone.libelle}</Text>
                    <View style={ style.photos }>
                        <View style={ style.nombrePhotosContainer }>
                            <Image style={{ width: 30, height: 30}} source={require('../../../../assets/camera.png')}></Image>
                            <Text style={ style.nombrePhotos }>{zone.nombrePhotosDisponibles}</Text>
                        </View>
                        <View style={ style.nombrePhotosContainer }>
                            <Image style={{ width: 30, height: 30}} source={require('../../../../assets/tick_success.png')}></Image>
                            <Text style={ style.nombrePhotos }>{zone.nombrePhotosReussis}</Text>
                        </View>
                    </View>
                </View>
                <View style={ style.chevronContainer }>
                    <Image style={{ width: 30, height: 30}} source={require('../../../../assets/chevron-droit.png')}></Image>
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
    }
});