import {containerStyle} from "../../../commons/styles/commons.styles";
import {
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import PhotoList from "../components/photo-list.component";
import {Difficulte} from "../enums/difficulte.enum";
import PhotoFiltre from "../components/photo-filtre.component";
import {A_JOUE, DEJA_JOUE, TOUTES} from "../../../commons/consts/photo.const";

export default function PhotoContainer({ navigation, route }) {


    const [photos, setPhotos] = useState([]);
    const [selectedDifficulte, setSelectedDifficulte] = useState(Difficulte.TOUTES);
    const [selectedJoues, setSelectedJoues] = useState(TOUTES);

    const init = () => {
        const photos = route.params.photos;
        setPhotos(photos);
    }

    const handlePressPhoto = (photo) => {
        navigation.navigate("imageZoom", {
            image: photo.image
        });
    }

    function getPhotosFiltered() {
        if(selectedDifficulte === Difficulte.TOUTES && selectedJoues === TOUTES) {
            return photos;
        }

        const photosFiltered = photos.filter(photo => {
            if(selectedDifficulte === Difficulte.TOUTES) {
                return true;
            }

            return selectedDifficulte === photo.difficulte;
        });

        return photosFiltered.filter(photo => {
            if(selectedJoues === TOUTES) {
                return true;
            }

            if(selectedJoues === DEJA_JOUE && photo.score !== null) {
                return true;
            }

            if(selectedJoues === A_JOUE && photo.score === null) {
                return true;
            }
        });
    }

    useEffect(init, []);

    return(
        <>
            <ImageBackground
                source={require('../../../../assets/auth_background.jpg')}
                style={ containerStyle.backgroundHover100 }>
                <View style={ style.backContainer }>
                    <TouchableOpacity onPress={ () => navigation.goBack() }>
                        <Image style={ style.back } source={require('../../../../assets/back.png')}></Image>
                    </TouchableOpacity>
                    <View style={ style.pickers }>
                        <PhotoFiltre selectedDifficulte={ selectedDifficulte }
                                     selectedJoues={ selectedJoues }
                                     setSelectedJoues={ setSelectedJoues }
                                     setSelectedDifficulte={ setSelectedDifficulte }>
                        </PhotoFiltre>
                    </View>
                </View>
                <ScrollView>
                    <PhotoList handlePressPhoto={ handlePressPhoto } photos={ getPhotosFiltered() }/>
                </ScrollView>
            </ImageBackground>
        </>
    )
}

const style = StyleSheet.create({
    backContainer: {
        marginLeft: 10,
        flexDirection: "row",
        alignItems:'center',
        marginTop:5,
        marginBottom:5
    },
    back: {
        width: 50,
        height: 50,
    },
    pickers: {
        flex:1,
        flexDirection: "row",
        marginLeft: 10,
        marginRight: 10
    },
});