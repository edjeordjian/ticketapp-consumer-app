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
import Dropdown from 'react-native-input-select';

import * as Notifications from 'expo-notifications';
import * as React from "react";
import {registerForPushNotifications} from "../services/helpers/NotificationHelper";
import {requestLocation} from "../services/helpers/LocationHelper";
import {Button} from "react-native-paper";

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
    const { getUserData } = useMainContext();
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const onResponse = (response) => {
            setIsLoading(false);
            setEvents(response.events());
        }

        const onResponseTags = (response) => {
            setTags(response.tags());
        }

        const onError = (error) => {
            console.log(error);
        }
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
            console.log(error);
        }

        setRefreshing(true);
        getUserData((data) => {
            setUserData(data);
            const client = new apiClient(data.token);
            client.getEventsList(onResponse, onError, search, selectedTags);
        });

      }, []);

    const updateSearch = async (searchString) => {
        const onResponse = (response) => {
            setIsLoading(false);
            setEvents(response.events());
        }
        const onError = (error) => {
            console.log(error);
        }

        await setSearch(searchString);

        await setIsLoading(true);
        const client = new apiClient(userData.token);
        client.getEventsList(onResponse, onError, searchString, selectedTags);
    };

    const updateTagSearch = async (tagsSelected) => {
        const onResponse = (response) => {
            setIsLoading(false);
            setEvents(response.events());
        }
        const onError = (error) => {
            console.log(error);
        }
        setSelectedTags(tagsSelected);
        await setIsLoading(true);
        const client = new apiClient(userData.token);
        client.getEventsList(onResponse, onError, search, tagsSelected);
    }

    const getLocation = () => {
        requestLocation().then(location => {
            if (location) {
                alert(`Latitud y longitud: ${location.latitude} ${location.longitude}`);
            }
        })
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
                <View style={{width: '90%', marginTop: 10}}>
                    <Dropdown isMultiple
                              placeholder="Tipo de evento"
                              options={tags}
                              optionLabel={'name'}
                              optionValue={'id'}
                              selectedValue={selectedTags}
                              onValueChange={(value) => {
                                updateTagSearch(value).then();
                            }}
                            primaryColor={'green'}
                    />
                </View>
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
                            <EventBox key={event.id} eventInfo={event} navigation={navigation}/>
                        );
                    })
                }
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
        height: 200,
        marginBottom: 25,
        display: 'flex',
        alignItems: 'center',
        zIndex: 100
    },
    scrollContainer: {
        zIndex: 1,
        width: '100%',
        backgroundColor: '#F4F4F4',
      },
});