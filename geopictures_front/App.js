import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button, Image } from "react-native";
import {
  Box,
  Heading,
  AspectRatio,
  Text,
  Center,
  HStack,
  Stack,
  NativeBaseProvider,
} from "native-base";
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';

WebBrowser.maybeCompleteAuthSession();

export default function App() {

  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "549351708019-q9d71fkan3u185bfsg1b3j2svg9ccpob.apps.googleusercontent.com",
    
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      setAccessToken(response.authentication.accessToken)
      accessToken && getUserData();
    }
  }, [response, accessToken]);

  async function getUserData() {
    let userInfoReponse = await fetch("https://www.googleapis.com/userinfo/v2/me" , {
      headers:  { Authorization: `Bearer ${accessToken}` }
    })
    const useInfo = await userInfoReponse.json();
    setUserInfo(useInfo)
    
    console.log(useInfo.email)
  }

  function showUserInfo() {
    if(userInfo) {
      return (
        <>
        <View>
          <Image source={{uri: userInfo.picture}} alt='profil' />
          <Text>Bonjour {userInfo.name}</Text>
          <Text>Votre mail {userInfo.email}</Text>
        </View>
        </>
      )
    }
    else {
      return (
        <Text>Test</Text>
      )
    }
  }
  
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        {showUserInfo()}
        <Button 
        title={accessToken ? "Get info" : "Login"}
        onPress={accessToken ? getUserData : () => { promptAsync({showInRecents : true})}}
    />
      </Center>
    </NativeBaseProvider>
  );
}
