import { StyleSheet, Text, Image, View, useWindowDimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import apiClient from '../services/apiClient';
import { useMainContext } from '../services/contexts/MainContext';
import CarouselCards from '../components/Carousel';
import RenderHtml from 'react-native-render-html';
import Agenda from '../components/Agenda';
import EventInfoLoading from './EventInfoLoading';
import {BlankLine} from "../components/BlankLine";


export default function EventInfo({ route, navigation }) {
    const [imageSelected, setImageToShow] = useState(0);

    const [event, setEvent] = useState({});

    const { getUserData } = useMainContext();

    const { width } = useWindowDimensions();

    const [currentEventId, setCurrentEventId] = useState(-1);

    useEffect(() => {
        const onResponse = (response) => {
            setEvent(response.event());

            setImageToShow(0);

            setCurrentEventId(route.params.eventId);
        }

        const onError = (error) => {
            console.log(error);
        }

        getUserData((data) => {
            const client = new apiClient(data.token);
            client.getEventInfo(route.params.eventId, onResponse, onError);
        });

    }, [route.params.eventId]);


    if (currentEventId !== route.params.eventId) {
        return <EventInfoLoading/>
    }

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
                {event.name}
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

            {event.labels ?
                <View style={styles.labelsRow}>
                    {event.labels.map((e,i) => {
                        return (
                            <View style={styles.labelContainer} key={i}>
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

            <BlankLine/>

            <Text style={styles.subtitle}>
                Descripción
            </Text>

            <Text style={styles.description}>
                <RenderHtml 
                    contentWidth={width}
                    source={{html: event.description}}
                    />
            </Text>

            <BlankLine/>

            <Text style={styles.subtitle}>Organizador
            </Text>

            <Text>
                {"     " + event.organizerName}
            </Text>

            <BlankLine/>

            {/* <Text style={styles.subtitle}>
                Galeria
            </Text>
            {event.imagesUri ?
                <CarouselCards images={event.imagesUri.map((url,_) => {return {imgUrl: url}})}/>
                :
                <></>
            } */}
            <Text style={styles.subtitle}>
                Agenda
            </Text>

            <Agenda agendaEntries={event.agendaEntries}/>
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
        marginTop: 10
    },
    description: {
        marginLeft: 15,
        fontSize: 15,
        marginTop: 15,
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
    }
});