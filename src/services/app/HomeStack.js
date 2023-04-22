import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import Events from "../../screens/Events";
import EventInfo from "../../screens/EventInfo";
import UserProfileScreen from '../../screens/UserProfileScreen';
import QRScreen from '../../screens/QRScreen';
import UsersEvents from '../../screens/UsersEvents';
import FAQScreen from '../../screens/FAQScreen';

const Tab = createBottomTabNavigator();

//Screen names
const detailsName = "EventsList";
const userEventsName = "userEventsName";
const eventInfoName = "SeeEvent";
const qrScreenName = "GetQR";
const FAQScreenName = "FAQScreen";
const settingsName = "settingsUser";

export default function HomeStack() {
    return (
        <Tab.Navigator
                initialRouteName={detailsName}
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
                    {/* <Tab.Screen  name={settingsName} component={UserProfileScreen} /> */}
                    <Tab.Screen name={eventInfoName} component={EventInfo} options={
                        () => ({tabBarButton: () => null, unmountOnBlur: true})}
                    />
                    <Tab.Screen name={qrScreenName} component={QRScreen} options={
                        () => ({tabBarButton: () => null,})}
                    />
                    <Tab.Screen name={FAQScreenName} component={FAQScreen} options={
                        () => ({tabBarButton: () => null,})}
                    />
            </Tab.Navigator>
    );
};