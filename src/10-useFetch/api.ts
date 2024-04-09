import axios from "axios";
import { setCookie, getCookie } from "utiles/cookieUtiles";
// let checkUuid = () => {
//   if (!localStorage.getItem("uuid")) {
//     let uuid =
//       new Date().getMilliseconds() +
//       "" +
//       Math.floor(Math.random() * 1000000) +
//       new Date().getTime();
//     localStorage.setItem("uuid", uuid);
//   }
//   return localStorage.getItem("uuid");
// };

let counter = 0;

// update this in future
const myAPI = axios.create({
  baseURL: process.env["NEXT_PUBLIC_BASE_URL_API"],
  headers: {
    "Content-Type": "application/json",
  },
});
myAPI.interceptors.request.use(async (config) => {
  // if authorization was vali add authorization to the header
  let params: null | { language: string; currency: string };
  params = null;
  let authorization: any = "";
  authorization = getCookie("token") ? "Bearer " + getCookie("token") : "";
  // console.log("authorization", authorization);
  if (typeof localStorage !== "undefined") {
    const Language =
      getCookie("language") || process.env.NEXT_PUBLIC_LANGUAGE || "tr";
    const Currency =
      getCookie("currency") || process.env.NEXT_PUBLIC_CURRENCY || "TL";
    params = {
      language: Language,
      currency: Currency,
    };
    localStorage.setItem("language", Language);
    localStorage.setItem("currency", Currency);
    setCookie("language", Language, 365);
    setCookie("currency", Currency, 365);
  }
  if (authorization) {
    config.headers.Authorization = authorization;
    if (params) config.params = { ...config.params, ...params };
    return Promise.resolve(config);
  }
  if (params) config.params = { ...config.params, ...params };
  return config;
});
myAPI.interceptors.response.use(
  function (response) {
    counter = 0;
    return response;
  },
  async function (error) {
    if (error.response) {
      const {
        config,
        response: { status },
      } = error;
      const originalRequest = config;
      if (
        status === 401 &&
        counter <= 5 &&
        config.url !== `user` &&
        config.url !== `logout`
        // config.url !== `users/token/refresh/`
      ) {
        counter++;
        // refresh token here
        return new Promise((resolve) => {
          //   if (user.access)
          //  originalRequest.headers["Authorization"] = "Bearer " + user.access;
          if (typeof localStorage !== "undefined") {
            localStorage.setItem("token", "");
          }
          originalRequest.headers["Authorization"] = "";
          resolve(myAPI(originalRequest));
        });
      } else return Promise.reject(error);
    } else return Promise.reject(error);
  }
);
export const API = myAPI;
