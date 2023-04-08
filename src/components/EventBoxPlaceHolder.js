import { StyleSheet, Text, View } from 'react-native';

export default function EventBoxPlaceHolder(props) {

    return (
            <View style={styles.container}>
                <View style={styles.image}></View>
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
        height: 220
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 25,
        backgroundColor: '#ccced1'
    },
});