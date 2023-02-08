import {ImageBackground, SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import {URL_API} from "../../../utils/url.utils";
import {Avatar, Text} from '@rneui/themed';
import {containerStyle, font} from "../../../commons/styles/commons.styles";

export default function AvatarChooser({ avatars, avatarChoisi, setAvatarChoisi, bordure, background }) {

    const handlePressAvatar = (avatar) => {
        setAvatarChoisi(avatar)
    }

    return(
        <SafeAreaView style={style.container}>
                <ImageBackground
                    source={ bordure } style={ containerStyle.formBorder } borderRadius={20}>
                    <ImageBackground source={ background } borderRadius={20}>
                        <View style={ style.textContainer }>
                            <Text style={ font(18, 'bold', 'center') }>Derniere étape !</Text>
                            <Text style={ font(18, 'bold', 'center') }>Veuillez choisir un avatar</Text>
                        </View>
                        <ScrollView style={ style.scrollViewContainer } showsVerticalScrollIndicator={false}>
                            <View style={ style.wrapView }>
                                {
                                    avatars.map(avatar => {
                                        return(
                                            <Avatar
                                                onPress={ () => handlePressAvatar(avatar) }
                                                containerStyle={ style.avatarContainer }
                                                avatarStyle={ avatarChoisi === avatar ? style.avatarChoosen : {} }
                                                size={64}
                                                key={ avatar.id }
                                                rounded
                                                source={{ uri :`${URL_API}/images/${avatar.image}` }}/>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    </ImageBackground>
                </ImageBackground>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    textContainer: {
        marginTop: 10,
    },
    container: {
        height: '90%',
        width: '100%',
    },
    scrollViewContainer: {
        height: '90%',
    },
    wrapView: {
        marginTop: 10,
        marginBottom:10,
        flexWrap:'wrap',
        flexDirection: 'row',
        justifyContent:'center'
    },
    avatarContainer: {
        margin:3,
    },
    avatarChoosen: {
        borderStyle: "solid",
        borderColor: 'white',
        borderWidth: 4
    }
})