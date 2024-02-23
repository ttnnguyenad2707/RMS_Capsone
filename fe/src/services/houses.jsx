import axios from "axios";
import { URL_SERVER } from "../dataConfig";
import Cookies from "js-cookie";
export const AddHouseService = async (data) => {
  const token = Cookies.get("accessToken");
  return await axios.post(`${URL_SERVER}/house`, data, {
    withCredentials: true,
    headers: {
      authorization: `Bearer ${token}`,
    },
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
export const UpdateHouseService = async (data, id) => {
  const token = Cookies.get("accessToken");
  return await axios.post(`${URL_SERVER}/house/${id}`, data, {
    withCredentials: true,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
export const DeleteHouseService = async (id) => {
    const token = Cookies.get("accessToken");
    return await axios.delete(`${URL_SERVER}/house/${id}`, {
      withCredentials: true,
      headers: {
        authorization: `Bearer ${token}`,
      },
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
export const AddRoomsFileService = async ({data}) => {
    const token = Cookies.get("accessToken");
    return await axios.post(`${URL_SERVER}/house/room`,data, {
      withCredentials: true,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };

  export const GetRooms = async (data) => {
    const token = Cookies.get("accessToken");
    return await axios.get(`${URL_SERVER}/house/room/`, data,{
      withCredentials: true,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };