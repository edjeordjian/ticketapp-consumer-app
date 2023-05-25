import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import Events from "../../screens/Events";
import EventInfo from "../../screens/EventInfo";
import UserProfileScreen from '../../screens/UserProfileScreen';
import QRScreen from '../../screens/QRScreen';
import UsersEvents from '../../screens/UsersEvents';
import FAQScreen from '../../screens/FAQScreen';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications'
import {APP_NAME, APP_OWNER} from "../../constants/generalConstants";
import {Platform} from "react-native";
import {registerForPushNotifications} from "../helpers/NotificationHelper";
import {requestLocation} from "../helpers/LocationHelper";
import ReportEventScreen from '../../screens/ReportEventScreen';
import FavouriteEvents from '../../screens/FavouriteEvents';

const Tab = createBottomTabNavigator();

//Screen names
const detailsName = "EventsList";
const userEventsName = "userEventsName";
const eventInfoName = "EventInfo";
const favouriteEventsName = "FavouriteEvents";
const qrScreenName = "GetQR";
const FAQScreenName = "FAQScreen";
const settingsName = "settingsUser";
const reportEventScreenName = "ReportEventScreen";
import * as Linking from "expo-linking";

export default function HomeStack({navigation}) {
    const prefix = Linking.createURL("/");

    return (
        <Tab.Navigator
                screenOptions={({ route }) => ({
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "grey",
                tabBarLabelStyle: {
                    paddingBottom: 10,
                    fontSize: 10
                },
                tabBarHideOnKeyboard: true,
                tabBarStyle: [
                    {
                        display: "flex",
                        backgroundColor: '#F4F4F4'
                    },
                    null,
                ],
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === detailsName || rn === eventInfoName) {
                        iconName = 'list'
                    } else if (rn === userEventsName) {
                        iconName = 'user';
                    } else if (rn === favouriteEventsName) {
                        iconName = 'heart';
                    } else if (rn === settingsName) {
                        iconName = 'log-out';
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
                >
                    <Tab.Screen name={detailsName} component={Events} />
                    <Tab.Screen name={userEventsName} component={UsersEvents} />
                    <Tab.Screen  name={favouriteEventsName} component={FavouriteEvents} />
                    <Tab.Screen  name={settingsName} component={UserProfileScreen} />

                    <Tab.Screen name={eventInfoName} component={EventInfo} options={
                        () => ({tabBarButton: () => null, unmountOnBlur: true})}
                    />
                    <Tab.Screen name={qrScreenName} component={QRScreen} options={
                        () => ({tabBarButton: () => null})}
                    />
                    <Tab.Screen name={FAQScreenName} component={FAQScreen} options={
                        () => ({tabBarButton: () => null})}
                    />
                    <Tab.Screen name={reportEventScreenName} component={ReportEventScreen} options={
                        () => ({tabBarButton: () => null})}
                    />
            </Tab.Navigator>
    );
};