import {Text} from 'react-native';
import React, {useEffect} from 'react'
import {Button} from 'react-native-paper'
import * as Google from 'expo-auth-session/providers/google';
import {useMainContext} from "../services/contexts/MainContext";
import {EXPO_ID, ANDROID_ID, WEB_KEY} from "../constants/dataConstants";
import {GOOGLE_AUTH_ERR_LBL, GOOGLE_LOG_IN_ERR_LBL, GOOGLE_LOG_IN_LBL} from "../constants/logIn/logInConstants";
import {getFirebaseUserData} from "../services/helpers/FirebaseService";
import apiClient from '../services/apiClient';

export default function SignInWithGoogle(props) {
  const {logIn} = useMainContext();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_ID,
    expoClientId: EXPO_ID
  });

  const handleSignInWithGoogle = async (googleAuth) => {
    const userData = await getFirebaseUserData(googleAuth);

    const requestBody = {
      token: googleAuth.accessToken,
      id: userData.id,
      email: userData.email,
      firstName: userData.given_name,
      lastName: userData.family_name,
      pictureUrl: userData.picture,
      isConsumer: true
    };

    // await logIn({
    //   token: googleAuth.accessToken,
    //   id: userData.id,
    //   email: userData.email,
    //   firstName: userData.given_name
    // });

    const onResponse = (res) => {
      logIn({
        token: googleAuth.accessToken,
        id: userData.id,
        email: userData.email,
        firstName: userData.given_name
      });
    }

    const onError = (_error) => {
      console.log(_error.response);
      console.log(_error.request);
      console.log(_error.message);
      let error = _error.toString();
      if (_error !== undefined || _error.id !== userData.id) {
        alert(error);
      }
    }

    const client = new apiClient();
    client.logIn(requestBody, onResponse, onError);
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
      <Button
          icon='google'
          mode="contained"
          disabled={!request}
          onPress={() => promptAsync()}
          style={{borderRadius: 20, marginTop: 5}}
      >
        <Text style={{color: 'white'}}>{GOOGLE_LOG_IN_LBL}</Text>
      </Button>
  );
}