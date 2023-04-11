import {useMainContext} from "../../services/contexts/MainContext";

import React, {useEffect, useState} from 'react'

import {View} from 'react-native';

export default function Exit() {
    const {logOut} = useMainContext();

    useEffect( () => {
        logOut();
    }, [] );

    return (
        <View>
        </View>
    );
};
