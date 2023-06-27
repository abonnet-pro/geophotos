import {ImageBackground, ScrollView, StyleSheet, View} from "react-native";
import {containerStyle} from "../../../commons/styles/commons.styles";
import {Text} from "@rneui/base";
import {BACKGROUND_ASSETS, JOUEUR, getValueFor} from "../../../utils/store.utils";
import ClassementResume from "./classement-resume.component";

export default function ClassementPlayer({ handleGoListeUser, classement }) {
    console.log(classement)
    return(
        <ImageBackground
            source={ BACKGROUND_ASSETS.bordure } style={{ width: "100%", height:"100%"}} borderRadius={20}>
            <View style={{padding:5}}>
                <ImageBackground source={ BACKGROUND_ASSETS.background } style={{ width: "100%", height:"100%"}} borderRadius={20}>
                    <ScrollView style={ style.zones } showsVerticalScrollIndicator={false}>
                        <View style={{ marginBottom: 10}}>
                            {
                                classement ? classement.map((rank, index) => {
                                    return(
                                        <View key={ rank.joueurId }>
                                            <ClassementResume handleGoListeUser={ handleGoListeUser } rank={rank} index={rank.index}/>
                                        </View>
                                    )
                                }) :
                                    null
                            }
                        </View>
                        {
                            classement.length > 0 ? null :
                                <View>
                                    <Text style={ style.noZone }>{`Vous n'avez pas encore joué une photo. Jouez-en une pour faire augmenter votre score global`}</Text>
                                </View>
                        }
                    </ScrollView>

                </ImageBackground>
            </View>
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    zones: {
        padding: 10,
        height: '100%'
    },
    noZone: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: 'center',
    },
});