import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';


export default function QRScreen({ route, navigation }) {
    let logo = require('../../assets/logoApp.png')
    return (
            <SafeAreaView>
                <LinearGradient
                    colors={['#1A55D7', '#A8BB46']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.container}
                >
                <Text style={styles.title}>
                    Mostrá el QR
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
                <Text style={styles.text}>
                    Recordá que este código QR tendrá validez una única vez.
                </Text>
                    <StatusBar style="auto" />
                </LinearGradient>
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
        padding: 15,
        backgroundColor: 'white'
    },
    title: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '600',
        marginBottom: 55,
    },
    text: {
        color: 'white',
        marginTop: 55,
        fontSize: 15,
        width: '70%',
        textAlign: 'center'
    }
});