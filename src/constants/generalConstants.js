import {REACT_APP_USERS_HOST_DEV,
        REACT_APP_USERS_HOST_PROD} from "react-native-dotenv";

/* Backend hosts */
const USERS_HOST = (__DEV__)
    ? REACT_APP_USERS_HOST_DEV
    : REACT_APP_USERS_HOST_PROD;

export {
    USERS_HOST
};
