import React, { useEffect, useState } from "react";
import {
  firebaseAuth,
  generateRandomAvatarUrl,
  generateRandomName,
  api,
} from "../utils";
import { UserContext } from "../AppContext";

const Auth = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    if (window.navigator.userAgent === "ReactSnap") return; // 빌드 중일때 회원가입 스킵

    const fetchData = async () => {
      const fbUid = await firebaseSignIn();
      const strapiUser = await fetchUser(fbUid);
      if (strapiUser) {
        if (!strapiUser.avatar_url) {
          // 기존 유저 이름 및 아바타 랜덤생성
          const user = await updateUserName(strapiUser.id);
          setUser({
            id: user.id,
            username: user.username,
            avatarUrl: user.avatar_url,
          });
        } else {
          setUser({
            id: strapiUser.id,
            username: strapiUser.username,
            avatarUrl: strapiUser.avatar_url,
          });
        }
      } else {
        // 회원가입
        const user = await registerUser(fbUid);
        setUser({
          id: user.id,
          username: user.username,
          avatarUrl: user.avatar_url,
        });
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
      const res = await api.get("/users", {
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

  const registerUser = async (fbUid) => {
    let tryCount = 1;
    const timestamp = Date.now();
    const username = fbUid.slice(0, 5) + timestamp.toString().slice(-5);

    // TODO: REFACTOR!!!
    try {
      const res = await api.post("/auth/local/register", {
        email: `${username}5@gmail.com`,
        password: username,
        firebase_uid: fbUid,
        username: generateRandomName(),
        avatar_url: generateRandomAvatarUrl(),
      });
      // 랜덤 생성된 이름이 중복되서 생성 실패한 경우 2번까지 재시도
      api.interceptors.response.use(
        (res) => res.data.user,
        async (err) => {
          // const {
          //   response: { status },
          // } = err;
          if (err.response?.status === 400 && tryCount < 3) {
            tryCount++;
            const res = await api.post("/auth/local/register", {
              email: `${username}@gmail.com`,
              password: username,
              firebase_uid: fbUid,
              username: generateRandomName(),
              avatar_url: generateRandomAvatarUrl(),
            });
            return res.data.user;
          } else {
            console.error("error retry resgistering strapi user: ", err);
          }
        }
      );
      return res.data.user;
    } catch (e) {
      console.error("error resgistering strapi user: ", e);
    }
  };

  const updateUserName = async (userId) => {
    try {
      const res = await api.put(
        `/users/${userId}`,
        {
          username: generateRandomName(),
          avatar_url: generateRandomAvatarUrl(),
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_ADMIN_JWT}`,
          },
        }
      );
      return res.data;
    } catch (e) {
      console.error("error fetching strapi user: ", e);
    }
  };

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default Auth;
