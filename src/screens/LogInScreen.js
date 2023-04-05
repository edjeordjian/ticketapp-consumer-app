import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignInWithGoogle from '../components/SignInGoogleButton';


export default function LogInScreen({ navigation }) {
    return (
        <LinearGradient
            colors={['#1A55D7', '#A8BB46']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <TouchableOpacity onPress={() => {
                navigation.navigate("EventsList");
            }}>
                <SafeAreaView>
                    <Image source={require('../../assets/logoApp.png')} />
                    <SignInWithGoogle navigation={navigation}/>
                    <StatusBar style="auto" />
                </SafeAreaView>
            </TouchableOpacity>
        </LinearGradient>
    );
  }
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1A55D7',
    }
  });
  