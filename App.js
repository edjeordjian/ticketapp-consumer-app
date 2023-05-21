import React, {useMemo, useReducer, useEffect} from "react";
import {MainContext} from "./src/services/contexts/MainContext";
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import HomeStack from "./src/services/app/HomeStack";
import LogInScreen from "./src/screens/LogInScreen";
import {registerForPushNotifications} from "./src/services/helpers/NotificationHelper";
import * as Linking from "expo-linking";
import UsersEvents from "./src/screens/UsersEvents";


export default function App() {
    const initialState = () => {
        return {}
    };

    const prefix = Linking.createURL("/");

    const linking = {
        prefixes: [prefix],
        config: {
            screens: {
                HomeNavStack: {
                    screens: {
                        EventInfo: {
                            path: 'EventInfo/:eventId',
                            parse:{
                                eventId: (id) => `${id}`
                            }
                        }
                    },
                },
            }
        }
    };

    const openDeepLink = async () => {
        const deepLink = await Linking.getInitialURL()

        console.log('DeepLink URL:', deepLink);

        if (deepLink) {
            await Linking.openURL(deepLink);
        }
    }

    const onNavigationReady = async () => {
        await openDeepLink()
    }

    const reducer = ( appState = initialState(),
                      action = {} ) => {
        switch (action.type) {
            case 'LOG_IN':
                return {
                    ...appState,
                    isLoggedIn: true
                }

            case 'LOG_OUT':
                return {
                    ...appState,
                    isLoggedIn: false
                }

            case 'RESTORE_TOKEN':
                return {
                    ...appState,
                    isLoggedIn: true
                };
        }

        return appState;
    };

    const [appState, dispatch] = useReducer(reducer, reducer());

    const context = useMemo( () => {
            return ( {
                checkLoggedIn: async () => {
                    return !! await SecureStore.getItemAsync("loggedIn");
                },

                logOut: async () => {
                    await SecureStore.setItemAsync("loggedIn", "");
                    dispatch( {type: 'LOG_OUT' } );
                },

                logIn: async (userData) => {
                    await SecureStore.setItemAsync("user-data", JSON.stringify(userData));
                    await SecureStore.setItemAsync("loggedIn", "true");
                    dispatch( {type: 'LOG_IN' } );
                },

                getUserData: async (setData) => {
                    const info = await SecureStore.getItemAsync("user-data");
                    const jsonParse = JSON.parse(info);
                    setData(jsonParse);
                },

                saveToken: async (token) => {
                    await SecureStore.setItemAsync("token", token);
                },

                getToken: async (token) => {
                   return  await SecureStore.getItemAsync("token");
                }
            } );
        },
        [appState]);

    const AuthStack = createNativeStackNavigator();

    useEffect(() => {
        const bootstrapAsync = async () => {
            let userData;

            try {
                userData = await SecureStore.getItemAsync("user-data");
            } catch (err) {
                alert(err);
                return;
            }
            if (userData === null) {
                await MainContext.signOut();
            } else {
                dispatch({
                    type: 'RESTORE_TOKEN',
                    userData: JSON.parse(userData)
                });
            }
        }

        bootstrapAsync().then();
    }, []);

    return (
        <MainContext.Provider value={context}>
            <PaperProvider>
                <NavigationContainer  onReady={onNavigationReady} linking={linking}>
                    <AuthStack.Navigator screenOptions={{headerShown: false}}>
                        <>
                            {
                                (appState.isLoggedIn) ? (
                                    <>
                                    <AuthStack.Screen name='HomeNavStack'
                                                      component={HomeStack}/>
                                   </>
                                ) : (
                                    <>
                                        <AuthStack.Screen name='LogInScreen'
                                                          component={LogInScreen}/>
                                    </>
                                )
                            }
                        </>
                    </AuthStack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </MainContext.Provider>
    );
}
