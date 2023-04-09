import axios from "axios";
import { BACKEND_HOST } from "../constants/generalConstants";
import { SIGN_IN_URL, GET_EVENT_URL, GET_EVENTS_URL } from "../constants/URLs";
import EventListResponse from "./responses/EventListResponse";
import EventResponse from "./responses/EventResponse";

export default class apiClient {
  constructor(token) {
    this._token = token;
  }

  // Get general
  call_get(url, params, onResponse, onError) {
    axios.get(url, {
          params: params,
          headers: {
            'Expo': "true",
            'Authorization': `Bearer ${this._token}`,
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
  }

  // Post general
  call_post(url, data, onResponse, onError) {
    axios.post(url, data, {
          headers: {
            'Expo': "true",
            'Authorization': `Bearer ${this._token}`,
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
  }

  call_delete(url, onResponse, onError) {
    axios.delete(url, {
          headers: {
            'Expo': "true",
            'Authorization': `Bearer ${this._token}`,
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
  }

  call_patch(url, data, onResponse, onError) {
    axios.patch(url, data, {
          headers: {
            'Expo': "true",
            'Authorization': `Bearer ${this._token}`,
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
  }

  // ==========================================USER SEARCH==========================================

  logIn(requestBody, onResponse, onError) {
    console.log(`${BACKEND_HOST}${SIGN_IN_URL}`);
    axios.post(`${BACKEND_HOST}${SIGN_IN_URL}`, requestBody, {
      headers: {
        'Expo': "true",
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
  }

  // ==========================================USER SEARCH==========================================

  getEventsList(onResponse, onError, query, owner) {
    //onResponse(new EventListResponse({'events': []}));
    //return;
    const _onResponse = (res) => {onResponse( new EventListResponse(res.data))}
    let params = {}
    if (query) {
      params.value = query;
    }
    if (owner) {
      params.owner = owner;
    }
    this.call_get(`${BACKEND_HOST}${GET_EVENTS_URL}`, params, _onResponse, onError);
  }

  // ==========================================SEE EVENT==========================================

  getEventInfo(eventId, onResponse, onError) {
    //onResponse(new EventResponse({}));
    const _onResponse = (res) => {onResponse( new EventResponse(res.data))}
    this.call_get(`${BACKEND_HOST}${GET_EVENT_URL}`, {eventId: eventId}, _onResponse, onError);
  }

}