import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import {APP_NAME, APP_OWNER} from "../../constants/generalConstants";
import {Platform} from "react-native";

let registerForPushNotifications = async ()=>{
    let token;

    if (Device.isDevice){
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            alert('No se pudo obterner un token para realizar push notifications');
            return;
        }

        token = (await Notifications.getExpoPushTokenAsync({experienceId: `@${APP_OWNER}/${APP_NAME}`})).data;

        console.log("Token notifications: ");

        console.log(token);

        // Falta guardar el token!
    }
    else {
        alert('Para realizar push notifications se necesita un dispositivo fisico');
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        }).then(nc => console.log("Se inicializó el canal de notificaciones"));
    }

    return token;
}

export {
    registerForPushNotifications
};
