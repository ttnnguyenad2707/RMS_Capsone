import DenseTable from "./Component/table";
import BasicModal from "./Component/popup";
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
