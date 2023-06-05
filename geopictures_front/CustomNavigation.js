import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChargementContainer from "./src/features/chargement/chargement.container";
import AuthentificationContainer from "./src/features/authentification/containers/authentification.container";
import CreationContainer from "./src/features/creation/containers/creation.container";
import AccueilContainer from "./src/features/accueil/containers/accueil.container";
import RegionsContainer from "./src/features/region/containers/regions.container";
import ZoneContainer from "./src/features/zone/container/zone.container";
import PhotoContainer from "./src/features/photo/containers/photo.container";
import ImageZoom from "./src/commons/component/image-zoom.component";
import JeuContainer from "./src/features/jeu/containers/jeu.container";
import ProfilContainer from "./src/features/profil/containers/profil.container";

const Stack = createNativeStackNavigator();

const HomeScreenNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, navigationBarHidden: false }} initialRouteName="chargement">
        <Stack.Screen name="chargement" component={ChargementContainer} />
        <Stack.Screen name="authentification" component={AuthentificationContainer} />
        <Stack.Screen name="creation" component={CreationContainer} />
        <Stack.Screen name="accueil" component={AccueilContainer} />
        <Stack.Screen name="selectRegion" component={RegionsContainer} />
        <Stack.Screen name="zones" component={ZoneContainer} />
        <Stack.Screen name="photos" component={PhotoContainer} />
        <Stack.Screen name="imageZoom" component={ImageZoom} />
        <Stack.Screen name="jeu" component={JeuContainer} />
        <Stack.Screen name="profil" component={ProfilContainer} />
      </Stack.Navigator>
    );
  }
  
  export {HomeScreenNavigator};