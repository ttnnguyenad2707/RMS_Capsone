import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import GeneralInfo from "../DetailRoom/GeneralInfo";
import RenterInfo from "../DetailRoom/RenterInfo";
import ListBill from "../DetailRoom/ListBill";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneRoomRedux } from "../../../reduxToolkit/RoomSlice";
const RoomsRenter = () => {
  //   const [room, setRoom] = useState({});
  const [value, setValue] = useState(1);
  const room = useSelector((state) => state.room.rooms);
  const userData = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const GetRoomsRenter = async () => {
    try {
      const roomsId = userData.roomId;
      const respone = await dispatch(getOneRoomRedux({ roomsId }));
      console.log(respone, "respone");
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    GetRoomsRenter();
  }, []);
  const style = {
    bgcolor: "background.paper",
    boxShadow: 10,
    pt: 2,
    px: 4,
    pb: 3,
    width: "100%",
  };
  return (
    <Box sx={{ ...style }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Thông tin phòng" value={1} />
        <Tab label="Khách thuê" value={2} />
        <Tab label="Thông tin hoá đơn" value={3} />
        <Tab label="Vấn đề" value={4} />
      </Tabs>
      <GeneralInfo value={value} index={1} room={room} />
      <RenterInfo value={value} index={2} room={room} />
      <ListBill value={value} index={3} room={room} />
    </Box>
  );
};
export default RoomsRenter;
