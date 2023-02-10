import {containerStyle} from "../../../commons/styles/commons.styles";
import {
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import PhotoList from "../components/photo-list.component";

export default function PhotoContainer({ navigation, route }) {

    const [photos, setPhotos] = useState([]);

    const init = () => {
        const photos = route.params.photos;
        setPhotos(photos);
    }

    const handlePressPhoto = (photo) => {
        navigation.navigate("imageZoom", {
            image: photo.image
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
                </View>
                <ScrollView>
                    <PhotoList handlePressPhoto={ handlePressPhoto } photos={ photos }/>
                </ScrollView>
            </ImageBackground>
        </>
    )
}

const style = StyleSheet.create({
    backContainer: {
        marginLeft: 10,
    },
    back: {
        width: 50,
        height: 50
    },
});