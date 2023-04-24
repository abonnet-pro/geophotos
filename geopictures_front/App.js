import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthentificationContainer from "./src/features/authentification/containers/authentification.container";
import AccueilContainer from "./src/features/accueil/containers/accueil.container";
import ChargementContainer from "./src/features/chargement/chargement.container";
import FranceSelectRegion from "./src/commons/component/france-select-region.component";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, statusBarHidden: true, navigationBarHidden: true }} initialRouteName="chargement">
          <Stack.Screen name="chargement" component={ChargementContainer} />
          <Stack.Screen name="authentification" component={AuthentificationContainer} />
          <Stack.Screen name="accueil" component={AccueilContainer} />
          <Stack.Screen name="selectRegion" component={FranceSelectRegion} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}
