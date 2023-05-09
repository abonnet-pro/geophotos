import {Button, Text} from "@rneui/base";
import {commonsStyle, containerStyle, font} from "../../../commons/styles/commons.styles";
import {Image, ImageBackground, StyleSheet, View} from "react-native";
import {URL_API} from "../../../utils/url.utils";
import AntDesign from "react-native-vector-icons/AntDesign";
import ExperienceBarre from "./experience-barre.component";
import {deleteStore, JOUEUR} from "../../../utils/store.utils";
import LoadingGeneral from "../../../commons/component/loading-general.component";

export default function Accueil({ loadingAccueil, joueurInformations, navigation }) {
    return(
        <ImageBackground
            source={require('../../../../assets/auth_background.jpg')}
            style={ containerStyle.backgroundHover100 }>
            {
                loadingAccueil ?
                    <LoadingGeneral titre={"Chargement en cours ..."}></LoadingGeneral>
                    :
                    <>
                        <View style={ style.header }>
                            <View style={ containerStyle.flex }>
                                <Image source={{ uri :`${URL_API}/images/${joueurInformations?.avatarActif?.image}` }} style={ style.avatar }></Image>
                            </View>
                            <View style={ style.boutique }>
                                <AntDesign style={ style.plus } name="pluscircleo" color="white" />
                                <Text style={ style.points }>{ joueurInformations?.pointsBoutique }</Text>
                                <Image style={ style.gold } source={require('../../../../assets/gold.png')}></Image>
                            </View>
                        </View>
                        <View>
                        </View>
                        <View style={ containerStyle.center }>
                            <View style={ style.experience }>
                                <View style={ style.niveauContainer }>
                                    <ImageBackground style={ style.star } source={require('../../../../assets/star.png')}>
                                        <Text style={ style.niveau }>{ joueurInformations?.niveau }</Text>
                                    </ImageBackground>
                                </View>

                                <ExperienceBarre experience={ joueurInformations?.experience} prochainNiveau={ joueurInformations?.prochainNiveau }></ExperienceBarre>
                            </View>
                            <Image
                                source={require('../../../../assets/france.png')}
                                style={style.france}
                            />
                            <Button
                                onPress={ () => navigation.navigate('selectRegion') }
                                title="Jouer une photo"
                                raised={true}
                                radius={20}
                                titleStyle={ font(35, 'bold') }
                                buttonStyle={ commonsStyle.boutonSuccess }/>
                        </View>
                    </>
            }
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    france: {
        marginTop: -60,
        marginBottom: -90,
        width: "80%",
        height: "80%",
        resizeMode: "contain",
    },
    avatar: {
        padding: 10,
        width:50,
        height:50,
        borderRadius:20,
        borderWidth:2,
        borderColor: 'white'
    },
    header: {
        width: "100%",
        padding: 10,
        flexDirection: "row"
    },
    boutique: {
        flexDirection: "row",
        padding: 10,
        alignSelf: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20
    },
    points: {
        marginEnd: 5,
        paddingLeft: 30,
        color: "white",
        fontSize: 15,
        fontWeight: "bold"
    },
    gold: {
        width: 20,
        height:20
    },
    star: {
        width: "100%",
        height:"100%",
    },
    plus: {
        fontSize: 20
    },
    experience: {
        width: "100%",
        alignItems: "center",
    },
    niveau: {
        alignSelf: "center",
        fontWeight: "bold",
        marginTop:'auto',
        marginBottom:'auto'
    },
    niveauContainer : {
        width: 50,
        height:50,
        margin: 5
    }
});