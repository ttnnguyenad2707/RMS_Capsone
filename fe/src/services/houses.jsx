import axios from "axios";
import { URL_SERVER } from "../dataConfig";
import Cookies from "js-cookie";
export const AddHouseService = async (data) => {
  return await axios.post(`${URL_SERVER}/house`, data, {
    withCredentials: true,
  });
};
export const GetHouseService = async () => {
  const token = Cookies.get("accessToken");
  return await axios.get(`${URL_SERVER}/house`, {
    withCredentials: true,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
export const UpdateHouseService = async (data) => {
  return await axios.post(`${URL_SERVER}/house`, data, {
    withCredentials: true,
  });
};

export const GetUtilities = async () => {
  const token = Cookies.get("accessToken");
  return await axios.get(`${URL_SERVER}/house`, {
    withCredentials: true,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
