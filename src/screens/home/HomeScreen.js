import React from "react";

import {View} from 'react-native';

import {Text} from "react-native-paper";

import {homeText} from "../../styles/home/homeStyles";

const HomeScreen = () => {
    return (
            <View style={{backgroundColor: '#f5f5f5',
                paddingTop: 10}}>
                <Text style={homeText}>Inicio
                </Text>
            </View>
    );
};

export {
    HomeScreen
};
