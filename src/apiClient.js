import axios from "axios";
import AppStorage from "./AppStorage";

export default class apiClient {
  constructor() {
    this._base_url = 'http://localhost:5060/dispatch';
  }

  // Get general
  call_get(url, onResponse, onError) {
    AppStorage.retrieveData("token").then((token) => {
      axios
        .get(url, {
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

  // Post general
  call_post(url, data, onResponse, onError) {
    AppStorage.retrieveData("token").then((token) => {
      axios
        .post(url, data, {
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

  call_delete(url, onResponse, onError) {
    AppStorage.retrieveData("token").then((token) => {
      axios
        .delete(url, {
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

  call_patch(url, data, onResponse, onError) {
    AppStorage.retrieveData("token").then((token) => {
      axios
        .patch(url, data, {
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

  // ==========================================USER SEARCH==========================================

  getEventsList(query, onResponse, onError) {
    axios
      .get(`${this._base_url}/eventos/lista`, {
        params: {
          query: query,
        },
      })
      .then((response) => {
        onResponse(response);
      })
      .catch((err) => {
        onError(err);
      });
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