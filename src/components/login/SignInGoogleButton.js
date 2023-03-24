import {View,
        Text} from 'react-native';

import React, {useEffect} from 'react'

import {Button} from 'react-native-paper'

import * as Google from 'expo-auth-session/providers/google';

import {useMainContext} from "../../services/contexts/MainContext";

import {BACKEND_HOST} from "../../constants/generalConstants";

import {SIGN_IN_URL} from "../../constants/URLs";

import {postTo} from "../../services/helpers/RequestService";

import {ANDROID_KEY} from "../../constants/dataConstants";

const {getAuth, signInWithCredential, GoogleAuthProvider} = require("firebase/auth");

const SignInWithGoogle = (props) => {

  const {signIn} = useMainContext();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_KEY
  });

  let handleSignInWithGoogle = async (googleAuth) => {
    const credential = GoogleAuthProvider.credential(googleAuth.idToken, googleAuth.accessToken);

    const auth = getAuth();

    const response = await signInWithCredential(auth, credential).catch(err => alert(err));

    if (response.user === undefined) {
      alert("No pudo autenticarse al usuario con Google");
      return;
    }

    const requestBody = {
      token: response._tokenResponse.idToken,

      id: response.user.uid,

      email: response._tokenResponse.email,

      firstName: response._tokenResponse.firstName,

      lastName: response._tokenResponse.lastName,

      isNew: response._tokenResponse.isNewUser,

      link: "mobile"
    };

    postTo(`${BACKEND_HOST}${SIGN_IN_URL}`, requestBody).then((res) => {
      if (res.error === undefined) {
        signIn(response._tokenResponse.idToken, response.user.uid);
      } else {
        alert(res.error);
      }
    });
  };

  useEffect(() => {
    if (response?.type === 'success') {
      props.setIsLoading(true);
      const {authentication} = response;
      handleSignInWithGoogle(authentication)
        .catch(e => {
          props.setIsLoading(false);
          alert(`Error al autenticarse con google: ${JSON.stringify(e)}`);
        });
    };
  }, [response]);

  return (
    <View>
      <Button
        icon='google'
        mode="contained"
        disabled={!request}
        onPress={() => promptAsync()}
        style={{marginBottom: 10, marginTop: 30, borderRadius: 20}}>

        <Text>Ingrese con Google</Text>
      </Button>
    </View>
  );
}

export default SignInWithGoogle;
