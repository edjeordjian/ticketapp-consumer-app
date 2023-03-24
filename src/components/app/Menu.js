import React, {useEffect, useState} from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeScreen} from "../../screens/home/HomeScreen";
import {Exit} from "./Exit";

const Drawer = createDrawerNavigator();

const Menu = () => {
    return (
        <Drawer.Navigator
            initialRouteName={"HomeScreen"}>
            <Drawer.Screen name="HomeScreen"
                           component={HomeScreen}/>

            <Drawer.Screen name='Salir'
                           component={Exit}/>
        </Drawer.Navigator>
    )
}

export default Menu;
