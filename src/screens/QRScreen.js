import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import {useMainContext} from "../services/contexts/MainContext";
import {useEffect, useState} from "react";


export default function QRScreen({ route, navigation }) {
    let logo = require('../../assets/logoApp.png');

    const {getUserData} = useMainContext();

    const [eventName, setEventName] = useState(route.params.eventName);

    const [userName, setUserName] = useState("");

    const [userData, setUserData] = useState({});

    useEffect(() => {
        getUserData(data => {
            setUserData(data);

            setUserName(`${data.firstName} ${data.lastName}`);
        });
    }, [eventName]);

    return (
            <SafeAreaView>
                <LinearGradient
                    colors={['#1A55D7', '#A8BB46']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.container}
                >
                <Text style={styles.title}>
                    {route.params.eventName}
                    {`\n\n`}{route.params.date} - {route.params.hour}
                    {`\n\n`}{route.params.address.split(",")[0]}
                    {`\n`}{route.params.address.split(",")[1]}
                </Text>

                    <Text style={styles.subtitle}>Usuario: {userName}
                    </Text>

                    <View style={styles.qrContainer}>
                    <QRCode
                            logo={logo}
                            size={180}
                            logoSize={30}
                            logoBackgroundColor='#1A55D7'
                            value={route.params.ticketId}
                        />
                </View>
                <Text style={styles.textManual}>
                    Código manual:
                </Text>
                <Text style={styles.textManual}>
                    {route.params.ticketId}
                </Text>
                <Text style={styles.text}>
                    Recordá que este código QR tendrá validez una única vez.
                </Text>
                </LinearGradient>
                <StatusBar style="auto" />
            </SafeAreaView>
    );
  }
  
const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    qrContainer: {
        padding: 10,
        backgroundColor: 'white'
    },
    title: {
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '600',
        marginBottom: 20,
    },
    subtitle: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '600',
        marginBottom: 20,
    },
    text: {
        color: 'white',
        marginTop: 40,
        fontSize: 15,
        width: '70%',
        textAlign: 'center'
    },
    textManual: {
        color: 'white',
        width: '70%',
        marginTop: 15,
        textAlign: 'center'
    }
});