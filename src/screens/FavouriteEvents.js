import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventBox from '../components/EventBox';
import { useCallback, useEffect, useState } from 'react';
import apiClient from '../services/apiClient';
import { useMainContext } from '../services/contexts/MainContext';
import EventBoxPlaceHolder from '../components/EventBoxPlaceHolder';

import * as Notifications from 'expo-notifications';
import * as React from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import { Text } from 'react-native-paper';
import EventInfoLoading from "./EventInfoLoading";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function FavouriteEvents({ navigation }) {
    const [events, setEvents] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const { getUserData } = useMainContext();
    const [refreshing, setRefreshing] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState("");

    const onResponse = (response) => {
        setIsLoading(false);

        setEvents(response.events());
    }

    const onError = (error) => {
        setAlertText(error.response.data.error);

        setShowAlert(true);

        setIsLoading(false);
    }

    const hideAlert = () => {
        setShowAlert(false);
    }

    useEffect(() => {
        getUserData((data) => {
            setUserData(data);
            const client = new apiClient(data.token);
            client.getFavouritesEventsList(onResponse, onError);
        });

    }, []);

    useEffect(() => {
        const subcriptionNotificationReceived = Notifications.addNotificationReceivedListener(
            async notification => {
                const {params} = notification.request.content.data;
            } );

        const subcriptionNotificationClicked = Notifications.addNotificationResponseReceivedListener(notification => {
            const {type,
                params,
                screenName} = notification.notification
                                          .request
                                          .content
                                          .data;

            navigation.navigate(screenName, params);
        });

        return () => {
            subcriptionNotificationClicked.remove();
            subcriptionNotificationReceived.remove();
        };
    }, [navigation]);

    const onRefresh = useCallback(() => {
        const onResponse = (response) => {
            setEvents(response.events());

            setRefreshing(false);
        }

        const onError = (error) => {
            setAlertText(error.response.data.error);

            setShowAlert(true);

            setRefreshing(false);
        }

        setRefreshing(true);

        getUserData((data) => {
            setUserData(data);
            const client = new apiClient(data.token);
            client.getFavouritesEventsList(onResponse, onError);
        });

      }, []);

    const onFavouriteChange = (eventId) => {
        setEvents((current) =>
            current.filter(
            (event) => event.id !== eventId)
        );
    }

    if (loading) {
        return <EventInfoLoading/>
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#1A55D7', '#A8BB46']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.searchBarContainer}
            >
                <Text style={styles.title}>Tus favoritos</Text>
            </LinearGradient>
            <ScrollView 
                refreshControl={
                    <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    />
                }
                contentContainerStyle={{ flexGrow: 1, alignItems: 'center'}}
                style={styles.scrollContainer}>
                {
                    events.map((event,i) => {
                        return (
                            <View style={styles.eventContainer}>
                                <EventBox 
                                    key={event.id} 
                                    userToken = {userData.token}
                                    onFavouriteChange={onFavouriteChange}
                                    eventInfo={event} 
                                    navigation={navigation}/>
                            </View>
                        );
                    })
                }

                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title={alertText}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={true}
                    showCancelButton={false}
                    showConfirmButton={true}
                    cancelText="Cancelar"
                    confirmText="Aceptar"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={hideAlert}
                    onConfirmPressed={hideAlert}
                />
            </ScrollView>
            <StatusBar style="auto" />
      </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F4F4F4',
      width: '100%',
    },
    title: {
        color: 'white', 
        fontWeight: '700', 
        alignSelf: 'flex-start',
        fontSize: 18,
        marginBottom: 15,
        marginLeft: '5%',
        marginTop: 22
    },
    eventContainer: {
        marginTop: 10, 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    searchBarContainer: {
        backgroundColor: '#1A55D7',
        width: '100%',
        height: 180,
        marginBottom: 25,
        display: 'flex',
        alignItems: 'center',
    },
    scrollContainer: {
        zIndex: 101,
        width: '100%',
        marginTop: -130
    },
});