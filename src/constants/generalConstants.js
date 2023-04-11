import {REACT_APP_BACKEND_HOST_DEV,
        REACT_APP_BACKEND_HOST_PROD} from "react-native-dotenv";

const BACKEND_HOST = (__DEV__)
    ? REACT_APP_BACKEND_HOST_DEV
    : REACT_APP_BACKEND_HOST_PROD;

export {
    BACKEND_HOST
};
