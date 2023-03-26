import React from "react";

import {View} from 'react-native';

import {HomeScreen} from "../../screens/home/HomeScreen";

import Menu from "../../components/app/Menu";

import {HomeStackStyles} from "../../styles/app/HomeStackStyles";

import {createNativeStackNavigator} from "@react-navigation/native-stack";

const HomeStackNav = createNativeStackNavigator();

export default function HomeStack() {
    return (
        <View style={HomeStackStyles.container}>
            <HomeStackNav.Navigator style={HomeStackStyles.homeStack}
                                    screenOptions={ {
                                        headerShown: false
                                    } }>
                <HomeStackNav.Screen name='Menu'
                                     component={Menu} />

                <HomeStackNav.Screen name="Inicio"
                                     component={HomeScreen} />
            </HomeStackNav.Navigator>
        </View>
    );
};
