import {Image, ImageBackground, View, StyleSheet} from "react-native";
import {commonsStyle, containerStyle, font} from "../../../commons/commons.style.js/styles";
import {Button} from '@rneui/themed';

export default function Authentification({ navigation }) {
    return(
            <ImageBackground
                source={require('../../../../assets/auth_background.jpg')}
                style={ containerStyle.backgroundHover100 }>
                <View style={ containerStyle.center }>
                    <Image
                        source={require('../../../../assets/geopictures_logo_2.png')}
                        style={style.logo}
                    />
                    <Button
                        onPress={ () => navigation.navigate('accueil') }
                        title="JOUER"
                        raised={true}
                        radius={20}
                        titleStyle={ font(50, 'bold') }
                        buttonStyle={ commonsStyle.boutonSuccess }/>
                </View>
            </ImageBackground>
)
}

const style = StyleSheet.create({
    logo: {
        width:'70%',
        height:'70%',
        resizeMode:'contain'
    }
})
