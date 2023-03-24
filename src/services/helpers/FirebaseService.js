import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { FIREBASE_CONFIG } from "../../constants/dataConstants";

// Add SDKs for Firebase
// https://firebase.google.com/docs/web/setup#available-libraries

const app = initializeApp(FIREBASE_CONFIG);

const auth = getAuth(app);

export {
    app, auth
};
