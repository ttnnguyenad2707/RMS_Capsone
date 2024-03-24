import axios from "axios";
import { URL_SERVER } from "../dataConfig";
import Cookies from "js-cookie";

export const statisticGeneral = async () => {
    const token = Cookies.get("accessToken");
    return await axios.get(`${URL_SERVER}/statistic/general`, {
        withCredentials: true,
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};

export const statisticBills = async (filterParams) => {
    const token = Cookies.get("accessToken");
    const queryParams = new URLSearchParams(filterParams).toString();
    return await axios.get(`${URL_SERVER}/statistic/bills?${queryParams}`, {
        withCredentials: true,
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};
export const statisticProblem = async (filterParams) => {
    const token = Cookies.get("accessToken");
    const queryParams = new URLSearchParams(filterParams).toString();
    return await axios.get(`${URL_SERVER}/statistic/problems?${queryParams}`, {
        withCredentials: true,
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};

export const statisticRevenue = async () => {
    const token = Cookies.get("accessToken");
    return await axios.get(`${URL_SERVER}/statistic/revenue`, {
        withCredentials: true,
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
}; 