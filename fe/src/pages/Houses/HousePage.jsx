import BasicTable from "./Component/Table";
import BasicModal from "./Component/Popup";
import { GetHouseService } from "../../services/houses";
import Container from "@mui/material/Container";
import { GetUtilities, GetUtilitiesOther } from "../../services/houses";
import "./Scss/HousePage.scss"
import * as React from "react";
const HousePage = () => {
  // const [houses, setHouse] = React.useState();
  const [utilList, setUtilList] = React.useState();
  const [DataUtilities, setUtilitiesData] = React.useState();
  const [DataUtilitiesOther, setUtilitiesDataOther] = React.useState();
  // const GetHouse = async () => {
  //   try {
  //     const result = (await GetHouseService()).data.data.houses;
  //     setHouse(result);
  //     const listUtil = result.map((r) => r.utilities);
  //     setUtilList(listUtil);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const GetDataUtilities = async () => {
    try {
      const data = (await GetUtilities()).data.data;
      setUtilitiesData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetDataUtilitiesOther = async () => {
    try {
      const data = (await GetUtilitiesOther()).data.data;
      // console.log(data,"a");
      setUtilitiesDataOther(data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    GetDataUtilities();
    GetDataUtilitiesOther();
  }, []);
  return (
    <Container
      maxWidth="false"
      sx={{ backgroundColor: "#F1F2F7", padding: "20px", width: "100%" }}
    >
      <div className="d-flex">
        <BasicModal dataUtils={DataUtilities} dataUtilsOrther={DataUtilitiesOther} />
      </div>
      <BasicTable/>
    </Container>
  );
};

export default HousePage;
