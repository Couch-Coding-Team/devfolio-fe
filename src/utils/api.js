import axios from "axios";

const api = axios.create({
  baseURL: "https://devfolio.link:1337",
});

export default api;
