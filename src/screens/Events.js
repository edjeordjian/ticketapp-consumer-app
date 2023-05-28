import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventBox from '../components/EventBox';
import { SearchBar } from '@rneui/themed';
import { useCallback, useEffect, useState } from 'react';
import apiClient from '../services/apiClient';
import { useMainContext } from '../services/contexts/MainContext';
import EventBoxPlaceHolder from '../components/EventBoxPlaceHolder';
import Dropdown from '../components/events/Dropdown';

import * as Notifications from 'expo-notifications';
import * as React from "react";
import {requestLocation} from "../services/helpers/LocationHelper";
import {Button} from "react-native-paper";
import AwesomeAlert from "react-native-awesome-alerts";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function Events({ navigation }) {
    const [events, setEvents] = useState([]);
    const [tags, setTags] = useState([]);    
    const [selectedTags, setSelectedTags] = useState(undefined);
    const [loading, setIsLoading] = useState(true);
    const [search, setSearch] = useState(undefined);
    const [userData, setUserData] = useState({});
    const [location, setUserLocation] = useState({});
    const { getUserData } = useMainContext();
    const [ orderByLocation, setOrderByLocation] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [emptySelection, setEmptySelection] = useState(false);

    const onResponse = (response) => {
        setIsLoading(false);
        setEvents(response.events());
    }

    const onResponseTags = (response) => {
        setTags(response.tags());
    }

    const onError = (error) => {
        setAlertText(error.response.data.error);

        setShowAlert(true);
    }

    const hideAlert = () => {
        setShowAlert(false);
    }

    useEffect(() => {
        getUserData((data) => {
            setUserData(data);
            const client = new apiClient(data.token);
            client.getEventsList(onResponse, onError, search, selectedTags);
            client.getTagsList(onResponseTags, onError);
        });

    }, []);

    useEffect(() => {
        const subcriptionNotificationReceived = Notifications.addNotificationReceivedListener(
            async notification => {
                const {params} = notification.request.content.data;
                // idEmissor: params.idEmissor
                // idReceptor: params.idReceptor
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
        setEvents([]);
        const latitude = orderByLocation ? location.latitude: undefined;
        const longitude = orderByLocation ? location.longitude: undefined;
        getUserData((data) => {
            setUserData(data);
            const client = new apiClient(data.token);
            client.getEventsList(onResponse, onError, search, selectedTags, undefined, latitude, longitude);
        });

      }, []);

    const updateSearch = async (searchString) => {
        const onResponse = (response) => {
            setIsLoading(false);
            setEvents(response.events());
        }
        const onError = (error) => {
            setAlertText(error.response.data.error);

            setShowAlert(true);

            console.log(error);
        }

        await setSearch(searchString);

        await setIsLoading(true);
        const client = new apiClient(userData.token);
        const latitude = orderByLocation ? location.latitude: undefined;
        const longitude = orderByLocation ? location.longitude: undefined;
        client.getEventsList(onResponse, onError, searchString, selectedTags, undefined, latitude, longitude);
    };

    const updateTagSearch = async (tagsSelected) => {
        const onResponse = (response) => {
            setIsLoading(false);

            setEmptySelection(false);

            setEvents(response.events());
        }
        const onError = (error) => {
            setAlertText(error.response.data.error);

            setShowAlert(true);

            console.log(error);
        }
        setSelectedTags(tagsSelected);
        setIsLoading(true);
        const latitude = orderByLocation ? location.latitude: undefined;
        const longitude = orderByLocation ? location.longitude: undefined;
        const client = new apiClient(userData.token);
        client.getEventsList(onResponse, onError, search, tagsSelected, undefined, latitude, longitude);
    }

    const emptyCategories = async () => {
        setEmptySelection(true);

        await updateTagSearch(undefined);
    }

    const getLocation = async () => {
        const location = await requestLocation();
        return location;
    }

    const orderEventsByLocation = async () => {
        setOrderByLocation(!orderByLocation);
        setIsLoading(true);
        const client = new apiClient(userData.token);
        if (orderByLocation) {
            client.getEventsList(onResponse, onError, search, selectedTags);
        } else {
            const location = await getLocation();
            const longitude = location ? location.longitude : undefined;
            const latitude = location ? location.latitude : undefined;
            setUserLocation({longitude,latitude});
            client.getEventsList(onResponse, onError, search, selectedTags, undefined, latitude, longitude);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#1A55D7', '#A8BB46']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.searchBarContainer}
            >
                <SearchBar
                    placeholder="Buscar"
                    onChangeText={updateSearch}
                    value={search}
                    lightTheme
                    inputContainerStyle={{backgroundColor:'white'}}
                    containerStyle={{backgroundColor: 'white', width: '90%', marginTop: 15, borderRadius:15}}
                />

                <View style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <View style={{
                        width: '75%',
                        marginTop: 10
                    }}>
                            <Dropdown isMultiple
                                      placeholder="Tipo de evento"
                                      options={tags}
                                      dropdownStyle={
                                            {borderWidth: 0, // To remove border, set borderWidth to 0
                                            borderRadius:15,
                                            backgroundColor: "white"}
                                      }
                                      optionLabel={'name'}
                                      optionValue={'id'}
                                      selectedValue={selectedTags}
                                      onValueChange={(value) => {
                                        updateTagSearch(value).then();
                                    }}
                                    primaryColor={'green'}
                                    emptyOptions={emptySelection}
                            />
                    </View>

                    <View style={{
                        width: '15%',
                        marginTop: 20
                    }}>
                        <Button labelStyle={{
                            color: "red",
                            fontSize: 20
                        }}
                        onPress={emptyCategories}
                        >🗑️
                        </Button>
                    </View>
                </View>

                <Button
                    style={orderByLocation ? styles.btnOrderWithLocationOn: styles.btnOrderWithLocationOff}
                    onPress={orderEventsByLocation}
                    textColor={'#03134B'}>
                    Más cercanos
                </Button>
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
                {loading ? 
                    <EventBoxPlaceHolder/>
                : 
                    events.map((event,i) => {
                        return (
                            <EventBox 
                                key={event.id} 
                                userToken = {userData.token}
                                eventInfo={event} 
                                navigation={navigation}/>
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
    searchBarContainer: {
        backgroundColor: '#1A55D7',
        width: '100%',
        height: 220,
        marginBottom: 25,
        display: 'flex',
        alignItems: 'center',
    },
    scrollContainer: {
        zIndex: 101,
        width: '100%',
        backgroundColor: '#F4F4F4',
    },
    btnOrderWithLocationOff: {
        backgroundColor: '#A3A3A3',
        alignSelf: 'center',
        paddingVertical: 2,
        paddingHorizontal: 10,
        marginTop: 15,
        marginBottom: 15
    },
    btnOrderWithLocationOn: {
        backgroundColor: '#BBCEFF',
        alignSelf: 'center',
        paddingVertical: 2,
        paddingHorizontal: 10,
        marginTop: 15,
        marginBottom: 15
    },
});