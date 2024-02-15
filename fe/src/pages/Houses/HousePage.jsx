import DenseTable from "./Component/Table";
import BasicModal from "./Component/Popup";
const HousePage = () => {
  return (
    <div>
      <div className="d-flex">
        <BasicModal />
      </div>
      <DenseTable />
    </div>
  );
};

export default HousePage;
