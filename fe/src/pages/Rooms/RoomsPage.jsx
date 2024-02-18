import RoomsNavbar from "./Component/RoomsNavbar";
import CommonRooms from "./Component/CommonRooms";
const RoomsPage = () => {
  return (
    <div>
      <div style={{ backgroundColor: "#F1F2F7", padding: "10px" }} className="mb-5">
        <RoomsNavbar />
      </div>
      <div>
        <CommonRooms/>
      </div>
    </div>
  );
};
export default RoomsPage;
