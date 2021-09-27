import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "couchcoding-3f4cd.firebaseapp.com",
  databaseURL: "https://couchcoding-3f4cd.firebaseio.com",
  projectId: "couchcoding-3f4cd",
  storageBucket: "couchcoding-3f4cd.appspot.com",
  messagingSenderId: "571845955660",
  appId: "1:571845955660:web:0931cbd2da618bb28ee4e9",
  measurementId: "G-1W81K7RMHF",
};

firebase.initializeApp(firebaseConfig);
export default firebase.auth();
