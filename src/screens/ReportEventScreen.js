import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Dropdown from '../components/events/Dropdown';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import ModalReportEvent from '../components/ModalReportEvent';
import apiClient from '../services/apiClient';
import { useMainContext } from '../services/contexts/MainContext';
import AwesomeAlert from "react-native-awesome-alerts";
import * as React from "react";


export default function ReportEventScreen({ route, navigation }) {
    const { getUserData } = useMainContext();
    const [motives, setMotives] = useState([]);    
    const [userData, setUserData] = useState({});
    const [observation, setObservation] = useState('');    
    const [selectedMotive, setSelectedMotive] = useState(undefined);

    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState("");

    const hideAlert = () => {
        setShowAlert(false);
    }

    const onError = (error) => {
        setAlertText(error.response.data.error);

        setShowAlert(true);
    }

    useEffect(() => {
        const onResponse = (response) => {
            setMotives(response.motives());
        }

        getUserData((data) => {
            setUserData(data);
            const client = new apiClient(data.token);
            client.getReportMotivesList(onResponse, onError);
        });

    }, []);

    const navigateToEvent = () => {
        setSelectedMotive(undefined);
        setObservation('');
        navigation.navigate('EventInfo', {
            'eventId': route.params.eventId
        });
    }

    const reportEvent = () => {
        const onResponse = (response) => {
            setAlertText(response.message);

            setShowAlert(true);
        }

        const eventId = route.params.eventId

        const client = new apiClient(userData.token);
        client.postReportOfEvent(eventId, selectedMotive, observation, onResponse, onError);
        setObservation("");
        setSelectedMotive(undefined);
        navigation.navigate('EventInfo', {
            'eventId': eventId
        });
    }

    return (
        <SafeAreaView style={{backgroundColor: "white", flex: 1}}>
            <ScrollView style={{padding: 25, flexGrow: 1}}>
                <Text style={styles.title}>
                    Denunciar Evento
                </Text>
                <Text style={styles.fieldTitle}>
                    Motivos
                </Text>
                <View style={{width: '100%', marginTop: 10}}>
                    <Dropdown 
                              placeholder="Motivos de Denuncia"
                              options={motives}
                              optionLabel={'name'}
                              dropdownStyle={
                                {
                                    borderWidth: 2,
                                    borderRadius: 15,
                                    borderColor: '#E4E4F0',
                                    backgroundColor: "white"
                                }
                              }
                              checkboxStyle={{
                                borderRadius: 30,
                                padding: 10,
                              }}
                              optionValue={'id'}
                              selectedValue={selectedMotive}
                              onValueChange={(value) => {
                                setSelectedMotive(value);
                        }}
                    />
                </View>
                <Text style={styles.fieldTitle}>Observación</Text>
                <TextInput
                    style={styles.inputObservation}
                    underlineColorAndroid='transparent'
                    onChangeText={(val) => {
                        if( val && val.length > 100){
                            return
                        }
                        setObservation(val);
                    }}
                    value={observation}
                    multiline
                    numberOfLines={4}
                    placeholder="Contanos más porque este evento debe ser dado de baja"
                />
                <View style={styles.btnsRow}>
                    <Button 
                        style={styles.btnGoBack} 
                        textColor={'#768395'}
                        onPress={navigateToEvent}>Volver
                    </Button>
                    <ModalReportEvent 
                        isActive={(selectedMotive !== undefined) 
                                && (observation.length > 0)}
                        reportEvent={reportEvent}/>
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
            </ScrollView>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
  }
  
const styles = StyleSheet.create({
    title: {
        color: '#708BA6',
        fontSize: 22,
        fontWeight: '600',
        marginTop: 55,
        marginBottom: 55,
        flex:1
    },
    fieldTitle: {
        color: '#A5C91B',
        fontSize: 20,
        fontWeight: '900',
        marginBottom:10
    },
    btnGoBack: {
        padding: 2,
        margin: 15,
        width: 100,
        borderWidth: 2,
        borderColor: '#768395'
    },
    btnsRow: {
        display: 'flex', 
        flexDirection: 'row', 
        padding: 25,
        justifyContent: 'center',
        alignContent: 'center',
    },
    inputObservation: {
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#E4E4F0',
        borderWidth: 2,
        borderRadius: 15,
    }
});