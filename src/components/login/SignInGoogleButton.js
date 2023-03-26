import {View, Text} from 'react-native';

import React, {useEffect} from 'react'

import {Button} from 'react-native-paper'

import * as Google from 'expo-auth-session/providers/google';

import {useMainContext} from "../../services/contexts/MainContext";

import {BACKEND_HOST} from "../../constants/generalConstants";

import {SIGN_IN_URL} from "../../constants/URLs";

import {postTo} from "../../services/helpers/RequestService";

import {ANDROID_KEY, EXPO_ID, WEB_KEY} from "../../constants/dataConstants";

import {GOOGLE_AUTH_ERR_LBL, GOOGLE_LOG_IN_LBL} from "../../constants/logIn/logInConstants";

import {getFirebaseUserData} from "../../services/helpers/FirebaseService";

const SignInWithGoogle = (props) => {
  const {logIn} = useMainContext();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_KEY,
    webClientId: WEB_KEY,
    expoClientId: EXPO_ID
  });

  let handleSignInWithGoogle = async (googleAuth) => {
    const userData = await getFirebaseUserData(googleAuth);

    const requestBody = {
      token: googleAuth.accessToken,

      id: userData.id,

      email: userData.email,

      firstName: userData.given_name,

      lastName: userData.family_name,

      pictureUrl: userData.picture,

      isOrganizer: true
    };

    postTo(`${BACKEND_HOST}${SIGN_IN_URL}`, requestBody).then((res) => {
      if (res.error !== undefined || res.id !== userData.id) {
        alert(res.error);

        return
      }

      logIn({
        token: googleAuth.accessToken,

        id: userData.id,

        email: userData.email,

        firstName: userData.given_name
      });
    });
  };

  useEffect(() => {
    if (response?.type === 'success') {
      const {authentication} = response;

      handleSignInWithGoogle(authentication).catch(e => {
          alert(GOOGLE_AUTH_ERR_LBL);
        });
    }
  }, [response]);

  return (
    <View>
      <Button
        icon='google'
        mode="contained"
        disabled={!request}
        onPress={() => promptAsync()}
        style={{marginBottom: 10,
                marginTop: 30,
                marginRight: 75,
                borderRadius: 20}}>

        <Text>{GOOGLE_LOG_IN_LBL}</Text>
      </Button>
    </View>
  );
}

export default SignInWithGoogle;
