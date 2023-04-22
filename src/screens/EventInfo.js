import {StyleSheet, Text, Image, View, useWindowDimensions, ScrollView, TouchableOpacity} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {Entypo} from '@expo/vector-icons';
import {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import apiClient from '../services/apiClient';

import {StatusBar} from 'expo-status-bar';

import { useMainContext } from '../services/contexts/MainContext';
import Agenda from '../components/Agenda';
import EventInfoLoading from './EventInfoLoading';
import ModalGetEvent from '../components/ModalGetEvent';
import { Button } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';

import {BlankLine} from "../components/BlankLine";
import MapView, {Marker} from "react-native-maps";


export default function EventInfo({route, navigation}) {
    const [imageSelected, setImageToShow] = useState(0);

    const [event, setEvent] = useState({});

    const { getUserData } = useMainContext();

    const { width } = useWindowDimensions();

    const onResponseGetEvent = (response) => {
        setEvent(response.event());
        setImageToShow(0);
    }

    const onError = (error) => {
        console.log(error);
    }

    useEffect(() => {
        getUserData((data) => {
            const client = new apiClient(data.token);
            client.getEventInfo(route.params.eventId, onResponseGetEvent, onError);
        });

    }, [route.params.eventId]);

    const getEventTicket = async () => {
        getUserData(async (data) => {
            await setEvent({});
            const client = new apiClient(data.token);
            console.log('getting ticket');
            client.getEventInfo(route.params.eventId, onResponseGetEvent, onError);
            //client.getEventTicket(route.params.eventId, onResponse, onError);
        });
    }

    const navigateToQR = () => {
        navigation.navigate('GetQR', {
            'ticketId': event.ticket.id
        });
    }

    const navigateToFAQ = () => {
        navigation.navigate('FAQScreen', {
            eventFAQ: event.faq,
            eventId: event.id
        });
    }

    const qrBtn = () => {
        if (event.ticket.wasUsed) {
            return (
                <Button
                    style={styles.btnUsedEvent}
                    onPress={navigateToQR}
                    disabled={true}
                    textColor={'white'}>
                    Entrada utilizada
                </Button>
            )
        }
        return (
            <Button
                style={styles.btnGetEvent}
                onPress={navigateToQR}
                textColor={'white'}>
                Obtener QR
            </Button>
        )
    }

    if (event.id === undefined) {
        return <EventInfoLoading/>
    }

    const capacityText = event.capacity === 0 ? "Ya no quedan lugares" :  "Quedan " + event.capacity + " lugares"

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {event.imagesUri ?
                    <View style={styles.imageContainer}>
                        <Image
                            source={{uri: event.imagesUri[imageSelected]}}
                            style={styles.image}/>
                        <TouchableOpacity style={styles.viewNextImageBtn} onPress={(e) => {
                            setImageToShow((imageSelected + 1) % event.imagesUri.length)
                        }}>
                            <Entypo name="chevron-right" size={35} color="white"/>
                        </TouchableOpacity>
                        <View style={styles.capacityBox}>
                            <Text style={styles.capacityBoxText}>
                                {capacityText}
                            </Text>
                        </View>
                    </View>
                    :
                    <></>
                }

                <View style={styles.headerContainer}>
                    <Text style={styles.title}>
                        {event.name}
                    </Text>

                    <Button 
                        onPress={navigateToFAQ}
                        buttonColor={'#A5C91B'}
                        textColor={'white'}>
                        FAQ
                    </Button>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.infoPlaceContainer}>
                        <View style={styles.infoRow}>
                            <Feather name="map-pin" size={24} color="#747474"/>
                            <Text style={styles.infoTextRow}>{event.address}</Text>
                        </View>


                        <View style={styles.infoRow}>
                            <Feather name="clock" size={24} color="#747474"/>
                            <Text style={styles.infoTextRow}>{event.hour}</Text>
                        </View>
                    </View>
                    <View style={styles.dateContainer}>
                        <Text style={styles.date}>{event.date}</Text>
                    </View>
                </View>

                { (event.latitude) ? (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <MapView
                            style={{
                                width: '90%',
                                height: 200,
                                marginBottom: 15
                            }}
                            initialRegion={{
                                latitude: event.latitude,
                                longitude: event.longitude,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01
                            }}
                        >
                            <Marker coordinate={{
                                latitude: event.latitude,
                                longitude: event.longitude
                            }}/>
                        </MapView>
                    </View>)
                    :
                    <></>
                }

                <BlankLine/>

                <View>
                    {event.labels ?
                        <View style={styles.labelsRow}>
                            {event.labels.map((e, i) => {
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


                    <Text style={styles.subtitle}>
                        Descripción
                    </Text>

                    <Text style={styles.description}>
                        <RenderHtml
                            contentWidth={width}
                            source={{html: event.description}}
                        />
                    </Text>


                    <Text style={styles.subtitle}>Organizador
                    </Text>

                    <Text>
                        {"     " + event.organizerName}
                    </Text>

                    <BlankLine/>

                    <Text style={styles.subtitle}>
                        Agenda
                    </Text>

                    <Agenda agendaEntries={event.agendaEntries}/>

                    {event.ticket && event.ticket.id ?
                        qrBtn()
                        :
                        <ModalGetEvent getEventTicket={getEventTicket} capacity={event.capacity}/>
                    }
                </View>
            </ScrollView>
            <StatusBar style="auto"/>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        paddingLeft: 15,
        paddingRight: 15
    },
    title: {
        color: '#565656',
        fontWeight: '700',
        fontSize: 32,
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
    capacityBox: {
        backgroundColor: 'black',
        position: 'absolute',
        paddingHorizontal: 20,
        paddingVertical: 10,
        right: 0,
        marginBottom: 10,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        marginTop: 270,
        zIndex: 100, 
    },
    capacityBoxText: {
        color: 'white'
    },
    infoRow: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10
    },
    infoTextRow: {
        color: '#747474',
        marginLeft: 5, 
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
        marginTop: 5,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row'
    },
    btnGetEvent: {
        backgroundColor: '#1A55D7',
        width: '90%',
        alignSelf: 'center',
        padding: 2,
        marginTop: 15,
        marginBottom: 15
    },
    btnUsedEvent: {
        backgroundColor: '#A3A3A3',
        width: '90%',
        alignSelf: 'center',
        padding: 2,
        marginTop: 15,
        marginBottom: 15
    },
});
