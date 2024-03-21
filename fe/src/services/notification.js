import axios from "axios";
import { URL_SERVER } from "../dataConfig";
import Cookies from "js-cookie";

export const getNotification = async () => {
    const token = Cookies.get("accessToken");
    return await axios.get(`${URL_SERVER}/notification`, {
        withCredentials: true,
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};