import axios from "axios";
import { URL_SERVER } from "../dataConfig";

export const AddHouseService = async (data) => {
    return await axios.post(`${URL_SERVER}/house`, data, {
      withCredentials: true,
    });
  };