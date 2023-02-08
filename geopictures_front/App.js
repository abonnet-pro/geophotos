import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthentificationContainer from "./src/features/authentification/containers/authentification.container";
import AccueilContainer from "./src/features/accueil/containers/accueil.container";
import ChargementContainer from "./src/features/chargement/chargement.container";
import RegionsContainer from "./src/features/region/containers/regions.container";
import ZoneContainer from "./src/features/zone/container/zone.container";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, statusBarHidden: true, navigationBarHidden: true }} initialRouteName="chargement">
          <Stack.Screen name="chargement" component={ChargementContainer} />
          <Stack.Screen name="authentification" component={AuthentificationContainer} />
          <Stack.Screen name="accueil" component={AccueilContainer} />
          <Stack.Screen name="selectRegion" component={RegionsContainer} />
          <Stack.Screen name="zones" component={ZoneContainer} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}
