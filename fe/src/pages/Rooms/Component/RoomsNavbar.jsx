import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import SuperModal from "./Popup";
import * as React from "react";
import SettingPrice from "../Setting/SettingPrice";
import SelectHouse from "../../../CommonComponents/SelectHouse";
const RoomsNavbar = ({ dataHouse, selectHouse }) => {
  const [house, setHouse] = React.useState();
  const [houseSelect, setHouseSelect] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [typeModal, setTypeModal] = React.useState();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    if (dataHouse) {
      const data = dataHouse.map((h) => {
        return {
          houseId: h._id,
          name: h.name,
        };
      });
      setHouse(data);
    }
  }, [dataHouse]);
  React.useEffect(() => {
    console.log(houseSelect, "setHouseSelect");
    selectHouse(houseSelect);
  }, [houseSelect,dataHouse]);

  // const handleChange = (event) => {
  //   const inputSelect = event.target.value;
  //   if (inputSelect !== null) {
  //     setHouseSelect(inputSelect);
  //     selectHouse(inputSelect);
  //   }
  // };
  const handleSelectModal = (nameModal) => {
    if (nameModal === "Thêm Phòng") {
      setTypeModal(nameModal);
      handleOpen();
    } else if (nameModal === "Cấu Hình Bảng Giá") {
      setTypeModal(nameModal);
      handleOpen();
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <h5 className="me-4">Lựa Chọn Nhà Trọ:</h5>
      <SelectHouse onSelect={setHouseSelect} />
      <Box sx={{ display: "flex" }}>
        {/* <Button color="info" variant="contained" className="me-3">
          Tất Cả Hóa Đơn Tiền Nhà
        </Button>
        <Button color="info" variant="contained" className="me-3">
          In Tất Cả Hóa Đơn
        </Button> */}
        <Button
          color="info"
          variant="contained"
          className="me-3"
          onClick={() => handleSelectModal("Thêm Phòng")}
        >
          Thêm phòng
        </Button>
        <SettingPrice houseId={houseSelect} />
      </Box>
      <SuperModal
        handleOpen={handleOpen}
        handleClose={handleClose}
        openModal={open}
        typeModal={typeModal}
        houseId={houseSelect}
      />
    </Box>
  );
};
export default RoomsNavbar;
