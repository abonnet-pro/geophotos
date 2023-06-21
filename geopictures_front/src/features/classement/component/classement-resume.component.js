import {StyleSheet, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {URL_API} from "../../../utils/url.utils";
import {Divider, Text, fonts} from "@rneui/base";
import LoadingView from "../../../commons/component/loading.component";
import {Image} from "@rneui/themed";
import EStyleSheet from 'react-native-extended-stylesheet';

export default function ClassementResume({ rank, last, index, handleGoListeUser }) {

    function getUri() {
        if(rank.avatar !== null) {
            return { uri: `${URL_API}/images/${rank.avatar.image}` }
        } else {
            return require('../../../../assets/geopictures_logo_1.png');
        }
    }

    function checkIndexIsEven (n) {
        if(n===1) {
            return "gold"
        }
        else if(n===2) {
            return "silver"
        }
        else if(n===3) {
            return "#cd7f32"
        }
        else
            return "white"
    }

    return(
        <>
        <TouchableOpacity onPress={ () => handleGoListeUser(rank.joueurId) }>
            <View style={ style.zoneContainer }>
            <View style={[style.indexContainer, { backgroundColor: checkIndexIsEven(index+1)}]}>
                    <Text style={ style.index }>{index + 1}</Text>
                </View>
                <View style={ style.image }>
                    <Image resizeMode={"contain"}
                           style={ style.image }
                           PlaceholderContent={ <LoadingView/>}
                           source={getUri()}
                    />
                </View>
                <View style={ style.descriptionContainer }>
                    <Text style={ style.nomJoueur }>{rank.joueurNom}</Text>
                </View>
                <View style={ style.scoreContainer }>
                    <Text style={ style.scoreJoueur }>{rank.score}</Text>
                </View>
            </View>
            </TouchableOpacity>
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
        width: 50,
        height: 50
    },
    descriptionContainer: {
        marginLeft: 5,
        flex:3,
        fontSize: 10
    },
    scoreContainer: {
        flex:2,
        fontSize: 10,
        marginRight: 10,
    },
    indexContainer: {
        flex: 1,
        borderRadius: 15,
        marginTop: 'auto',
        marginBottom: 'auto',
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        padding: 5,
        overflow: 'hidden',
        marginRight: 10
    },
    index: {
        fontSize: 20,
        textAlign: "center",
    },
    nomJoueur: {
        marginTop: 'auto',
        marginBottom: 'auto',
        fontSize: 15,
        fontWeight: "bold"
    },
    scoreJoueur: {
        borderRadius: 15,
        marginTop: 'auto',
        marginBottom: 'auto',
        fontSize: 15,
        fontWeight: "bold",
        backgroundColor: "white",
        textAlign: "center",
        padding: 5,
        overflow: 'hidden',
        borderColor: "black",
        borderWidth: "1px",
    },
});