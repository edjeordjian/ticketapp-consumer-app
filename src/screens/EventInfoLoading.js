import { ActivityIndicator, View, StyleSheet } from "react-native";

export default function EventInfoLoading(props) {
    return (
            <View style={styles.containerMock}>
                <View style={styles.imageLoaderContainer}>
                </View>
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#00ff00"/>
                </View>
            </View>
        )
}

const styles = StyleSheet.create({
    containerMock: {
        width: '100%',
        height: '100%'
    },
    imageLoaderContainer: {
        marginBottom: 15,
        height: 300,
        backgroundColor: '#ccced1'
    },
    loaderContainer: {
        display: 'flex',
        height: '100%',
        marginTop: '50%'
    },
});