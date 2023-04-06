import axios from "axios";
import AppStorage from "../AppStorage";
import { BACKEND_HOST } from "../constants/generalConstants";
import { SIGN_IN_URL, GET_EVENT_URL, GET_EVENTS_URL } from "../constants/URLs";
import EventListResponse from "./responses/EventListResponse";
import EventResponse from "./responses/EventResponse";

export default class apiClient {
  constructor(token) {
    this._token = token;
    this._base_url = 'http://localhost:5060/dispatch';
  }

  // Get general
  call_get(url, params, onResponse, onError) {
    AppStorage.retrieveData("token").then((token) => {
      axios
        .get(url, {
          params: params,
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        })
        .then((response) => {
          onResponse(response);
        })
        .catch((err) => {
          onError(err);
        });
    });
  }

  // Post general
  call_post(url, data, onResponse, onError) {
    AppStorage.retrieveData("token").then((token) => {
      axios
        .post(url, data, {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        })
        .then((response) => {
          onResponse(response);
        })
        .catch((err) => {
          onError(err);
        });
    });
  }

  call_delete(url, onResponse, onError) {
    AppStorage.retrieveData("token").then((token) => {
      axios
        .delete(url, {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        })
        .then((response) => {
          onResponse(response);
        })
        .catch((err) => {
          onError(err);
        });
    });
  }

  call_patch(url, data, onResponse, onError) {
    AppStorage.retrieveData("token").then((token) => {
      axios
        .patch(url, data, {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        })
        .then((response) => {
          onResponse(response);
        })
        .catch((err) => {
          onError(err);
        });
    });
  }

  // ==========================================USER SEARCH==========================================

  logIn(requestBody, onResponse, onError) {
    this.call_post(`${BACKEND_HOST}${SIGN_IN_URL}`, requestBody, onResponse, onError);
  }

  // ==========================================USER SEARCH==========================================

  getEventsList(onResponse, onError, query, owner) {
    onResponse(new EventListResponse({'events': []}));
    return;
    const  _onResponse = (res) => {onResponse( new EventListResponse(res))}
    let params = {}
    if (query) {
      params.q = query;
    }
    if (owner) {
      params.owner = owner;
    }
    this.call_get(`${BACKEND_HOST}${GET_EVENTS_URL}`, params, _onResponse, onError);
  }

  // ==========================================SEE EVENT==========================================

  getEventInfo(eventId, onResponse, onError) {
    onResponse(new EventResponse({}));
    return
    const _onResponse = (res) => {onResponse( new EventResponse(res))}
    this.call_get(`${BACKEND_HOST}${GET_EVENT_URL}`, {eventId: eventId}, _onResponse, onError);
  }

}