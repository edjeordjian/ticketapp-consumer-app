import * as React from 'react';
import {View} from 'react-native';
import {HomeScreen} from "../../screens/home/HomeScreen";
import {HomeStackStyles} from "../../styles/app/HomeStackStyles";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import Events from "../../screens/Events";
import EventInfo from "../../screens/EventInfo";

const Tab = createBottomTabNavigator();

//Screen names
const detailsName = "EventsList";
const settingsName = "SeeEvent";

export default function HomeStack() {
    return (
        <Tab.Navigator
                initialRouteName={detailsName}
                screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarStyle:{backgroundColor: '#F4F4F4'},
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === detailsName) {
                    iconName = 'list'
                    } else if (rn === settingsName) {
                    iconName = 'user';
                    }

                    if (!focused) {
                    return <Feather name={iconName} size={size} color={color}/>;
                    }
                    return <Feather padding={10} name={iconName} size={size} 
                            color={color} backgroundColor={'#A5C91B'} style={{borderRadius: 50}}/>
                },
                    headerShown: false,
                    headerBackTitleVisible: false,
                    })}
                    tabBarOptions={{
                    activeTintColor: 'white',
                    inactiveTintColor: 'grey',
                    labelStyle: { paddingBottom: 10, fontSize: 10 },
                    style: { padding: 10, height: 10}
                }}>
                    <Tab.Screen name={detailsName} component={Events} />
                    <Tab.Screen name={settingsName} component={EventInfo} />
            </Tab.Navigator>
    );
};