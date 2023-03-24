import React, {useState} from "react";

import { View, Image, ScrollView, SafeAreaView } from 'react-native';

import {SignInStyle} from "../../styles/login/SignInStyle";

import signInImage from "../../../assets/login/default.png";

const firebaseAuth = require("firebase/auth");

const SignInScreen = () => {
    return(
        <View style={SignInStyle.container}>
            <ScrollView showsVerticalScrollIndicator={false}
                        style={ {flex: 4} }>
                <View style={{flex: 1}}>
                    <Image source={signInImage}
                           style={SignInStyle.image}/>
                </View>
            </ScrollView>
        </View>
    );
};

export {
    SignInScreen
};
