import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

// Screens
import Events from '../screens/Events';
import EventInfo from '../screens/EventInfo';

// https://reactnavigation.org/docs/hiding-tabbar-in-screens/

//Screen names
const detailsName = "EventsList";
const settingsName = "SeeEvent";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    // <NavigationContainer>
    <View>
      <Tab.Navigator
        initialRouteName={settingsName}
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

        {/* <Tab.Screen name={logInName} component={LogIn} options={() => ({
              tabBarStyle: {display: "none"},
              tabBarButton: () => null,
        })}/> */}
        <Tab.Screen name={detailsName} component={Events} />
        <Tab.Screen name={settingsName} component={EventInfo} />

      </Tab.Navigator>
      </View>
    // </NavigationContainer>
  );
}