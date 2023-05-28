import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import apiClient from '../services/apiClient';


export default function EventBox(props) {
    let event = props.eventInfo;
    let showImage = props.showImage === undefined ? true : props.showImage;
    const [isFavourite, setIsFavourite] = useState(event.isFavourite);

    const navigateToEvent = () => {
        props.navigation.navigate('EventInfo', {
            'eventId': event.id
        });
    }

    const onResponse = (res) => {
        console.log(res);
    }

    const onError = (res) => {
        console.log(res.response.data.error);
    }

    const setFavourite = async () => {
        const eventId = event.id;
        const client = new apiClient(props.userToken);
        if (props.onFavouriteChange) {
            props.onFavouriteChange(eventId);
        }

        await client.postFavorite(eventId, ! isFavourite, onResponse, onError);

        setIsFavourite(!isFavourite);
    }

    const favouriteIcon = isFavourite ?
            <TouchableOpacity onPress={setFavourite} style={styles.favouriteContainerUp}>
                {/*<AntDesign name="heart" size={24} color="#FE5454"/>*/}
                <Feather name="heart" size={24} color="#FE5454" />
            </TouchableOpacity>
                :
            <TouchableOpacity onPress={setFavourite} style={styles.favouriteContainerDown}>
                <Feather name="heart" size={24} color="black" />
            </TouchableOpacity>

    return (
            <View style={styles.container}>
                <TouchableOpacity onPress={navigateToEvent}>
                    <View style={showImage ? styles.imageContainer : styles.noImageContainer}>
                        {showImage ? 
                        <>
                            {favouriteIcon}
                            <Image source={{uri:event.imageUri}} style={styles.image}/>
                        </>
                        : <></>}
                    </View>
                    <Text style={styles.nameTitle}>{event.name}</Text>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoPlaceContainer}>
                            <View style={styles.infoRow}>
                                <Feather name="map-pin" size={24} color="#747474" />
                                <Text style={styles.infoTextRow}>{event.address}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Feather name="clock" size={24} color="#747474" />
                                <Text style={styles.infoTextRow}>{event.hour}</Text>
                            </View>
                        </View>
                        <View style={styles.dateContainer}>
                            <Text style={styles.date}>{event.date}</Text>
                        </View>
                    </View>
                    {event.distance ?
                        <Text style={styles.distanceInfo}>Estás a {event.distance.toFixed(1)}km</Text>
                        :
                        <></>
                    }
                </TouchableOpacity>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        width: '90%',
        borderRadius: 25,
        shadowOffset: {width: -2, height: 4},  
        shadowColor: '#171717',  
        shadowOpacity: 0.2,  
        shadowRadius: 3,  
        marginBottom: 15
    },
    infoContainer: {
        display: 'flex',
        padding: 15,
        flexDirection: 'row'
    },
    nameTitle: {
        marginLeft: 15,
        marginTop: 10,
        fontWeight: 600,
        fontSize: 18,
        color: '#565656',
    },
    infoPlaceContainer: {
        flex:1
    },
    dateContainer: {
        flex:1,
    },
    imageContainer: {
        height: 150,
        position: 'relative',
        width: '100%',
        borderRadius: 25
    },
    noImageContainer: {
        height: 20,
        position: 'relative',
        width: '100%',
        borderRadius: 25
    },
    favouriteContainerDown: {
        backgroundColor: '#D9D9D9',
        position: 'absolute',
        zIndex: 5,
        right: 0,
        height: 40,
        width: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    favouriteContainerUp: {
        backgroundColor: '#FFC7C7',
        position: 'absolute',
        zIndex: 5,
        right: 0,
        height: 40,
        width: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 25
    },
    infoRow: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10
    },
    infoTextRow: {
        color: '#747474',
        marginLeft: 5
    },
    distanceInfo: {
        color: '#747474',
        marginLeft: 18,
        fontWeight: 400,
        fontSize: 16,
        marginBottom: 15,
        marginTop: -10
    },
    date: {
        backgroundColor: '#E6A0FF',
        borderRadius: 25,
        color: 'white',
        textAlign: 'center',
        width: '80%',
        alignSelf: 'flex-end'
    }
});