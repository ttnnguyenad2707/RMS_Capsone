import axios from "axios";
import { URL_SERVER } from "../dataConfig";

export const loginService = async (data) => {
  return await axios.post(`${URL_SERVER}/auth/login`, data, {
    withCredentials: true,
  });
};
// export const loginGoogleService = async (data) => {
//     return await axios.get(`${URL_SERVER}/auth/login`, data, {
//       withCredentials: true,
//     });
//   };
export const registerService = async (data) => {
  return await axios.post(`${URL_SERVER}/auth/register`, data, {
    withCredentials: true,
  });
};

export const getCurrentUser = async (token) => {
  return await axios.get(`${URL_SERVER}/account/profile`, {
    withCredentials: true,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
