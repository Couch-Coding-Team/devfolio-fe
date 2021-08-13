import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { firebaseAuth } from "../utils/firebaseAuth";
import { UserContext } from "../AppContext";

const Auth = ({ children }) => {
  const [userId, setUserId] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) setLoading(false);
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      const fbUid = await firebaseSignIn();
      const strapiUser = await fetchUser(fbUid);
      if (strapiUser) {
        setUserId(strapiUser.id);
      } else {
        // 회원가입
        const timestamp = Date.now();
        const username = fbUid.slice(0, 5) + timestamp.toString().slice(-5);
        const newUser = {
          email: username + "@gmail.com",
          password: username,
          username,
          firebase_uid: fbUid,
        };
        const user = await registerUser(newUser);
        setUserId(user.id);
      }
    };
    fetchData();
  }, []);

  const firebaseSignIn = async () => {
    try {
      const { user } = await firebaseAuth.signInAnonymously();
      return user.uid;
    } catch (e) {
      console.error("error signing in firebase");
    }
  };

  const fetchUser = async (fbUid) => {
    try {
      const res = await axios.get("https://devfolio.link:1337/users", {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_JWT}`,
        },
        params: {
          firebase_uid: fbUid,
        },
      });
      return res.data[0];
    } catch (e) {
      console.error("error fetching strapi user");
    }
  };

  const registerUser = async (data) => {
    try {
      const res = await axios.post(
        "https://devfolio.link:1337/auth/local/register",
        data
      );
      return res;
    } catch (e) {
      console.error("error resgistering strapi user");
    }
  };

  return (
    <UserContext.Provider value={userId}>
      {loading ? (
        <CircularProgress
          variant="indeterminate"
          disableShrink
          style={{ position: "fixed", top: "50%", left: "50%" }}
        />
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};

export default Auth;
