import { StyleSheet, View } from 'react-native';
import AuthentificationContainer from "./src/features/authentification/containers/authentification.container";

export default function App() {
  return (
    <View style={styles.container}>
      <AuthentificationContainer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
