import * as Location from "expo-location";

async function requestLocation() {
    try {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            //alert habilitar
            return null;
        }

        const location =  await Location.getCurrentPositionAsync({});

        return {
            "latitude": location.coords.latitude,
            "longitude": location.coords.longitude
        }

    } catch (error) {
        //alert habilitar
        return null
    }
}

export {
    requestLocation
};
