import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventBox from '../components/EventBox';
import { SearchBar } from '@rneui/themed';
import { useEffect, useState } from 'react';
//import apiClient from '../apiClient';

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

export default function Events({ navigation }) {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState(undefined);

    useEffect(() => {
        const onResponse = (response) => {
            console.log(response);
            //setEvents(response);
        }
        const onError = (error) => {
            console.log(error);
        }
        //client = new apiClient();
        //client.getCreatorCourses(onResponse, onError);
    }, []);

    const updateSearch = (searchString) => {
        setSearch(searchString);
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
                <EventBox navigation={navigation}/>
                <EventBox navigation={navigation}/>
                <EventBox navigation={navigation}/>
            </ScrollView>
            <StatusBar style="auto" />
      </SafeAreaView>
    );
}