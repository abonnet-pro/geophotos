import { RootSiblingParent } from 'react-native-root-siblings';

import { NavigationContainer } from '@react-navigation/native';
import {useEffect} from "react";
import {BackHandler, StatusBar} from "react-native";
import ModalUseGadgetGps from "./src/features/jeu/modals/modal-use-gadget-gps.component";
import { ModalProvider, createModalStack } from 'react-native-modalfy';
import  ModalInfoSuccessGps  from "./src/commons/modals/modal-info-success-gps.component";
import ModalClassementPhoto from "./src/commons/modals/modal-classement-photo.component";
import ModalCarteVisiteClassement from "./src/commons/modals/modal-carte-visite-classement.component"
import  ModalInfoSuccessGlobale  from "./src/commons/modals/modal-info-success-global.component";
import ModalInfoDroitCamera from "./src/commons/modals/modal-info-droit-camera.component";
import ModalInfoDroitLocation from "./src/commons/modals/modal-info-droit-location.component";
import ModalUseGadgetDistance from "./src/features/jeu/modals/modal-use-gadget-distance.component";
import ModalUseGadgetDirection from "./src/features/jeu/modals/modal-use-gadget-direction.component";
import ModalUseGadgetSuccesGps from "./src/features/jeu/modals/modal-use-gadget-succes-gps.component";
import ModalLoading from "./src/commons/modals/modal-loading.component";
import ModalUseGadgetTop1 from "./src/features/jeu/modals/modal-use-gadget-top-1.component";
import ModalUseGadgetIndice from "./src/features/jeu/modals/modal-use-gadget-indice.component";
import ModalChoixValid from "./src/commons/modals/modal-choix-valid.component";
import ModalInfoGadget from "./src/features/profil/modals/modal-info-gadget.component";
import AppNavigator from "./app-navigator";
import ModalInfosDemande from "./src/features/mes-demandes/modals/modal-infos-demande.component";

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
  ModalChoixValid,
  ModalClassementPhoto,
  ModalCarteVisiteClassement,
  ModalInfoGadget,
  ModalInfosDemande
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
          <StatusBar hidden={true}/>
          <AppNavigator/>
        </NavigationContainer>
      </ModalProvider>
    </RootSiblingParent>
    );
}
