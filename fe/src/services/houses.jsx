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
export const AddOrtherUtilService = async (data) => {
  const token = Cookies.get("accessToken");
  return await axios.post(`${URL_SERVER}/utilities/otherUtilities`, data, {
    withCredentials: true,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
export const GetHouseService = async (page, limit) => {
  const token = Cookies.get("accessToken");
  return await axios.get(`${URL_SERVER}/house?option=all`, {
    params: {
      page: ++page,
      limit: limit,
    },
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

export const AddPriceItem = async (houseId, data) => {
  const token = Cookies.get("accessToken");
  return await axios.put(`${URL_SERVER}/house/${houseId}/addPriceItem`, data, {
    withCredentials: true,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const RemovePriceItem = async (houseId, priceItemId, data) => {
  const token = Cookies.get("accessToken");
  return await axios.put(
    `${URL_SERVER}/house/${houseId}/removePriceItem/${priceItemId}`,
    data,
    {
      withCredentials: true,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
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
  return await axios.get(`${URL_SERVER}/utilities/`, {
    withCredentials: true,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
export const AddRoomsFileService = async ({ data }) => {
  const token = Cookies.get("accessToken");
  return await axios.post(`${URL_SERVER}/house/room`, data, {
    withCredentials: true,
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });
};

export const GetRooms = async (data, filterParams) => {
  const token = Cookies.get("accessToken");
  const queryParams = new URLSearchParams(filterParams).toString();
  return await axios.get(
    `${URL_SERVER}/house/${data}/room?option=all&${queryParams}`,
    {
      withCredentials: true,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getRoomWithBills = async (houseId, filterParams) => {
  const token = Cookies.get("accessToken");
  const queryParams = new URLSearchParams(filterParams).toString();
  return await axios.get(
    `${URL_SERVER}/house/${houseId}/getRoomWithBills?${queryParams}`,
    {
      withCredentials: true,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const GetUtilitiesOther = async () => {
  const token = Cookies.get("accessToken");
  return await axios.get(`${URL_SERVER}/utilities/otherUtilities`, {
    withCredentials: true,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const AddRoom = async (data, id) => {
  console.log(data, "data");
  const token = Cookies.get("accessToken");
  return await axios.post(`${URL_SERVER}/house/room/addOne/${id}`, data, {
    withCredentials: true,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
export const AddUtilitiesOther = async (data) => {
  const token = Cookies.get("accessToken");
  return await axios.post(`${URL_SERVER}/utilities/otherUtilities`, data, {
    withCredentials: true,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const getOneRoom = async (id) => {
  const token = Cookies.get("accessToken");
  return await axios.get(`${URL_SERVER}/house/room/${id}`, {
    withCredentials: true,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const removeRoom = async (id) => {
  const token = Cookies.get("accessToken");
  return await axios.delete(`${URL_SERVER}/house/room/${id}`, {
    withCredentials: true,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const getFloor = async (houseId) => {
  const token = Cookies.get("accessToken");
  return await axios.get(`${URL_SERVER}/house/${houseId}/floor`, {
    withCredentials: true,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const addMember = async (roomId, formData) => {
  const token = Cookies.get("accessToken");
  return await axios.post(
    `${URL_SERVER}/house/room/${roomId}/member`,
    formData,
    {
      withCredentials: true,
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    }
  );
};

export const removeMember = async (memberId, roomId) => {
  const token = Cookies.get("accessToken");
  return await axios.put(
    `${URL_SERVER}/house/room/${roomId}/delete/member`,
    {
      memberId,
    },
    {
      withCredentials: true,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};
export const GetOneHouse = async (houseId) => {
  const token = Cookies.get("accessToken");
  return await axios.get(`${URL_SERVER}/house/${houseId}`, {
    withCredentials: true,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const getMember = async (memberId, roomId) => {
  const token = Cookies.get("accessToken");
  return await axios.get(
    `${URL_SERVER}/house/room/${roomId}/member/${memberId}`,
    {
      withCredentials: true,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateInfoMember = async (roomId, formData) => {
  const token = Cookies.get("accessToken");
  return await axios.put(
    `${URL_SERVER}/house/room/${roomId}/member`,
    formData,
    {
      withCredentials: true,
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    }
  );
};
export const getMemberShipInHouse = async (houseId) => {
  const token = Cookies.get("accessToken");
  return await axios.get(`${URL_SERVER}/house/${houseId}/membership`, {
    withCredentials: true,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
