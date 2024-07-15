import BasicTable from "./Component/Table";
import BasicModal from "./Component/Popup";
import Container from "@mui/material/Container";
import "./Scss/HousePage.scss";
import * as React from "react";
import { useSelector } from "react-redux";
import Page404 from "../../CommonComponents/Page404";
import { useNavigate } from "react-router-dom";
const HousePage = () => {
  const userData = useSelector((state) => state.user.data);
  const nav = useNavigate();
  if (userData.accountType == "renter") {
    nav("/404")
  }
  if (userData.accountType == "owner") {
    return (
      <Container
        maxWidth="false"
        sx={{ backgroundColor: "#F1F2F7", padding: "20px", width: "100%" }}
      >
        <div className="d-flex">
          <BasicModal />
        </div>
        <BasicTable />
      </Container>
    );
  } else if (userData.accountType == "renter") {
    return <Page404 />;
  }
};

export default HousePage;
