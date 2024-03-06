import BasicTable from "./Component/Table";
import BasicModal from "./Component/Popup";
import { GetHouseService } from "../../services/houses";
import Container from "@mui/material/Container";
import { GetUtilities, GetUtilitiesOther } from "../../services/houses";
import "./Scss/HousePage.scss";
import * as React from "react";
const HousePage = () => {
  return (
    <Container
      maxWidth="false"
      sx={{ backgroundColor: "#F1F2F7", padding: "20px", width: "100%", }}
    >
      <div className="d-flex">
        <BasicModal />
      </div>
      <BasicTable />
    </Container>
  );
};

export default HousePage;
