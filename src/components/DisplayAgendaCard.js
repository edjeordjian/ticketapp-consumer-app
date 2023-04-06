import { Text, View , StyleSheet} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function DisplayAgendaCard(props) {
    return (
        <LinearGradient
        colors={['#1A55D7', '#A8BB46']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.eventCardContainer}
        >
            <Text style={styles.eventTimeContainer}>
                {props.time}
            </Text>
            <View style={styles.eventNameContainer}>
                <Text style={styles.eventCardText}>{props.name}</Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    eventCardContainer: {
        width: '90%',
        height: 80,
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    eventTimeContainer:{
        width: '30%',
        fontSize: 22,
        fontWeight: '600',
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center'
    },
    eventNameContainer: {
        backgroundColor: 'white',
        padding: 15,
        width: '70%',
        height: '100%',
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'center',
        elevation: 3,
    },
    eventCardText: {
        color: '#565656',
        fontWeight: '400',
        fontSize: 18,
    }
});