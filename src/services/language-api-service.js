import config from "../config";
import TokenService from "./token-service";

const languageService = {
  getLanguage() {
    return fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  getWords() {
    return fetch(`${config.API_ENDPOINT}/language/head`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  guessWord(guess) {
    fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ guess }),
    })
      .then((res) => {
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
      });    
  },
};

export default languageService;