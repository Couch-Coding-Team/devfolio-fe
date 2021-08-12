import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

const cache = new InMemoryCache();
// 기본적으로 모든 리퀘스트 헤더에 토큰을 넣을지 아니면 context 별로 넣을지 생각해보기
const link = new HttpLink({
  uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
  // headers: {
  //   authorization: localStorage.getItem("token") || null,
  // },
});
const client = new ApolloClient({
  cache,
  link,
});

export default client;
