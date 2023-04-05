import { StyleSheet, Text, Image, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EventInfo(props) {
    const [imageSelected, setImageToShow] = useState(0);

    const address = "Monumental";
    const hour = "20:00hs";
    const date = "24/12/2022";
    const imagesUri = ['https://www.dfentertainment.com/wp-content/uploads/2022/06/LOLLA_1920x720-DF-1536x576.png',
    'https://resizer.glanacion.com/resizer/bHxdQrLXjonaGNlzDA3rUJzdFcc=/1200x800/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/45MJFALP6FCS3LDG2YHOOOW6WQ.jpg']
    const labels = ['Musica', 'Diversion'];

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView>
            <View style={styles.imageContainer}>
                <Image 
                source={{uri:imagesUri[imageSelected]}} 
                style={styles.image}/>
                <TouchableOpacity style={styles.viewNextImageBtn} onPress={(e) => {
                    console.log(imageSelected)
                    setImageToShow((imageSelected + 1) % imagesUri.length)
                }}>
                    <Entypo name="chevron-right" size={35} color="white" />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>
                Paramore
            </Text>
            <View style={styles.infoContainer}>
                <View style={styles.infoPlaceContainer}>
                    <View style={styles.infoRow}>
                        <Feather name="map-pin" size={24} color="#747474" />
                        <Text style={styles.infoTextRow}>{address}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Feather name="clock" size={24} color="#747474" />
                        <Text style={styles.infoTextRow}>{hour}</Text>
                    </View>
                </View>
                <View style={styles.dateContainer}>
                    <Text style={styles.date}>{date}</Text>
                </View>
            </View>
            <Text style={styles.subtitle}>
                Descripción
            </Text>
            <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            </Text>
            <View style={styles.labelsRow}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>
                        Musica
                    </Text>
                </View>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>
                        Musica
                    </Text>
                </View>
            </View>
            <Text style={styles.subtitle}>
                Agenda
            </Text>
            <View style={styles.eventContainer}>
                <View style={styles.eventCard}>
                    <Text style={styles.eventCardText}>Fiesta Loca</Text>
                    <Text>12:00hs</Text>
                </View>
                <View style={styles.eventCard}>
                    <Text style={styles.eventCardText}>Asado</Text>
                    <Text>13:00hs</Text>
                </View>
            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        //backgroundColor: '#ffffff',
        width: '100%',
    },
    title: {
        color: '#565656',
        fontWeight: '700',
        fontSize: 32,
        marginLeft: 15,
        marginTop: 15
    },
    subtitle: {
        color: '#565656',
        fontWeight: '700',
        fontSize: 22,
        marginLeft: 15,
        marginTop: 15
    },
    description: {
        marginLeft: 15,
        fontSize: 15,
        marginTop: 10,
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
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '80%'
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
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row'
    },
    eventContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    eventCard: {
        width: '90%',
        backgroundColor: 'white',
        borderColor: '#A5C91B',
        borderStyle: 'solid',
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 3,
        padding: 15
    },
    eventCardText: {
        color: '#565656',
        fontWeight: '500',
        fontSize: 15,
    }
});