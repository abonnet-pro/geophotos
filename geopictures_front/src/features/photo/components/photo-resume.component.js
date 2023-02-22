import {BACKGROUND_VIEW} from "../../../utils/store.utils";
import {ImageBackground, StyleSheet, TouchableOpacity, View} from "react-native";
import {Image} from "@rneui/themed";
import LoadingView from "../../../commons/component/loading.component";
import * as React from "react";
import {URL_API} from "../../../utils/url.utils";
import {Text} from "@rneui/base";
import {getDifficulteColor, getDifficulteLibelle} from "../enums/difficulte.enum";
import PercentageCircle from "../../../commons/component/percentage-circle.component";
import {getColorByScore} from "../../../commons/consts/photo.const";

export default function PhotoResume({ photo, handlePressPhoto, handlePressImage }) {

    function getSuccesGps() {
        return photo.succesGps ? require('../../../../assets/gps_valid.png') : require('../../../../assets/gps_wrong.png')
    }

    return(
        <>
            <ImageBackground
                source={ BACKGROUND_VIEW.bordure } style={{ padding:5 }} borderRadius={20}>
                <ImageBackground source={ BACKGROUND_VIEW.background }  borderRadius={20}>
                    <TouchableOpacity onPress={ () => handlePressPhoto(photo) }>
                        <View style={ style.photoContainer }>
                            <View style={ style.imageContainer }>
                                <Image
                                    onPress={ () => handlePressImage(photo.image) }
                                    style={ style.image }
                                    PlaceholderContent={ <LoadingView/>}
                                    source={{ uri: `${URL_API}/photos/${photo.image}` }}
                                />
                            </View>
                            <View style={ style.DescritpionContainer }>
                                <View style={ style.titreCcontainer }>
                                    <Text style={ style.titre }>{ photo.titre }</Text>
                                    <Text style={{...style.difficulte, color: getDifficulteColor(photo?.difficulte)}} >{ getDifficulteLibelle(photo?.difficulte) }</Text>
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
                                                              colorProgress={getColorByScore(photo?.score)}>
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
                    </TouchableOpacity>
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
    photoContainer: {
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