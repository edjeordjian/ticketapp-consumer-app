import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventBox from '../components/EventBox';
import { SearchBar } from '@rneui/themed';
import { useContext, useEffect, useState } from 'react';
import apiClient from '../services/apiClient';
import { useMainContext } from '../services/contexts/MainContext';


export default function Events({ navigation }) {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState(undefined);
    const [userData, setUserData] = useState({});
    const { getUserData } = useMainContext();

    useEffect(() => {
        const onResponse = (response) => {
            setEvents(response.events());
        }
        const onError = (error) => {
            console.log(error);
        }
        getUserData((data) => {
            setUserData(data);
            console.log(data)
            const client = new apiClient(data.token);
            client.getEventsList(onResponse, onError, search, undefined);
        });

    }, []);

    const updateSearch = async (searchString) => {
        const onResponse = (response) => {
            setEvents(response.events());
        }
        const onError = (error) => {
            console.log(error);
        }
        await setSearch(searchString);
        const client = new apiClient(userData.token);
        client.getEventsList(onResponse, onError, search, undefined);
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#1A55D7', '#A8BB46']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.searchBarContainer}
            >
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={updateSearch}
                    value={search}
                    lightTheme
                    inputContainerStyle={{backgroundColor:'white'}}
                    containerStyle={{backgroundColor: 'white', width: '90%', marginTop: 15, borderRadius:15}}
                />
            </LinearGradient>
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1, alignItems: 'center'}}
                style={styles.scrollContainer}>
                {events.map((event,i) => {
                    return (
                        <EventBox key={event.id} eventInfo={event} navigation={navigation}/>
                    );
                })}
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
        alignItems: 'center'
    },
    scrollContainer: {
        width: '100%',
        backgroundColor: '#F4F4F4',
      },
});