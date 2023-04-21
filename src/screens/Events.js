import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventBox from '../components/EventBox';
import { SearchBar } from '@rneui/themed';
import { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';
import { useMainContext } from '../services/contexts/MainContext';
import EventBoxPlaceHolder from '../components/EventBoxPlaceHolder';
import Dropdown from 'react-native-input-select';


export default function Events({ navigation }) {
    const [events, setEvents] = useState([]);
    const [tags, setTags] = useState([]);    
    const [selectedTags, setSelectedTags] = useState(undefined);
    const [loading, setIsLoading] = useState(true);
    const [search, setSearch] = useState(undefined);
    const [userData, setUserData] = useState({});
    const { getUserData } = useMainContext();

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
        client.getEventsList(onResponse, onError, search, selectedTags);
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
                    <Dropdown
                        isMultiple
                        placeholder="Etiquetas..."
                        options={tags}
                        optionLabel={'name'}
                        optionValue={'id'}
                        selectedValue={selectedTags}
                        onValueChange={(value) => {
                            updateTagSearch(value);
                        }}
                        primaryColor={'green'}
                    />
                </View>
            </LinearGradient>
            <ScrollView 
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