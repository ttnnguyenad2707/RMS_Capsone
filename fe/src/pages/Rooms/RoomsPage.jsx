import RoomsNavbar from "./Component/RoomsNavbar";
import CommonRooms from "./Component/CommonRooms";
import { useDispatch, useSelector } from "react-redux";
import { fetchHouses } from "../../reduxToolkit/HouseSlice";
import { fetchRooms } from "../../reduxToolkit/RoomSlice";
import RoomsRenter from "./Component/RoomsRenter";
import * as React from "react";
const RoomsPage = () => {
  const [housesSelect, setHouseSelect] = React.useState();
  const [houseId, setHouseId] = React.useState();
  const houses = useSelector((state) => state.house.houses);
  const userData = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const selectHouse = (housesId) => {
    console.log(housesId,"housesId");
    setHouseId(housesId);
    const selectHouse = houses.find((h) => h.id === housesId);
    setHouseSelect(selectHouse);
  };
  React.useEffect(() => {
    if (userData.accountType == "owner") {
      dispatch(fetchHouses());
    }
  }, []);
  React.useEffect(() => {
    dispatch(fetchRooms({ houseId }));
  }, [housesSelect]);
  return (
    <div style={{ backgroundColor: "#F1F2F7", padding: "30px", width: "100%" }}>
      {userData.accountType == "owner" ? (
        <>
          <div
            style={{
              padding: "10px",
              backgroundColor: "#FFFFFF",
              boxShadow: "4px 4px 5px 5px rgba(0, 0, 0, 0.1)",
            }}
            className="mb-3"
          >
            <RoomsNavbar dataHouse={houses} selectHouse={selectHouse} />
          </div>
          <div style={{ boxShadow: "4px 4px 5px 5px rgba(0, 0, 0, 0.1)" }}>
            <CommonRooms houseData={housesSelect} />
          </div>
        </>
      ) : (
        <RoomsRenter />
      )}
      {/* <div>
        {housesSelect? ():()}
      </div> */}
    </div>
  );
};
export default RoomsPage;
