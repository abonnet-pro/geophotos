import {ImageBackground, ScrollView, StyleSheet, View} from "react-native";
import {BACKGROUND_ASSETS} from "../../../utils/store.utils";
import * as React from "react";
import MaterialTabs from "react-native-material-tabs";
import {useState} from "react";
import AvatarsList from "./avatars-list.component";
import BorduresList from "./bordures-list.component";
import TitresList from "./titres-list.component";
import GadgetsList from "./gadgets-list.component";

export default function Inventaire({ profil, onSaveAvatar, onSaveBordure, onSaveTitre, navigation }) {

    const [selectedTab, setSelectedTab] = useState(0);
    const items = ['Avatars', 'Bordures', 'Titres', 'Gadgets'];

    return(
        <>
            <ImageBackground
                source={ BACKGROUND_ASSETS.bordure } style={{ padding:5 }} borderRadius={20}>
                <ImageBackground source={ BACKGROUND_ASSETS.background } borderRadius={20}>
                    <View style={ style.inventaireContainer }>
                        <MaterialTabs
                            items={items}
                            activeTextStyle={style.active}
                            textStyle={style.tabs}
                            selectedIndex={selectedTab}
                            onChange={setSelectedTab}
                            uppercase={false}
                            barColor="transparent"
                            indicatorColor="black"
                        />

                        <View style={style.listContainer}>
                            <ScrollView style={ style.scrollViewContainer } showsVerticalScrollIndicator={false}>
                                <View style={ style.wrapView }>
                                    { selectedTab === 0 && <AvatarsList avatars={profil?.mesAvatars} avatarActif={profil?.avatarActif} onSaveAvatar={onSaveAvatar}></AvatarsList>}
                                    { selectedTab === 1 && <BorduresList bordures={profil?.mesBordures} onSaveBordure={onSaveBordure}></BorduresList>}
                                    { selectedTab === 2 && <TitresList titres={profil?.mesTitres} onSaveTitre={onSaveTitre}></TitresList>}
                                    { selectedTab === 3 && <GadgetsList navigation={navigation} gadgets={profil?.mesGadgets}></GadgetsList>}
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </ImageBackground>
            </ImageBackground>
        </>
    )
}

const style = StyleSheet.create({
    inventaireContainer: {
        height:"100%",
    },
    tabs: {
        fontWeight:'bold',
        color:'#6e6d6d'
    },
    active: {
        fontSize:15,
        color:'black'
    },
    listContainer: {
        marginTop:15,
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
    }
})