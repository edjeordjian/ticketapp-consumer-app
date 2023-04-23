import {REACT_APP_BACKEND_HOST_DEV,
        REACT_APP_BACKEND_HOST_PROD} from "react-native-dotenv";

const BACKEND_HOST = (__DEV__)
    ? REACT_APP_BACKEND_HOST_DEV
    : REACT_APP_BACKEND_HOST_PROD;

const APP_OWNER = "tdp2-grupo4";

const APP_NAME = "TicketApp";

export {
    BACKEND_HOST, APP_OWNER, APP_NAME
};
