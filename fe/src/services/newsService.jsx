import axios from "axios";
import { URL_SERVER } from "../dataConfig";
import Cookies from "js-cookie";
export const AddNewsService = async (data) => {
  console.log(data, "service");
  const token = Cookies.get("accessToken");
  return await axios.post(`${URL_SERVER}/news`, data, {
    withCredentials: true,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
export const UpdateNewsService = async (data,id) => {
  console.log(data, "service");
  const token = Cookies.get("accessToken");
  return await axios.put(`${URL_SERVER}/news/${id}`, data, {
    withCredentials: true,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
export const GetNewsService = async (id) => {
  const token = Cookies.get("accessToken");
  return await axios.get(`${URL_SERVER}/news/house/${id}`, {
    withCredentials: true,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const DeleteNewsService = async (id) => {
  const token = Cookies.get("accessToken");
  return await axios.delete(`${URL_SERVER}/news/${id}`, {
    withCredentials: true,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const AddCommentService = async (idNews, comment) => {
  console.log(comment,"comment");
  const token = Cookies.get("accessToken");
  return await axios.post(`${URL_SERVER}/news/${idNews}/comment`, comment, {
    withCredentials: true,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const GetCommentService = async (idNews) => {
  const token = Cookies.get("accessToken");
  return await axios.get(`${URL_SERVER}/news/${idNews}/comment`, {
    withCredentials: true,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
