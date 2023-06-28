import {ImageBackground, ScrollView, StyleSheet, View} from "react-native";
import {containerStyle} from "../../../commons/styles/commons.styles";
import {Text} from "@rneui/base";
import {BACKGROUND_ASSETS, JOUEUR, getValueFor} from "../../../utils/store.utils";
import ClassementResume from "./classement-resume.component";

export default function ClassementPlayer({ handleGoListeUser, classement }) {
    return(
        <ImageBackground
            source={ BACKGROUND_ASSETS.bordure } style={{ width: "100%", height:"100%"}} borderRadius={20}>
            <View style={{padding:5}}>
                <ImageBackground source={ BACKGROUND_ASSETS.background } style={{ width: "100%", height:"100%"}} borderRadius={20}>
                    <View style={ style.zones }>
                        {
                            classement ?
                                <View key={classement?.utilisateurId}>
                                    <ClassementResume handleGoListeUser={handleGoListeUser} rank={classement}
                                                      index={classement?.index} last={true}/>
                                </View>
                                :
                                <View style={style.noClassemmentContainer}>
                                    <Text style={style.noZone}>{`vous n'êtes pas encore classé`}</Text>
                                </View>
                        }
                    </View>
                </ImageBackground>
            </View>
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    zones: {
        padding: 10,
        height: '100%',
    },
    noClassemmentContainer: {
        marginTop:'auto',
        marginBottom:'auto',
        marginLeft:'auto',
        marginRight:'auto',
    },
    noZone: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: 'center',
    },
});