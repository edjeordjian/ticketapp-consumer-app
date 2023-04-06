import { StyleSheet, Text, Image, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import apiClient from '../services/apiClient';

function DisplayCard(props) {
    return (
        <LinearGradient
        colors={['#1A55D7', '#A8BB46']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.eventCardContainer}
        >
            <Text style={styles.eventTimeContainer}>
                {props.time}
            </Text>
            <View style={styles.eventNameContainer}>
                <Text style={styles.eventCardText}>{props.name}</Text>
            </View>
        </LinearGradient>
    );
}

export default function EventInfo(props) {
    const [imageSelected, setImageToShow] = useState(0);
    const [event, setEvent] = useState({});

    const client = new apiClient();

    useEffect(() => {
        const onResponse = (response) => {
            setEvent(response);
        }
        const onError = (error) => {
            console.log(error);
        }
        client.getEventInfo(1, onResponse, onError);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView>
            {event.imagesUri ?
                <View style={styles.imageContainer}>
                    <Image 
                    source={{uri:event.imagesUri[imageSelected]}} 
                    style={styles.image}/>
                    <TouchableOpacity style={styles.viewNextImageBtn} onPress={(e) => {
                        setImageToShow((imageSelected + 1) % event.imagesUri.length)
                    }}>
                        <Entypo name="chevron-right" size={35} color="white" />
                    </TouchableOpacity>
                </View>
                : 
                <></>
            }
            <Text style={styles.title}>
                Paramore
            </Text>
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
            <Text style={styles.subtitle}>
                Descripción
            </Text>
            <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            </Text>
            {event.labels ? 
                <View style={styles.labelsRow}>
                    {event.labels.map((e,i) => {
                        return (
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>
                                    {e}
                                </Text>
                            </View>
                        );
                    })}
                </View>
                :
                <></>
            }
            <Text style={styles.subtitle}>
                Agenda
            </Text>
            {event.agendaEntries ? 
                <View style={styles.eventContainer}>
                    {event.agendaEntries.map((agenda,i) => {
                        return (
                            <DisplayCard name={agenda.name} time={agenda.time}/>
                        );
                    })}
                </View>
                :
                <></>
            }
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    title: {
        color: '#565656',
        fontWeight: '700',
        fontSize: 32,
        marginLeft: 15,
        marginTop: 15
    },
    subtitle: {
        color: '#565656',
        fontWeight: '700',
        fontSize: 22,
        marginLeft: 15,
        marginTop: 15
    },
    description: {
        marginLeft: 15,
        fontSize: 15,
        marginTop: 10,
        lineHeight: 20
    },
    infoContainer: {
        display: 'flex',
        padding: 15,
        flexDirection: 'row'
    },
    infoPlaceContainer: {
        flex:1
    },
    dateContainer: {
        flex:1,
    },
    imageContainer: {
        marginBottom: 15,
        height: 300
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 25,
        position: 'absolute'
    },
    viewNextImageBtn: {
        zIndex: 5,
        height: '100%',
        width: '20%',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#A5C91B8C',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '80%'
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
    date: {
        backgroundColor: '#E6A0FF',
        borderRadius: 25,
        color: 'white',
        textAlign: 'center',
        width: '80%',
        alignSelf: 'flex-end'
    },
    labelContainer: {
        borderRadius: 8,
        backgroundColor: '#FFE6DE',
        marginRight: 5,
        padding: 5,
    },
    label: {
        color: '#FF4F4F',
        fontWeight: '500',
    },
    labelsRow: {
        marginLeft: 15,
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row'
    },
    eventContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    eventCardContainer: {
        width: '90%',
        height: 80,
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    eventTimeContainer:{
        width: '30%',
        fontSize: 22,
        fontWeight: '600',
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center'
    },
    eventNameContainer: {
        backgroundColor: 'white',
        padding: 15,
        width: '70%',
        height: '100%',
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'center',
        elevation: 3,
    },
    eventCardText: {
        color: '#565656',
        fontWeight: '400',
        fontSize: 18,
    }
});