import axios from "axios";
import { BACKEND_HOST } from "../constants/generalConstants";
import {SIGN_IN_URL, GET_EVENT_URL, GET_EVENTS_URL, GET_TAGS_URL, EVENT_SIGN_UP_URL} from "../constants/URLs";
import EventListResponse from "./responses/EventListResponse";
import EventResponse from "./responses/EventResponse";
import TagsResponse from "./responses/TagsResponse";

const getHeader = (token) => {
    return{
        'Expo': "true",
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
}

export default class apiClient {
  constructor(token) {
    this._token = token;
  }

  // Get general
  call_get(url, params, onResponse, onError) {
    axios.get(url, {
          params: params,
          headers: getHeader(this._token),
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
          headers:  getHeader(this._token),
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
          headers: getHeader(this._token),
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
          headers: getHeader(this._token),
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
      headers: getHeader(""),
    })
    .then((response) => {
      onResponse(response);
    })
    .catch((err) => {
      onError(err);
    });
  }

  // ==========================================USER SEARCH==========================================

  getEventsList(onResponse, onError, query, tags, owner) {
    const _onResponse = (res) => {onResponse( new EventListResponse(res.data))}
    let params = {}
    if (query) {
      params.value = query;
    }

    if (owner) {
      params.owner = owner;
    }

    if (tags) {
        params.tags = tags.join(',')
    }

    // console.log(params)

    this.call_get(`${BACKEND_HOST}${GET_EVENTS_URL}`, params, _onResponse, onError);
  }

  getUsersEventsList(onResponse, onError, userId) {
    const _onResponse = (res) => {
      onResponse( new EventListResponse(res.data))
    }
    this.call_get(`${BACKEND_HOST}${GET_EVENTS_URL}`, {asistant:userId}, _onResponse, onError);
  }

  getTagsList(onResponse, onError, userId) {
    const _onResponse = (res) => {
      onResponse( new TagsResponse(res.data));
    }
    this.call_get(`${BACKEND_HOST}${GET_TAGS_URL}`, {asistant:userId}, _onResponse, onError);
  }

  // ==========================================SEE EVENT==========================================

  getEventInfo(eventId, onResponse, onError) {
    //onResponse(new EventResponse({}));
    const _onResponse = (res) => {onResponse( new EventResponse(res.data))}
    this.call_get(`${BACKEND_HOST}${GET_EVENT_URL}`, {
            eventId: eventId
        },
        _onResponse,
        onError);
  }

  // ==========================================SIGN UP IN EVENT==========================================

  signUpInEvent(requestBody, onResponse, onError) {
      console.log(`${BACKEND_HOST}${EVENT_SIGN_UP_URL}`);
      axios.post(`${BACKEND_HOST}${EVENT_SIGN_UP_URL}`,
          requestBody, {
          headers: getHeader(this._token),
      })
          .then((response) => {
              onResponse(response);
          })
          .catch((err) => {
              onError(err);
          });
  }

}