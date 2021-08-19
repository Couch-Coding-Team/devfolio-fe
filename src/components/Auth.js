import React, { useEffect, useState } from "react";
import axios from "axios";
import { firebaseAuth } from "../utils/firebaseAuth";
import { generateRandomAvatarUrl } from "../utils/avatarGenerator";
import { UserContext } from "../AppContext";
import BlankPage from "./BlankPage";

const Auth = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) setLoading(false);
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      const fbUid = await firebaseSignIn();
      const strapiUser = await fetchUser(fbUid);
      if (strapiUser) {
        setUser({ id: strapiUser.id, avatarUrl: strapiUser.avatar_url });
      } else {
        // 회원가입
        const timestamp = Date.now();
        const username = fbUid.slice(0, 5) + timestamp.toString().slice(-5);
        const newUser = {
          email: username + "@gmail.com",
          password: username,
          username,
          firebase_uid: fbUid,
          avatar_url: generateRandomAvatarUrl(),
        };
        const user = await registerUser(newUser);
        setUser({ id: user.id, avatarUrl: user.avatar_url });
      }
    };
    fetchData();
  }, []);

  const firebaseSignIn = async () => {
    try {
      const { user } = await firebaseAuth.signInAnonymously();
      return user.uid;
    } catch (e) {
      console.error("error signing in firebase: ", e);
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
      console.error("error fetching strapi user: ", e);
    }
  };

  const registerUser = async (data) => {
    try {
      const res = await axios.post(
        "https://devfolio.link:1337/auth/local/register",
        data
      );
      return res.data.user;
    } catch (e) {
      console.error("error resgistering strapi user: ", e);
    }
  };

  return (
    <UserContext.Provider value={user}>
      {loading ? <BlankPage content="Loading..." /> : children}
    </UserContext.Provider>
  );
};

export default Auth;
