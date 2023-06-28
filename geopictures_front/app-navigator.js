import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccueilContainer from "./src/features/accueil/containers/accueil.container";
import { Text, TouchableOpacity, View } from "react-native";
import {FontAwesome, MaterialCommunityIcons} from "@expo/vector-icons";
import ProfilContainer from "./src/features/profil/containers/profil.container";
import RegionsContainer from "./src/features/region/containers/regions.container";
import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ZoneContainer from "./src/features/zone/container/zone.container";
import PhotoContainer from "./src/features/photo/containers/photo.container";
import ImageZoom from "./src/commons/component/image-zoom.component";
import JeuContainer from "./src/features/jeu/containers/jeu.container";
import BoutiqueContainer from "./src/features/boutique/containers/boutique.container";
import ChargementContainer from "./src/features/chargement/chargement.container";
import AuthentificationContainer from "./src/features/authentification/containers/authentification.container";
import CreationContainer from "./src/features/creation/containers/creation.container";
import CollaborationContainer from "./src/features/collaboration/containers/collaboration.container";
import ClassementContainer from "./src/features/classement/containers/classement.container";
import {primary1} from "./src/commons/styles/commons.styles";
import MesDemandesContainer from "./src/features/mes-demandes/containers/mes-demandes.container";
import AdministrationDemandesContainer from "./src/features/administration/containers/administration-demandes.container";
import AdministrationProfilsContainer from "./src/features/administration/containers/administration-profils.container";

const screenOption = {
    statusBarColor:"black",
    navigationBarHidden: true,
    headerShown: false,
    tabBarActiveTintColor: "white",
    tabBarActiveBackgroundColor: primary1,
    tabBarStyle: {
        height: 60,
    },
    tabBarIconStyle: {
        marginTop: 5
    },
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
        tabBarIcon: ({ focused, color, size }) => (
            <View>
                <FontAwesome  name={iconName} color={color} size={size}/>
            </View>
        ),
        tabBarLabel: ({ focused, color }) => (
            focused ? <Text style={{marginBottom:10, fontWeight:"bold", fontSize:10, color:color}}>{tabName}</Text> : <></>
        ),
        unmountOnBlur: true
    }
}

const AppNavigator = () => {
    return (
        <AppStack.Navigator
            initialRouteName={"chargement"}
            screenOptions={screenOption}>
            <AppStack.Screen name="chargement" component={ChargementContainer}/>
            <AppStack.Screen name="authentification" component={AuthentificationContainer}/>
            <AppStack.Screen name="creation" component={CreationContainer}/>
            <AppStack.Screen name="accueil" component={TabsStackScreen}/>
            <AppStack.Screen name="selectRegion" component={RegionsContainer}/>
            <AppStack.Screen name="zones" component={ZoneContainer}/>
            <AppStack.Screen name="photos" component={PhotoContainer}/>
            <AppStack.Screen name="imageZoom" component={ImageZoom}/>
            <AppStack.Screen name="jeu" component={JeuContainer}/>
        </AppStack.Navigator>
    )
}

const TabsStackScreen = () => {
    return (
        <TabStack.Navigator
            initialRouteName={"accueil-stack"}
            screenOptions={screenOption}>
            <TabStack.Screen name="boutique" component={BoutiqueStackScreen} options={getTabBarView("shopping-cart", "Boutique")}/>
            <TabStack.Screen name="profil" component={ProfilStackScreen} options={getTabBarView("user", "Profil")}/>
            <TabStack.Screen name="accueil-stack" component={AccueilStackScreen} options={getTabBarView("home", "Accueil")}/>
            <TabStack.Screen name="classement" component={ClassementStackScreen} options={getTabBarView("star", "Classement")}/>
            <TabStack.Screen name="collaboration" component={CollaborationStackScreen} options={getTabBarView("plus", "Collaboration")}/>
        </TabStack.Navigator>
    )
}

function BoutiqueStackScreen() {
    return (
        <BoutiqueStack.Navigator initialRouteName={"boutique-container"} screenOptions={screenOption}>
            <BoutiqueStack.Screen name="boutique-container" component={BoutiqueContainer} />
        </BoutiqueStack.Navigator>
    );
}

function AccueilStackScreen() {
    return (
        <AccueilStack.Navigator  initialRouteName={"accueil-container"} screenOptions={screenOption}>
            <AccueilStack.Screen name="accueil-container" component={AccueilContainer}/>
        </AccueilStack.Navigator>
    );
}

function CollaborationStackScreen() {
    return (
        <CollaborationStack.Navigator  initialRouteName={"mes-demandes-container"} screenOptions={screenOption}>
            <CollaborationStack.Screen name="collaboration-container" component={CollaborationContainer} />
            <CollaborationStack.Screen name="mes-demandes-container" component={MesDemandesContainer} />
            <CollaborationStack.Screen name="administration-container" component={AdministrationDemandesContainer} />
            <CollaborationStack.Screen name="administration-demandes-container" component={AdministrationDemandesContainer} />
            <CollaborationStack.Screen name="administration-profils-container" component={AdministrationProfilsContainer} />
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