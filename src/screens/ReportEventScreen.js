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


export default function ReportEventScreen({ route, navigation }) {
    const { getUserData } = useMainContext();
    const [motives, setMotives] = useState([]);    
    const [userData, setUserData] = useState({});
    const [observation, setObservation] = useState([]);    
    const [selectedMotive, setSelectedMotive] = useState(undefined);

    useEffect(() => {
        const onResponse = (response) => {
            setMotives(response.motives());
        }
    
        const onError = (error) => {
            console.log(error.response.data.error);
        }


        getUserData((data) => {
            setUserData(data);
            const client = new apiClient(data.token);
            client.getReportMotivesList(onResponse, onError);
        });

    }, []);

    const navigateToEvent = () => {
        navigation.navigate('SeeEvent', {
            'eventId': route.params.eventId
        });
    }

    const reportEvent = () => {
        const client = new apiClient(userData.token);
        client.postReportOfEvent(onResponse, onError);
        navigation.navigate('SeeEvent', {
            'eventId': route.params.eventId
        });
    }


    return (
        <SafeAreaView style={{backgroundColor: "white", flex: 1}}>
            <ScrollView style={{padding: 25, flexGrow: 1}}>
                <Text style={styles.title}>
                    Denunciar Evento
                </Text>
                <Text style={styles.fieldTitle}>
                    Motivo
                    <Text style={{color:'red'}}> *</Text>
                </Text>
                <View style={{width: '100%', marginTop: 10}}>
                    <Dropdown 
                              placeholder="Motivo de Denuncia"
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
                    onChangeText={async (val) => {
                        setObservation(val)
                        }}
                    value={observation}
                    multiline
                    numberOfLines={6}
                    placeholder="Contanos más porque este evento debe ser dado de baja"
                />
                <View style={styles.btnsRow}>
                    <Button 
                        style={styles.btnGoBack} 
                        textColor={'#768395'}
                        onPress={navigateToEvent}>
                        Volver
                    </Button>
                    <ModalReportEvent reportEvent={reportEvent}/>
                </View>
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
        width: '40%',
        padding: 2,
        marginTop: 15,
        marginBottom: 15,
        borderWidth: 2,
        flex:1,
        borderColor: '#768395'
    },
    btnsRow: {
        display: 'flex', 
        flexDirection: 'row', 
        padding: 25,
        width: '100%',
        justifyContent: 'space-between'
    },
    inputObservation: {
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#E4E4F0',
        borderWidth: 2,
        borderRadius: 15,
        shadowOffset: {width: 0, height: 0},  
    }
});