import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventBox from '../components/EventBox';
import { useCallback, useEffect, useState } from 'react';
import apiClient from '../services/apiClient';
import { useMainContext } from '../services/contexts/MainContext';
import EventBoxPlaceHolder from '../components/EventBoxPlaceHolder';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';


export default function UsersEvents({ navigation }) {
    const [events, setEvents] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const { getUserData } = useMainContext();
    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
        const onResponse = (response) => {
            setIsLoading(false);
            setEvents(response.events());
        }

        const onError = (error) => {
            console.log(error);
        }

        getUserData((data) => {
            setUserData(data);
            const client = new apiClient(data.token);
            client.getUsersEventsList(onResponse, onError, data.id);
        });

    }, []);

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
            client.getUsersEventsList(onResponse, onError, data.id);
        });

      }, []);

    const event = loading || (events[0] === undefined) ? {} : events[0];

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#1A55D7', '#A8BB46']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.searchBarContainer}
            >
                <Text style={styles.nextEventText}>Próximo evento</Text>
                <EventBox key={event.id} eventInfo={event} navigation={navigation}/>
            </LinearGradient>
            <Text style={styles.allEventsText}>Eventos reservados</Text>
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
                            <EventBox key={event.id} showImage={false} eventInfo={event} navigation={navigation}/>
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
      backgroundColor: '#F4F4F4',
      width: '100%',
    },
    searchBarContainer: {
        backgroundColor: '#1A55D7',
        width: '100%',
        height: 400,
        marginBottom: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    nextEventText: {
        color: 'white', 
        fontWeight: '700', 
        alignSelf: 'flex-start',
        fontSize: 18,
        marginBottom: 15,
        marginLeft: '5%'
    },
    allEventsText: {
        color: '#4D4D4D', 
        fontWeight: '700', 
        alignSelf: 'flex-start',
        fontSize: 18,
        marginBottom: 15,
        marginLeft: '5%'
    },
    scrollContainer: {
        width: '100%',
        backgroundColor: '#F4F4F4',
      },
});