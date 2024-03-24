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
export const getProblemsInRoomOfRenter = async (roomId) => {
    console.log("caller");
    const token = Cookies.get("accessToken");
    return await axios.get(`${URL_SERVER}/problem/room/${roomId}`, {
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
export const updateStatusProblemsInHouse = async (problemId,data) => {
    // console.log("houseId" + houseId);
    const token = Cookies.get("accessToken");
    return await axios.put(`${URL_SERVER}/problem/${problemId}`,data, {
        withCredentials: true,
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};


export const getDetailProblem = async (problemId) => {
    // console.log("caller");
    const token = Cookies.get("accessToken");
    return await axios.get(`${URL_SERVER}/problem/${problemId}`, {
        withCredentials: true,
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};