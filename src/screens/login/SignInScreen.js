import React, {useState} from "react";

import {View, Image, ScrollView, TextInput, Text} from 'react-native';

import {SignInStyle} from "../../styles/login/SignInStyle";

import signInImage from "../../../assets/login/default.png";

import {BlankLine} from "../../components/app/BlankLine";

import SignInGoogleButton from "../../components/login/SignInGoogleButton";

const SignInScreen = ({navigation}) => {
    return(
        <View style={SignInStyle.container}>
            <ScrollView showsVerticalScrollIndicator={false}
                        style={ {flex: 4} }>
                <View style={{flex: 2}}>
                    <Image source={signInImage}
                           style={SignInStyle.image}/>
                </View>

                <BlankLine/>

                <View style={{flex: 1}}>
                    <SignInGoogleButton navigation={navigation}/>
                </View>
            </ScrollView>
        </View>
    );
};

export {
    SignInScreen
};
