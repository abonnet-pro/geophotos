import {Image, ImageBackground, View, StyleSheet} from "react-native";
import {containerStyle, font, primary1} from "../../../commons/styles";
import {Button} from '@rneui/themed';

export default function Authentification() {
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
                        onPress={ () => {} }
                        title="JOUER"
                        raised={true}
                        radius={20}
                        titleStyle={ font(50, 'bold') }
                        buttonStyle={ style.buttonPlayInvite }/>
                </View>
            </ImageBackground>
)
}

const style = StyleSheet.create({
    logo: {
        width:'70%',
        height:'70%',
        resizeMode:'contain'
    },
    buttonPlayInvite: {
        backgroundColor: primary1,
        borderStyle: 'solid',
        borderWidth: 4,
        borderColor: 'white'
    }
})
