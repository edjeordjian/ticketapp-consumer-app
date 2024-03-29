import {StyleSheet, Text, Image, View, useWindowDimensions, ScrollView, TouchableOpacity} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {Entypo} from '@expo/vector-icons';
import {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import apiClient from '../services/apiClient';
import {useMainContext} from '../services/contexts/MainContext';
import RenderHtml from 'react-native-render-html';

import {StatusBar} from 'expo-status-bar';

import Agenda from '../components/Agenda';
import EventInfoLoading from './EventInfoLoading';
import ModalGetEvent from '../components/ModalGetEvent';
import { Button } from 'react-native-paper';

import {BlankLine} from "../components/BlankLine";
import MapView, {Marker} from "react-native-maps";
import AwesomeAlert from "react-native-awesome-alerts";
import {A} from "@expo/html-elements";
import {REDIRECT_HOST} from "../constants/generalConstants";

import * as Clipboard from 'expo-clipboard';
import { FontAwesome5 } from '@expo/vector-icons';

import * as Calendar from "expo-calendar"
import * as Permissions from "expo-permissions"
import ModalSaveCalendar from '../components/ModalSaveCalendar';
import {CALENDAR_NOT_FOUND_ERR_LBL, EVENT_SCHEDULED_LBL} from "../constants/messages";


export default function EventInfo({route, navigation}) {
    const [imageSelected, setImageToShow] = useState(0);
    const [event, setEvent] = useState({});
    const { getUserData } = useMainContext();
    const { width } = useWindowDimensions();
    const [alertText, setAlertText] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [granted, setGranted] = useState(false);
    const [goBackAfterAlert, setGoBackAfterAlert] = useState(true);
    const [eventIdInCalendar, setEventIdInCalendar] = useState(""); 

    const [showCopyAlert, setShowCopyAlert] = useState(false);

    useEffect(() => {
        getUserData((data) => {
            const client = new apiClient(data.token);
            client.getEventInfo(route.params.eventId, onResponseGetEvent, onError);;
        });

        return () => {
          setEvent({});
        };
    }, [route.params.eventId]);

    useEffect(() => {
        if (! event.id) {
            return;
        }

        setCalendarData().then();
    }, [event])

    const getEventText = () => {
        return `¡Vení a ${event.name}! \n ${REDIRECT_HOST}/EventInfo/${event.id}`
    }

    const setCalendarData = async () => {
            if (route.params.doNotRemoveCalendarEvent) {
                await addToCalendar(false);
            } else if (route.params.eventInCalendarId !== undefined && route.params.eventInCalendarId !== null) {
                await deleteEventInCalendar(route.params.eventInCalendarId).then(async res => {
                    if (route.params.recreateEventInCalendar) {
                        console.log("Recreated event in calendar");

                        await addToCalendar(false);
                    }
                }).catch(err => {
                    console.log(err);
                });
            }
    }

    const onResponseGetEvent = async (response) => {
        setImageToShow(0);

        setEvent(response.event());
    }

    const onError = (error) => {
        setAlertText(error.response.data.error);

        setShowAlert(true);
    }

    const hideAlert = () => {
        setShowAlert(false);

        if (goBackAfterAlert) {
            navigation.goBack();
        } else {
            setGoBackAfterAlert(true);
        }
    }

    const getEventTicket = async () => {
        getUserData(async (data) => {
            const client = new apiClient(data.token);
            client.getEventTicket(onResponseGetEvent, onError, data.id, route.params.eventId);
        });
    }

    const copyToClipboard = async () => {
        const shareLink = `${REDIRECT_HOST}/EventInfo/${event.id}`
        await Clipboard.setStringAsync(shareLink);
        setShowCopyAlert(true);
    }

    const navigateToQR = () => {
        navigation.navigate('GetQR', {
            eventId: route.params.eventId,
            ticketId: event.ticket.id,
            date: event.date,
            hour: event.hour,
            address: event.address,
            eventName: event.name
        });
    }

    const navigateToFAQ = () => {
        navigation.navigate('FAQScreen', {
            eventFAQ: event.faq,
            eventId: event.id
        });
    }

    const deleteEventInCalendar = async (eventInCalendarId) => {
        const calendars = await Calendar.getCalendarsAsync();

        const defaultCalendar = calendars.find((cal) => cal.allowsModifications);

        if (! defaultCalendar) {
            console.log(CALENDAR_NOT_FOUND_ERR_LBL);

            return;
        }

        const result = await Calendar.deleteEventAsync(eventInCalendarId);

        console.log("Event deletion");

        console.log(result);
    }

    const addEventToCalendar = async (eventDetails, withMessage = true) => {
        setGoBackAfterAlert(false);

        const calendars = await Calendar.getCalendarsAsync();

        const defaultCalendar = calendars.find((cal) => cal.allowsModifications);

        if (! defaultCalendar) {
            setAlertText(CALENDAR_NOT_FOUND_ERR_LBL);

            setShowAlert(true);

            return;
        }

        const eventIdInCalendar = await Calendar.createEventAsync(defaultCalendar.id, eventDetails);

        setEventIdInCalendar(eventIdInCalendar);

        //Calendar.openEventInCalendar(eventIdInCalendar);

        const onSuccessfullResponse = (response) => {
            if (!withMessage) {
                return;
            }

            setAlertText(response.data.message);

            setShowAlert(true);
        }

        await getUserData((data) => {
            const client = new apiClient(data.token);

            const requestBody = {
                userId: data.id,
                eventId: event.id,
                scheduleId: eventIdInCalendar
            }

            client.postEventCalendarSchedule(requestBody, onSuccessfullResponse, onError);
        });
    }

    // const editEventInCalendar = async (eventDetails) => {
    //     const eventDetails2 = {
    //         startDate: new Date('2023-10-15 07:00'),
    //         endDate: new Date('2023-10-15 15:00'),
    //         title: 'Se editoo',
    //     }
    //     const eventIdInCalendar = await Calendar.updateEventAsync("84", eventDetails2)
    //     console.log(eventIdInCalendar);
    // }

    const addToCalendar = async (withMessage = true) => {
        const [day, month, year] = event.date.split('/');
        const [hours, minutes] = event.time.split(':');
        const start = new Date(+year, +month - 1, +day, +hours, +minutes);
        const end = new Date(+year, +month - 1, +day, +hours, +minutes);
        const eventDetails = {
            startDate: start,
            endDate: end,
            title: event.name,
        }
        if (granted) {
            await addEventToCalendar(eventDetails, withMessage);
            return;
        }
        const {status} = await Permissions.askAsync(Permissions.CALENDAR)
        if (status === "granted") {
            setGranted(true);
            await addEventToCalendar(eventDetails, withMessage);
           return;
        }
    }

    const navigateToReport = () => {
        navigation.navigate('ReportEventScreen', {
            eventId: event.id
        });
    }

    const isEventActive = event.stateName !== 'Cancelado' && event.stateName !== 'Suspendido'

    const qrBtn = () => {
        if (event.ticket.wasUsed) {
            return (
                <Button
                    style={styles.btnUsedEvent}
                    onPress={navigateToQR}
                    disabled={true}
                    textColor={'white'}>Entrada usada
                </Button>
            )
        }

        return (
            <Button
                style={styles.btnGetEvent}
                onPress={navigateToQR}
                textColor={'white'}>Ver entrada
            </Button>
        )
    }

    if (event.id === undefined && ! showAlert) {
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
                        {
                            isEventActive ?
                            <View style={styles.capacityBox}>
                                <Text style={styles.capacityBoxText}>
                                    {capacityText}
                                </Text>
                            </View>
                            :
                            <View style={event.stateName === 'Cancelado' ? styles.warningBoxCancelled : styles.warningBoxSuspended}>
                                <Text style={styles.warningBoxText}>{event.stateName.toUpperCase()}</Text>
                            </View>
                        }
                    </View>
                    :
                    <></>
                }

                <View style={styles.headerContainer}>
                    <Text style={styles.title}>
                        {event.name}
                    </Text>
                </View>

                <BlankLine/>

                <View style={styles.btnsContainer}>
                    <View>
                    </View>

                    {
                        isEventActive && event.ticket && event.ticket.id
                            ? (
                                 <ModalSaveCalendar style={{flex: 1}} addToCalendar={addToCalendar}/>
                            )
                            :
                            <></>
                    }

                    <A href={`whatsapp://send?text=${getEventText()}`} data-action="share/whatsapp/share">
                        <View style={styles.shareBtn}>
                            <FontAwesome5 name="whatsapp" size={22} color="white" />
                        </View>
                    </A>

                    <A href={`https://telegram.me/share/url?text=${getEventText()}`}>
                        <View
                            style={styles.shareBtn}
                            buttonColor={'#A5C91B'}>
                            <FontAwesome5 name="telegram-plane" size={22} color="white" />
                        </View>
                    </A>

                    <TouchableOpacity onPress={copyToClipboard} style={styles.shareBtn}>
                        <FontAwesome5 name="copy" size={22} color="white" />
                    </TouchableOpacity>

                    <Button
                        style={{width: 30}}
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

                    <Text style={styles.subtitle}>
                        Agenda
                    </Text>

                    <Agenda agendaEntries={event.agendaEntries}/>

                    {isEventActive ? 
                        (event.ticket && event.ticket.id) ?
                            (qrBtn())
                            :
                            (<ModalGetEvent getEventTicket={getEventTicket} capacity={event.capacity}/>)
                            :
                            <></>
                    }

                    {event.hasReportedEvent || !isEventActive ? 
                        <></>
                        :
                        <Button
                            style={styles.btnReportEvent}
                            onPress={navigateToReport}
                            textColor={'#03134B'}>
                            Denunciar
                        </Button>
                    }
                </View>

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

                <AwesomeAlert
                    show={showCopyAlert}
                    showProgress={false}
                    title={"Link al evento copiado!"}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={true}
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmText="Aceptar"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => setShowCopyAlert(false)}
                    onConfirmPressed={() => setShowCopyAlert(false)}
                />
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
    warningBoxCancelled: {
        backgroundColor: 'black',
        position: 'absolute',
        width: '100%',
        height: 90,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        right: 0,
        marginTop: 210,
        zIndex: 100, 
    },
    warningBoxSuspended: {
        backgroundColor: '#472183',
        position: 'absolute',
        width: '100%',
        height: 90,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        right: 0,
        marginTop: 210,
        zIndex: 100, 
    },
    warningBoxText: {
        color: 'white',
        fontSize: 18,
        fontWeight: "600"
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
        marginTop: 15
    },
    btnReportEvent: {
        alignSelf: 'center',
        marginBottom: 15
    },
    btnsContainer: {
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 5,
        gap: 5,
        marginLeft: 5,
        marginRight: 15
    },
    shareBtn: {
        backgroundColor: '#A5C91B', 
        marginRight: 10, 
        height: 40, 
        width: 40,
        borderRadius: 20,
        display: 'flex', 
        justifyContent:'center',
        alignItems: 'center'
    }
});
