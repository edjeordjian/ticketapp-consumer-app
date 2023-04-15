import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function FAQScreen({ route, navigation }) {

    const _faq = (question, answer) => {
        return (
            <View style={styles.faqContainer}>
                <Text style={styles.questionText}>{question}</Text>
                <Text style={styles.answerText}>{answer}</Text>
            </View>
        )
    }

    const navigateToEvent = () => {
        navigation.navigate('SeeEvent', {
            'eventId': route.params.eventId
        });
    }

    return (
        <SafeAreaView>
            <ScrollView  style={{padding: 25, flexGrow: 1}}>
                <Text style={styles.title}>
                    Preguntas Frecuentes
                </Text>
                {route.params.eventFAQ.map( (f,_) => {
                    return (
                        _faq(f.question, f.answer)
                    )
                })}
                <Button 
                    style={styles.btnGoBack} 
                    textColor={'#768395'}
                    onPress={navigateToEvent}>
                    Volver
                </Button>
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
    faqContainer: {
        marginBottom: 25,
        flex:2
    },
    questionText: {
        color: '#A5C91B',
        fontSize: 20,
        fontWeight: '900',
        marginBottom:10
    },
    answerText: {
        color: '#373D45',
        fontSize: 16,
    },
    btnGoBack: {
        width: '50%',
        padding: 2,
        marginTop: 15,
        marginBottom: 15,
        borderWidth: 2,
        flex:1,
        borderColor: '#768395'
    },
});