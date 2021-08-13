import React, { useEffect, useState } from "react";
import axios from "axios";
import { firebaseAuth } from "../utils/firebaseAuth";
import { UserContext } from "../AppContext";

const Auth = ({ children }) => {
  const [userId, setUserId] = useState(undefined);

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
        const user = await registerUser({
          email: username + "@gmail.com",
          password: "anonymous",
          username,
          firebase_uid: fbUid,
        });
        setUserId(user.id);
      }
    };
    fetchData();
  }, []);

  const firebaseSignIn = async () => {
    const { user } = await firebaseAuth.signInAnonymously();
    return user.uid;
  };

  const fetchUser = async (fbUid) => {
    const res = await axios.get("https://devfolio.link:1337/users", {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ADMIN_JWT}`,
      },
      params: {
        firebase_uid: fbUid,
      },
    });
    return res.data[0];
  };

  const registerUser = async (data) => {
    const res = await axios.post(
      "https://devfolio.link:1337/auth/local/register",
      data
    );
    return res;
  };

  // .catch((error) => {
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   // ...
  // });

  return <UserContext.Provider value={userId}>{children}</UserContext.Provider>;
};

export default Auth;
