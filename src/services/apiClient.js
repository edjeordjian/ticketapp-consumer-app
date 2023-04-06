import axios from "axios";
import AppStorage from "../AppStorage";
import { BACKEND_HOST } from "../constants/generalConstants";
import { SIGN_IN_URL } from "../constants/URLs";

export default class apiClient {
  constructor() {
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

  getEventsList(query, onResponse, onError) {
    // Sumar query
    const anEvent = {
      id: '234',
      address : "Monumental",
      hour : "20:00hs",
      date : "24/12/2022",
      imageUri : 'https://www.dfentertainment.com/wp-content/uploads/2022/06/LOLLA_1920x720-DF-1536x576.png'
    }
    onResponse([anEvent, anEvent]);
    return
    this.call_get(`${BACKEND_HOST}${SIGN_IN_URL}`, query, onResponse, onError);
  }

  // ==========================================SEE EVENT==========================================

  getEventInfo(eventId, onResponse, onError) {
    const anEvent = {
      address : "Monumental",
      hour : "20:00hs",
      date : "24/12/2022",
      labels : ['Musica', 'Diversion'],
      agendaEntries: [{name: 'Cenar', time: '12:00'}],
      imagesUri : ['https://www.dfentertainment.com/wp-content/uploads/2022/06/LOLLA_1920x720-DF-1536x576.png',
      'https://resizer.glanacion.com/resizer/bHxdQrLXjonaGNlzDA3rUJzdFcc=/1200x800/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/45MJFALP6FCS3LDG2YHOOOW6WQ.jpg']
    }
    onResponse(anEvent);
    return
    this.call_get(`${BACKEND_HOST}${SIGN_IN_URL}`, {}, onResponse, onError);
  }

  // ============================================PROFILE============================================
  getUserDetail(onResponse, onError) {
    AppStorage.retrieveData("token").then((token) => {
      axios
        .get(`${this._base_url}/usuarios/user/detail`, {
          headers: {
            Authorization: `Token ${token}`,
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
}