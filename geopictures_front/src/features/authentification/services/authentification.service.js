import { save, TOKEN_GOOGLE, USER_GOOGLE } from "../../../utils/store.utils";

export async function getUserData (accessToken) {
    let userInfoReponse = await fetch("https://www.googleapis.com/userinfo/v2/me" , {
      headers:  { Authorization: `Bearer ${accessToken}` }
    })
    const userInfo = await userInfoReponse.json();
    await save(TOKEN_GOOGLE, accessToken);
    await save(USER_GOOGLE, userInfo);
  }