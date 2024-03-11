import axios from "axios";
import { URL_SERVER } from "../dataConfig";
import Cookies from "js-cookie";
export const getProblemsInHouse = async (houseId) => {
    console.log("houseId" + houseId);
    const token = Cookies.get("accessToken");
    return await axios.get(`${URL_SERVER}/problem/house/${houseId}`, {
        withCredentials: true,
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};
export const deleteProblem = async (problemId) => {
    const token = Cookies.get("accessToken");
    return await axios.delete(`${URL_SERVER}/problem/${problemId}`, {
        withCredentials: true,
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};
export const addProblemsInHouse = async (data) => {
    // console.log("houseId" + houseId);
    const token = Cookies.get("accessToken");
    return await axios.post(`${URL_SERVER}/problem/`,data, {
        withCredentials: true,
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};