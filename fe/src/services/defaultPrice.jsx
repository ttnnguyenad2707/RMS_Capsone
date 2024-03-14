import axios from "axios";
import { URL_SERVER } from "../dataConfig";
import Cookies from "js-cookie";
export const AddDefaultPriceService = async (data) => {
  console.log(data, "service");
  const token = Cookies.get("accessToken");
  return await axios.post(`${URL_SERVER}/defaultPrice`, data, {
    withCredentials: true,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
export const GetAllDefaultPriceService = async () => {
    const token = Cookies.get("accessToken");
    return await axios.get(`${URL_SERVER}/defaultPrice`,  {
      withCredentials: true,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };
  export const GetOneDefaultPriceService = async (id) => {
    const token = Cookies.get("accessToken");
    return await axios.get(`${URL_SERVER}/defaultPrice/${id}`,{
      withCredentials: true,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };