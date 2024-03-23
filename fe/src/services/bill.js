import axios from "axios";
import { URL_SERVER } from "../dataConfig";
import Cookies from "js-cookie";

export const getDebt = async (roomId) => {
    const token = Cookies.get("accessToken");
    return await axios.get(`${URL_SERVER}/bill/debt/room/${roomId}`, {
        withCredentials: true,
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};

export const addBill = async (roomId, data) => {
    const token = Cookies.get("accessToken");
    return await axios.post(`${URL_SERVER}/bill/room/${roomId}`, data, {
        withCredentials: true,
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};

export const getBills = async (params) => {
    const token = Cookies.get("accessToken");
    const queryParams = new URLSearchParams(params).toString();
    return await axios.get(`${URL_SERVER}/bill?${queryParams}`, {
        withCredentials: true,
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};
export const confirmBill = async (billId,data) => {
    const token = Cookies.get("accessToken");
    return await axios.post(`${URL_SERVER}/bill/${billId}`, data, {
        withCredentials: true,
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};

export const getBill = async (billId) => {
    const token = Cookies.get("accessToken");
    return await axios.get(`${URL_SERVER}/bill/${billId}`, {
        withCredentials: true,
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};