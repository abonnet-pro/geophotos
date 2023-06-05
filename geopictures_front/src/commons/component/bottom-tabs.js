import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccueilContainer from "../../features/accueil/containers/accueil.container";
import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import ProfilContainer from "../../features/profil/containers/profil.container";
import RegionsContainer from "../../features/region/containers/regions.container";
import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ZoneContainer from "../../features/zone/container/zone.container";
import PhotoContainer from "../../features/photo/containers/photo.container";
import ImageZoom from "./image-zoom.component";
import JeuContainer from "../../features/jeu/containers/jeu.container";
import BoutiqueContainer from "../../features/boutique/containers/boutique.container";
import ChargementContainer from "../../features/chargement/chargement.container";
import AuthentificationContainer from "../../features/authentification/containers/authentification.container";
import CreationContainer from "../../features/creation/containers/creation.container";
import CollaborationContainer from "../../features/collaboration/containers/collaboration.container";
import ClassementContainer from "../../features/classement/containers/classement.container";

const screenOption = {
    navigationBarHidden: true,
    headerShown: false,
    tabBarStyle: {
        position: "absolute",
        bottom: 25,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: "white",
        borderRadius: 15,
        height: 90
    }
};

const AppStack = createNativeStackNavigator();
const TabStack = createBottomTabNavigator();
const AccueilStack = createNativeStackNavigator();
const BoutiqueStack = createNativeStackNavigator();
const CollaborationStack = createNativeStackNavigator();
const ClassementStack = createNativeStackNavigator();
const ProfilStack = createNativeStackNavigator();

function getTabBarView(iconName, tabName) {
    return {
        tabBarIcon: ({}) => (
            <View style={{alignItems: "center", justifyContent: "center"}}>
                <FontAwesome name={iconName} size={35} color="black" />
                <Text style={{fontSize: 9}}>{tabName}</Text>
            </View>
        ),
        tabBarLabel: "",
    }
}

function getTabBarViewCenter({navigation}) {
    return (
        {
            tabBarLabel: "",
            tabBarButton: () => (
                <TouchableOpacity onPress={() => navigation.navigate("collaboration")} style={{
                    top: -30,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <View style={{
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                        backgroundColor: '#005202'
                    }}>
                        <FontAwesome name="plus" size={45} color="white" style={{
                            justifyContent: "center",
                            alignItems: "center",
                            top: 14,
                            left: 17
                        }}/>
                    </View>
                </TouchableOpacity>
            )
        }
    )
}

const AppNavigator = () => {
    return (
        <AppStack.Navigator
            initialRouteName={"chargement"}
            screenOptions={{navigationBarHidden: true, headerShown: false}}>
            <TabStack.Screen name="chargement" component={ChargementContainer}/>
            <TabStack.Screen name="authentification" component={AuthentificationContainer}/>
            <TabStack.Screen name="creation" component={CreationContainer}/>
            <TabStack.Screen name="accueil" component={TabsStackScreen}/>
        </AppStack.Navigator>
    )
}

const TabsStackScreen = () => {
    return (
        <TabStack.Navigator
            initialRouteName={"accueil-stack"}
            screenOptions={screenOption}>
            <TabStack.Screen name="boutique" component={BoutiqueStackScreen} options={getTabBarView("shopping-cart", "BOUTIQUE")}/>
            <TabStack.Screen name="accueil-stack" component={AccueilStackScreen} options={getTabBarView("home", "ACCUEIL")}/>
            <TabStack.Screen name="collaboration" component={CollaborationStackScreen} options={getTabBarViewCenter}/>
            <TabStack.Screen name="classement" component={ClassementStackScreen} options={getTabBarView("star", "CLASSEMENT")}/>
            <TabStack.Screen name="profil" component={ProfilStackScreen} options={getTabBarView("user", "PROFIL")}/>
        </TabStack.Navigator>
    )
}

function BoutiqueStackScreen() {
    return (
        <BoutiqueStack.Navigator  initialRouteName={"boutique-container"} screenOptions={screenOption}>
            <BoutiqueStack.Screen name="boutique-container" component={BoutiqueContainer} />
        </BoutiqueStack.Navigator>
    );
}

function AccueilStackScreen() {
    return (
        <AccueilStack.Navigator  initialRouteName={"accueil-container"} screenOptions={screenOption}>
            <AccueilStack.Screen name="accueil-container" component={AccueilContainer} />
            <AccueilStack.Screen name="selectRegion" component={RegionsContainer} />
            <AccueilStack.Screen name="zones" component={ZoneContainer} />
            <AccueilStack.Screen name="photos" component={PhotoContainer} />
            <AccueilStack.Screen name="imageZoom" component={ImageZoom} />
            <AccueilStack.Screen name="jeu" component={JeuContainer} />
        </AccueilStack.Navigator>
    );
}

function CollaborationStackScreen() {
    return (
        <CollaborationStack.Navigator  initialRouteName={"collaboration-container"} screenOptions={screenOption}>
            <CollaborationStack.Screen name="collaboration-container" component={CollaborationContainer} />
        </CollaborationStack.Navigator>
    );
}

function ClassementStackScreen() {
    return (
        <ClassementStack.Navigator  initialRouteName={"classement-container"} screenOptions={screenOption}>
            <ClassementStack.Screen name="classement-container" component={ClassementContainer} />
        </ClassementStack.Navigator>
    );
}

function ProfilStackScreen() {
    return (
        <ProfilStack.Navigator  initialRouteName={"profil-container"} screenOptions={screenOption}>
            <ProfilStack.Screen name="profil-container" component={ProfilContainer} />
        </ProfilStack.Navigator>
    );
}

export default AppNavigator;