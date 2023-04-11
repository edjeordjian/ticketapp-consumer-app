import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function EventBox(props) {
    let event = props.eventInfo;

    const navigateToEvent = () => {
        props.navigation.navigate('SeeEvent', {
            'eventId': event.id
        });
    }

    return (
            <View style={styles.container}>
                <TouchableOpacity onPress={navigateToEvent}>
                    <Image source={{uri:event.imageUri}} style={styles.image}/>
                    <Text style={styles.nameTitle}>{event.name}</Text>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoPlaceContainer}>
                            <View style={styles.infoRow}>
                                <Feather name="map-pin" size={24} color="#747474" />
                                <Text style={styles.infoTextRow}>{event.address}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Feather name="clock" size={24} color="#747474" />
                                <Text style={styles.infoTextRow}>{event.hour}</Text>
                            </View>
                        </View>
                        <View style={styles.dateContainer}>
                            <Text style={styles.date}>{event.date}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        width: '90%',
        borderRadius: 25,
        shadowOffset: {width: -2, height: 4},  
        shadowColor: '#171717',  
        shadowOpacity: 0.2,  
        shadowRadius: 3,  
    },
    infoContainer: {
        display: 'flex',
        padding: 15,
        flexDirection: 'row'
    },
    nameTitle: {
        marginLeft: 15,
        marginTop: 10,
        fontWeight: 600,
        fontSize: 18,
        color: '#565656',
    },
    infoPlaceContainer: {
        flex:1
    },
    dateContainer: {
        flex:1,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 25
    },
    infoRow: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10
    },
    infoTextRow: {
        color: '#747474',
        marginLeft: 5
    },
    date: {
        backgroundColor: '#E6A0FF',
        borderRadius: 25,
        color: 'white',
        textAlign: 'center',
        width: '80%',
        alignSelf: 'flex-end'
    }
});