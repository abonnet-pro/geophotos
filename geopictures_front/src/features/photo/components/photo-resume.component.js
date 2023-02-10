import {BACKGROUND_VIEW} from "../../../utils/store.utils";
import {ImageBackground, StyleSheet, View} from "react-native";
import {Image} from "@rneui/themed";
import LoadingView from "../../../commons/component/loading.component";
import * as React from "react";
import {URL_API} from "../../../utils/url.utils";
import {Text} from "@rneui/base";
import {getDifficulteColor, getDifficulteLibelle} from "../enums/difficulte.enum";
import PercentageCircle from "../../../commons/component/percentage-circle.component";

export default function PhotoResume({ photo, handlePressPhoto }) {

    function getSuccesGps() {
        return photo.succesGps ? require('../../../../assets/gps_valid.png') : require('../../../../assets/gps_wrong.png')
    }

    function getColorProgress() {
        if(photo.score > 80) {
            return "#1d9500";
        }

        if(photo.score > 50) {
            return "#e58d19";
        }

        return "#950016";
    }

    return(
        <>
            <ImageBackground
                source={ BACKGROUND_VIEW.bordure } style={{ padding:5 }} borderRadius={20}>
                <ImageBackground source={ BACKGROUND_VIEW.background }  borderRadius={20}>
                    <View style={ style.topContainer }>
                        <View style={ style.imageContainer }>
                            <Image
                                   onPress={ () => handlePressPhoto(photo) }
                                   style={ style.image }
                                   PlaceholderContent={ <LoadingView/>}
                                   source={{ uri: `${URL_API}/images/${photo.image}` }}
                            />
                        </View>
                        <View style={ style.DescritpionContainer }>
                            <View style={ style.titreCcontainer }>
                                <Text style={ style.titre }>{ photo.titre }</Text>
                                <Text style={{...style.difficulte, color: getDifficulteColor(photo.difficulte)}} >{ getDifficulteLibelle(photo.difficulte) }</Text>
                            </View>

                            <View style={ style.publicationContainer }>
                                <Text>Publié le : { new Date(photo.datePublication).toLocaleDateString() }</Text>
                                <Text>Par : { photo.titulaire }</Text>
                            </View>
                        </View>
                    </View>
                    {
                        photo.score ?
                            <View style={ style.bottomContainer }>
                                <View style={ style.scoreContainer }>
                                    <Text style={ style.scoreText }>Score</Text>
                                    <View style={style.progressContainer}>
                                        <PercentageCircle size={50}
                                                          percentage={photo.score}
                                                          colorProgress={getColorProgress()}>
                                        </PercentageCircle>
                                    </View>
                                </View>
                                <View style={ style.succesContainer }>
                                    <Text style={ style.succesText }>Succès GPS</Text>
                                    <View style={ style.imageGpsContainer }>
                                        <Image
                                            style={ style.imageGps }
                                            source={getSuccesGps()}
                                        />
                                    </View>

                                </View>
                            </View>
                            :
                            null
                    }

                </ImageBackground>
            </ImageBackground>
        </>
    )
}

const style = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        borderRadius: 100
    },
    imageContainer: {
        margin: 10,
    },
    topContainer: {
        flexDirection: "row",
    },
    DescritpionContainer: {
        margin: 10,
        height: '100%',
    },
    titre: {
        fontWeight: "bold",
        fontSize: 20,
    },
    difficulte: {
        fontSize: 15,
        marginTop: 5
    },
    publicationContainer: {
        flex:1
    },
    titreCcontainer: {
        flex:1
    },
    bottomContainer: {
        margin: 10,
        flexDirection: "row",
    },
    scoreContainer: {
        flex:1,
    },
    succesContainer: {
        flex:1,
    },
    scoreText: {
        textAlign:'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    succesText: {
        textAlign:'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    progressContainer: {
        marginTop: 10,
        alignSelf:'center',
    },
    imageGps: {
        width: 75,
        height: 75
    },
    imageGpsContainer: {
        marginTop: 20,
        alignSelf:'center',
    }
});