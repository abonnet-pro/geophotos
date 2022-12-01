import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthentificationContainer from "./src/features/authentification/containers/authentification.container";
import AccueilContainer from "./src/features/accueil/containers/accueil.container";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="authentification">
          <Stack.Screen name="authentification" component={AuthentificationContainer} />
          <Stack.Screen name="accueil" component={AccueilContainer} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}
