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

const Stack = createNativeStackNavigator();

export default function App() {
    return (
    <RootSiblingParent>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, statusBarHidden: true, navigationBarHidden: true }} initialRouteName="chargement">
          <Stack.Screen name="chargement" component={ChargementContainer} />
          <Stack.Screen name="authentification" component={AuthentificationContainer} />
          <Stack.Screen name="accueil" component={AccueilContainer} />
          <Stack.Screen name="selectRegion" component={RegionsContainer} />
          <Stack.Screen name="zones" component={ZoneContainer} />
          <Stack.Screen name="photos" component={PhotoContainer} />
          <Stack.Screen name="imageZoom" component={ImageZoom} />
        </Stack.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
    );
}
