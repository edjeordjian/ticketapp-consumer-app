import {JSON_HEADER} from "../../constants/services/requestConstants";

const {APP_CANNOT_SEND_ERR_LBL} = require("../../constants/messages");

// response.json() is a promise!
const postTo = (endpoint, body) => {
    return fetch(endpoint, {
            method: "POST",
            headers: JSON_HEADER,
            body: JSON.stringify(body)
        }
    ).then(response => {
            return response.json()
        }
    ).catch(error => {
        let errorToShow = error.toString();

        if (errorToShow.includes("JSON")) {
            errorToShow = APP_CANNOT_SEND_ERR_LBL;
        }

        return {
            error: errorToShow
        };
    } );
}

export {
    postTo
}