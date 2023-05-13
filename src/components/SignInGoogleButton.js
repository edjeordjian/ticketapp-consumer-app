import {Text} from 'react-native';
import React, {useEffect} from 'react'
import {Button} from 'react-native-paper'
import * as Google from 'expo-auth-session/providers/google';
import {useMainContext} from "../services/contexts/MainContext";
import {EXPO_ID, ANDROID_ID, WEB_KEY} from "../constants/dataConstants";
import {GOOGLE_AUTH_ERR_LBL, GOOGLE_LOG_IN_ERR_LBL, GOOGLE_LOG_IN_LBL} from "../constants/logIn/logInConstants";
import {getFirebaseUserData} from "../services/helpers/FirebaseService";
import apiClient from '../services/apiClient';
import AwesomeAlert from "react-native-awesome-alerts";

export default function SignInWithGoogle(props) {
  const {logIn, getToken} = useMainContext();

  const [showAlert, setShowAlert] = React.useState(false);

  const [alertText, setAlertText] = React.useState("");

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_ID,
    expoClientId: EXPO_ID
  });

  const handleSignInWithGoogle = async (googleAuth) => {
    const userData = await getFirebaseUserData(googleAuth);

    const token = await getToken();

    const requestBody = {
      token: googleAuth.accessToken,
      id: userData.id,
      email: userData.email,
      firstName: userData.given_name,
      lastName: userData.family_name,
      pictureUrl: userData.picture,
      isConsumer: true,
      expoToken: token
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
        firstName: userData.given_name,
        lastName: userData.family_name
      });
    }

    const onError = (_error) => {
      console.log(_error.response);

      console.log(_error.request);

      console.log(_error.message);

      setAlertText(_error.response.data.error);

      setShowAlert(true);
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

  const hideAlert = () => {
    setShowAlert(false);
  }

  return (
      <>
      <Button
          icon='google'
          mode="contained"
          disabled={!request}
          onPress={() => promptAsync()}
          style={{borderRadius: 20, marginTop: 5}}
      >
        <Text style={{color: 'white'}}>{GOOGLE_LOG_IN_LBL}</Text>
      </Button>

    <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={alertText}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Aceptar"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={hideAlert}
    />
    </>
  );
}