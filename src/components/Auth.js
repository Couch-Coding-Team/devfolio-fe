import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

import { UserContext } from "../AppContext";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "couchcoding-3f4cd.firebaseapp.com",
  databaseURL: "https://couchcoding-3f4cd.firebaseio.com",
  projectId: "couchcoding-3f4cd",
  storageBucket: "couchcoding-3f4cd.appspot.com",
  messagingSenderId: "571845955660",
  appId: "1:571845955660:web:0931cbd2da618bb28ee4e9",
  measurementId: "G-1W81K7RMHF",
};

firebase.initializeApp(firebaseConfig);

const Auth = ({ children }) => {
  const defaultValue = "dark";
  // const user = firebase.auth().currentUser;
  // console.log(user);
  firebase
    .auth()
    .signInAnonymously()
    .then(() => {
      console.log("signed in");
      // uid를 받아와서
      // strapi에 유저 생성

      // Signed in..
      // localStorage.setItem(
      //   "toekn",
      //   "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImFlMDVlZmMyNTM2YjJjZTdjNTExZjRiMTcyN2I4NTkyYTc5ZWJiN2UiLCJ0eXAiOiJKV1QifQ.eyJwcm92aWRlcl9pZCI6ImFub255bW91cyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9jb3VjaGNvZGluZy0zZjRjZCIsImF1ZCI6ImNvdWNoY29kaW5nLTNmNGNkIiwiYXV0aF90aW1lIjoxNjI4NTA4NTEzLCJ1c2VyX2lkIjoidXNRNXVFQlZSeE9Vb09lYUlhc0N3bjh4S2RsMiIsInN1YiI6InVzUTV1RUJWUnhPVW9PZWFJYXNDd244eEtkbDIiLCJpYXQiOjE2Mjg2NTk5NTYsImV4cCI6MTYyODY2MzU1NiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6e30sInNpZ25faW5fcHJvdmlkZXIiOiJhbm9ueW1vdXMifX0.CDxhR9d_81NIXbQBW2J8zPk2TAUifwzBSVsUZNfvyb8i-wvw5WcPrOwCJR8-puYlQWx8LTaklOjd6S6xpImhRCw8uRPf_FzYt90IVwhwrCNUW6aOpywCwdPkPG8r7IhwOKGlzvaE2VYpPwtw47ManlhqaiTBYyZuznkCKOBpkwtkeanqxI4EEywQBhSPoa6RioTkO9NuF4g95FFoeydbShDwbKtW88B1w_lZ7sxNFm2tIYtLAPFa389Y5PShZPZsM64_n04Y9879ySx57KDD-zh6bIJziCYp0MK_GgDzFTjt7ompSArBBLqj8M_RzWaHAMvEnHV_GFU7_2JvbBvP7g"
      // );
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });

  // if (user) {
  //   // User is signed in, see docs for a list of available properties
  //   // https://firebase.google.com/docs/reference/js/firebase.User
  //   // ...
  //   user
  //     .getIdToken(/* forceRefresh */ true)
  //     .then(function (idToken) {
  //       console.log("token", idToken);
  //       // Send token to your backend via HTTPS
  //       // ...
  //     })
  //     .catch(function (error) {
  //       // Handle error
  //     });
  // } else {
  //   // No user is signed in.
  // }
  return (
    <UserContext.Provider value={defaultValue}>{children}</UserContext.Provider>
  );
};

export default Auth;
