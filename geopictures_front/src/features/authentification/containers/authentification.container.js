import Authentification from "../components/authentification.component";
import * as React from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { getUserData } from "../services/authentification.service";

WebBrowser.maybeCompleteAuthSession();

export default function AuthentificationContainer() {
    
    const [accessToken, setAccessToken] = React.useState();
    const [userInfo, setUserInfo] = React.useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "549351708019-q9d71fkan3u185bfsg1b3j2svg9ccpob.apps.googleusercontent.com",
    iosClientId: "549351708019-ggoc5m3p20e8begl25tl1a87v7c1v3uo.apps.googleusercontent.com",
    androidClientId: "549351708019-hhbd8evh0vbj1os4577p2e9jguruotil.apps.googleusercontent.com"
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      setAccessToken(response.authentication.accessToken)
      accessToken && getUserData(accessToken, setUserInfo);
    }
  }, [response, accessToken]);
  
  
    return(
        <>
            <Authentification accessToken={accessToken} promptAsync={promptAsync} getUserData={getUserData}/>
        </>
    )
}