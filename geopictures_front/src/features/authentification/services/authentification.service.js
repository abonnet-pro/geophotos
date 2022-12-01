import { getValueFor, save, TOKEN_GOOGLE, USER_GOOGLE } from "../../../utils/store.utils";

export async function getUserData (accessToken, setUserInfo) {
    let userInfoReponse = await fetch("https://www.googleapis.com/userinfo/v2/me" , {
      headers:  { Authorization: `Bearer ${accessToken}` }
    })
    const userInfo = await userInfoReponse.json();
    setUserInfo(userInfo)
    await save(TOKEN_GOOGLE, accessToken);
    await save(USER_GOOGLE, JSON.stringify(userInfo));
  }