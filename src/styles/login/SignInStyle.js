import * as GenericStyles from "../general/GenericStyles";

import {StyleSheet} from "react-native";

const signInScreenContainer = {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 80,
    paddingLeft: 80,
};

const SignInStyle = StyleSheet.create( {
    input: GenericStyles.input,
    container: signInScreenContainer,
    title: GenericStyles.title,
    secondaryButtonStyle: GenericStyles.secondaryButtonStyle,
    button: GenericStyles.button,
    buttonText: GenericStyles.buttonText,
    secondaryButtonText: GenericStyles.secondaryButtonText,
    image: GenericStyles.image,
    imageContainer: GenericStyles.imageContainer
} );

export {
  SignInStyle
};
