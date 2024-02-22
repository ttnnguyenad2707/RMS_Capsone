import BasicTable from "./Component/Table";
import BasicModal from "./Component/Popup";
import { AddHouseService } from "../../services/houses";
import { GetHouseService } from "../../services/houses";
import Container from "@mui/material/Container";
import * as React from "react";
const HousePage = () => {
  const [houses, setHouse] = React.useState();
  const GetHouse = async () => {
    try {
      const result = (await GetHouseService()).data.data.houses;
      setHouse(result);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    GetHouse();
  }, []);
  return (
    <Container
      maxWidth="false"
      sx={{ backgroundColor: "#F1F2F7", padding: "20px", width: "100%" }}
    >
      <div className="d-flex">
        <BasicModal />
      </div>
      <BasicTable data={houses} />
    </Container>
  );
};

export default HousePage;
