import { RootSiblingParent } from 'react-native-root-siblings';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthentificationContainer from "./src/features/authentification/containers/authentification.container";
import AccueilContainer from "./src/features/accueil/containers/accueil.container";
import ChargementContainer from "./src/features/chargement/chargement.container";
import RegionsContainer from "./src/features/region/containers/regions.container";
import ZoneContainer from "./src/features/zone/container/zone.container";
import PhotoContainer from "./src/features/photo/containers/photo.container";
import ImageZoom from "./src/commons/component/image-zoom.component";
import JeuContainer from "./src/features/jeu/containers/jeu.container";
import {StatusBar} from "expo-status-bar";
import {useEffect} from "react";
import {BackHandler} from "react-native";
import ModalUseGadgetGps from "./src/commons/modals/modal-use-gadget-gps.component";
import { ModalProvider, createModalStack } from 'react-native-modalfy';
import  ModalInfoSuccessGps  from "./src/commons/modals/modal-info-success-gps.component";
import  ModalInfoSuccessGlobale  from "./src/commons/modals/modal-info-success-global.component";
import ModalInfoDroitCamera from "./src/commons/modals/modal-info-droit-camera.component";
import ModalInfoDroitLocation from "./src/commons/modals/modal-info-droit-location.component";
import CreationContainer from "./src/features/creation/containers/creation.container";
import ModalUseGadgetDistance from "./src/commons/modals/modal-use-gadget-distance.component";
import ModalUseGadgetDirection from "./src/commons/modals/modal-use-gadget-direction.component";
import ModalUseGadgetSuccesGps from "./src/commons/modals/modal-use-gadget-succes-gps.component";
import ModalLoading from "./src/commons/modals/modal-loading.component";
import ModalUseGadgetTop1 from "./src/commons/modals/modal-use-gadget-top-1.component";
import ModalUseGadgetIndice from "./src/commons/modals/modal-use-gadget-indice.component";
import ModalChoixValid from "./src/commons/modals/modal-choix-valid.component";

const Stack = createNativeStackNavigator();

const modalConfig = {
  ModalInfoSuccessGps,
  ModalInfoSuccessGlobale,
  ModalInfoDroitCamera,
  ModalInfoDroitLocation,
  ModalUseGadgetGps,
  ModalUseGadgetDistance,
  ModalUseGadgetDirection,
  ModalUseGadgetSuccesGps,
  ModalLoading,
  ModalUseGadgetTop1,
  ModalUseGadgetIndice,
  ModalChoixValid: ModalChoixValid
}

const stack = createModalStack(modalConfig, {backdropOpacity: 0.6});

export default function App() {

  const init = () => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
  }

  useEffect(init, []);

    return (
    <RootSiblingParent>
      <ModalProvider stack={stack}>
        <NavigationContainer>
          <StatusBar hidden/>
            <Stack.Navigator screenOptions={{ headerShown: false, navigationBarHidden: true }} initialRouteName="chargement">
              <Stack.Screen name="chargement" component={ChargementContainer} />
              <Stack.Screen name="authentification" component={AuthentificationContainer} />
              <Stack.Screen name="creation" component={CreationContainer} />
              <Stack.Screen name="accueil" component={AccueilContainer} />
              <Stack.Screen name="selectRegion" component={RegionsContainer} />
              <Stack.Screen name="zones" component={ZoneContainer} />
              <Stack.Screen name="photos" component={PhotoContainer} />
              <Stack.Screen name="imageZoom" component={ImageZoom} />
              <Stack.Screen name="jeu" component={JeuContainer} />
            </Stack.Navigator>
        </NavigationContainer>
      </ModalProvider>
    </RootSiblingParent>
    );
}
