import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignInWithGoogle from '../components/SignInGoogleButton';


export default function LogInScreen({ navigation }) {
    return (
            <SafeAreaView>
                <LinearGradient
                    colors={['#1A55D7', '#A8BB46']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.container}
                >
                    <Image style={styles.image} source={require('../../assets/logoApp.png')} />
                    <SignInWithGoogle navigation={navigation}/>
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
    image: {
        marginBottom: 15
    }
});