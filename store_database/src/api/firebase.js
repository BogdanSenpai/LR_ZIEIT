import firebase from 'firebase';

export const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
};

firebase.initializeApp(config);

export const appdb = firebase.database();
