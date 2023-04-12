import React, {useMemo, useReducer, useEffect} from "react";
import {MainContext} from "./src/services/contexts/MainContext";
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import HomeStack from "./src/services/app/HomeStack";
import LogInScreen from "./src/screens/LogInScreen";


export default function App() {
    const initialState = () => {
        return {}
    };

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
            } /*else {
                dispatch({
                    type: 'RESTORE_TOKEN',
                    userData: JSON.parse(userData)
                });
            }*/
        }

        bootstrapAsync().then();
    }, []);

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
                }
            } );
        },
        [appState]);

    const AuthStack = createNativeStackNavigator();

    return (
        <MainContext.Provider value={context}>
            <PaperProvider>
                <NavigationContainer>
                    <AuthStack.Navigator screenOptions={{headerShown: false}}>
                        <>
                            {
                                (appState.isLoggedIn || true) ? (
                                    <AuthStack.Screen name='HomeNavStack'
                                                      component={HomeStack}/>
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
