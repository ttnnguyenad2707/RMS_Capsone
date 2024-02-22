import RoomsNavbar from "./Component/RoomsNavbar";
import CommonRooms from "./Component/CommonRooms";
const RoomsPage = () => {
  return (
    <div  style={{ backgroundColor: "#F1F2F7", padding: "30px", width: "100%" }} >
      <div style={{padding: "10px", backgroundColor: "#FFFFFF",  boxShadow: "4px 4px 5px 5px rgba(0, 0, 0, 0.1)"  }} className="mb-3">
        <RoomsNavbar />
      </div>
      <div style={{boxShadow: "4px 4px 5px 5px rgba(0, 0, 0, 0.1)"}}>
        <CommonRooms/>
      </div>
    </div>
  );
};
export default RoomsPage;
