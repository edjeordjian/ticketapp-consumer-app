import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { FIREBASE_CONFIG } from "../../constants/dataConstants";
import {FIREBASE_URL} from "../../constants/URLs";

// Add SDKs for Firebase
// https://firebase.google.com/docs/web/setup#available-libraries

const app = initializeApp(FIREBASE_CONFIG);

const getFirebaseUserData = async (googleAuth) => {
    const userInfoResponse = await fetch(FIREBASE_URL, {
        headers: {
            Authorization: `Bearer ${googleAuth.accessToken}`
        }
    });

    return userInfoResponse.json();
};

const auth = getAuth(app);

export {
    app, auth, getFirebaseUserData
};
