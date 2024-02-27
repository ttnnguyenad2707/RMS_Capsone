import RoomsNavbar from "./Component/RoomsNavbar";
import CommonRooms from "./Component/CommonRooms";
import { GetHouseService,GetRooms } from "../../services/houses";
import * as React from "react";
import assert from "assert";
const RoomsPage = () => {
  const [houses, setHouse] = React.useState();
  const [roomsList, setRoomsList] = React.useState();
  const [housesSelect, setHouseSelect] = React.useState();
  const [houseId, setHouseId] = React.useState();
  const [rooms, setRooms] = React.useState();
  const GetHouse = async () => {
    try {
      const result = (await GetHouseService()).data.data.houses;
      setHouse(result);
    } catch (error) {
      console.log(error);
    }
  };

  const selectHouse = (housesId) => {
    console.log(housesId,"hihi");
    setHouseId(housesId)
    const selectHouse = houses.find((h)=> h._id === housesId);
    setHouseSelect(selectHouse);
  }
  const GetRoomsService = async()=> {
    try {
      const data = (await GetRooms(houseId)).data.data.room;
      setRooms(data)
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    GetHouse();
  }, []);
  React.useEffect(() => {
    GetRoomsService();
  }, [housesSelect]);
  console.log(housesSelect,"hihi");
  return (
    <div  style={{ backgroundColor: "#F1F2F7", padding: "30px", width: "100%" }} >
      <div style={{padding: "10px", backgroundColor: "#FFFFFF",  boxShadow: "4px 4px 5px 5px rgba(0, 0, 0, 0.1)"  }} className="mb-3">
        <RoomsNavbar dataHouse={houses} selectHouse={selectHouse}/>
      </div>
      <div style={{boxShadow: "4px 4px 5px 5px rgba(0, 0, 0, 0.1)"}}>
        <CommonRooms houseData={housesSelect} roomsData={rooms}/>
      </div>
      {/* <div>
        {housesSelect? ():()}
      </div> */}
    </div>
  );
};
export default RoomsPage;
