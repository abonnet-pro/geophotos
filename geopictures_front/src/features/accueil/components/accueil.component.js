import {Button, Text} from "@rneui/base";
import {commonsStyle, containerStyle, font} from "../../../commons/styles/commons.styles";
import {Image, ImageBackground, StyleSheet, TouchableOpacity, View} from "react-native";
import {URL_API} from "../../../utils/url.utils";
import AntDesign from "react-native-vector-icons/AntDesign";
import ExperienceBarre from "./experience-barre.component";
import {resetStore} from "../../../utils/store.utils";
import LoadingGeneral from "../../../commons/component/loading-general.component";

export default function Accueil({ loadingAccueil, joueurInformations, navigation, userGoogle, handleSynchronisationGoogle }) {
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
                            <View style={style.avatarGoogleContainer}>
                                <TouchableOpacity onPress={ () => navigation.navigate('profil') }>
                                    <Image source={{ uri :`${URL_API}/images/${joueurInformations?.avatarActif?.image}` }} style={ style.avatar }></Image>
                                </TouchableOpacity>

                                <View style={style.googleContainer}>
                                    <TouchableOpacity onPress={handleSynchronisationGoogle}>
                                        <Image source={require("../../../../assets/google.png")} style={ style.google }></Image>
                                    </TouchableOpacity>
                                    {userGoogle && <Image source={require("../../../../assets/check.png")} style={style.check}></Image>}
                                </View>

                            </View>


                            <View style={ style.boutique }>
                                <AntDesign onPress={() => navigation.navigate("boutique")} style={ style.plus } name="pluscircleo" color="white" />
                                <Text style={ style.points }>{ joueurInformations?.pointsBoutique }</Text>
                                <Image style={ style.gold } source={require('../../../../assets/gold.png')}></Image>
                            </View>
                        </View>
                        <View>
                        </View>
                        <View style={ style.body }>
                            <View style={ style.experienceContainer }>
                                <View style={style.centerContainer}>
                                    <View style={ style.niveauContainer }>
                                        <ImageBackground style={ style.star } source={require('../../../../assets/star.png')}>
                                            <Text style={ style.niveau }>{ joueurInformations?.niveau }</Text>
                                        </ImageBackground>
                                    </View>

                                    <ExperienceBarre experience={ joueurInformations?.experience} prochainNiveau={ joueurInformations?.prochainNiveau }></ExperienceBarre>
                                </View>
                            </View>
                            <View style={style.franceContainer}>
                                <Image
                                    source={require('../../../../assets/france.png')}
                                    style={style.france}
                                />
                            </View>

                            <View style={style.boutonJouerContainer}>
                                <Button
                                    onPress={ () => navigation.navigate('selectRegion') }
                                    title="Jouer une photo"
                                    raised={true}
                                    radius={20}
                                    titleStyle={ font(35, 'bold') }
                                    containerStyle={{marginTop:'auto', marginBottom:'auto'}}
                                    buttonStyle={ commonsStyle.boutonSuccess }/>
                            </View>

                        </View>
                    </>
            }
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    france: {
        width: "100%",
        height: "100%",
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
    google: {
        width:25,
        height:25,
    },
    check: {
        width:15,
        height:15,
        top:-5,
    },
    googleContainer: {
        alignSelf:"center",
        marginLeft:15,
        flexDirection:"row"
    },
    header: {
        width: "100%",
        padding: 10,
        flexDirection: "row",
        justifyContent:"space-between"
    },
    body: {
        flex:1
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
    experienceContainer: {
        width: "100%",
        alignItems: "center",
        flex:1,
    },
    centerContainer: {
        width:'100%',
        alignItems: "center",
        marginTop:'auto',
        marginBottom:'auto'
    },
    franceContainer: {
        flex:2,
    },
    boutonJouerContainer: {
        flex:1,
        marginLeft:'auto',
        marginRight:'auto',
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
    },
    avatarGoogleContainer: {
        flexDirection:"row"
    }
});