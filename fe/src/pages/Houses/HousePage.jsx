import DenseTable from "./Component/Table";
import BasicModal from "./Component/Popup";
const HousePage = () => {
  return (
    <div  style={{ backgroundColor: "#F1F2F7", padding: "20px", width: "100%" }}>
      <div className="d-flex">
        <BasicModal />
      </div>
      <DenseTable />
    </div>
  );
};

export default HousePage;
