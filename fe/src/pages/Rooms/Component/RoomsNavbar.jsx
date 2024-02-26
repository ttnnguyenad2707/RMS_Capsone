import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import SuperModal from "./Popup";
import * as React from "react";
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
  const handleChange = (event) => {
    const inputSelect = event.target.value;
    if (inputSelect !== null) {
      setHouseSelect(inputSelect)
      selectHouse(inputSelect)
    }
  };
  const handleSelectModal = (nameModal) => {
    switch (nameModal) {
      case "Thêm Một Phòng":
        setTypeModal(nameModal);
        handleOpen();
        break;
      case "Thêm Dữ Liệu File":
        setTypeModal(nameModal);
        handleOpen();
        break;
    }
  };
  return (
    <Box sx={{ display: "flex", position: "relative", alignItems: "center" }}>
      <h5 className="me-4">Lựa Chọn Nhà Trọ:</h5>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={houseSelect}
        label="Age"
        onChange={handleChange}
        defaultValue={10}
        sx={{ width: "20%" }}
        className="me-5"
      >
        {house ? (
          house.map((h) => (<MenuItem value={h.houseId} key={h.houseId}>{h.name}</MenuItem>))
        ) : (
          <div>Lỗi Dữ Liệu</div>
        )}
      </Select>
      <Box sx={{ display: "flex" }}>
        <Button color="secondary" variant="contained" className="me-3">
          Tất Cả Hóa Đơn Tiền Nhà
        </Button>
        <Button
          color="success"
          variant="contained"
          className="me-3"
          onClick={() => handleSelectModal("Thêm Dữ Liệu File")}
        >
          Nhập Dữ Liệu
        </Button>
        <Button color="info" variant="contained" className="me-3">
          In Tất Cả Hóa Đơn
        </Button>
        <Button
          color="error"
          variant="contained"
          className="me-3"
          onClick={() => handleSelectModal("Thêm Một Phòng")}
        >
          Thêm phòng
        </Button>
        <Button color="warning" variant="contained" className="me-3">
          Cấu hình bảng giá
        </Button>
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
