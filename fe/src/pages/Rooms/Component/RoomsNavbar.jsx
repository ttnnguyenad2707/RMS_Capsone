import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
const RoomsNavbar = () => {
  const [age, setAge] = React.useState();
  const handleChange = (event) => {
    const inputSelect = event.target.value;
    if (inputSelect !== null) {
      setAge(inputSelect);
    }
  };
  return (
    <Box sx={{ display: "flex", position: "relative", alignItems: "center" }}>
      <h5 className="me-4">Lựa Chọn Nhà Trọ:</h5>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="Age"
        onChange={handleChange}
        defaultValue={10}
        sx={{width: "20%"}}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
      <Box sx={{ display: "flex", position: "absolute", right: "0" }}>
        <Button color="secondary" variant="contained" className="me-3">
          Tất Cả Hóa Đơn Tiền Nhà
        </Button>
        <Button color="success" variant="contained" className="me-3">
          Nhập Dữ Liệu
        </Button>
        <Button color="info" variant="contained" className="me-3">
          In Tất Cả Hóa Đơn
        </Button>
        <Button color="error" variant="contained" className="me-3">
          Thêm phòng
        </Button>
        <Button color="warning" variant="contained" className="me-3">
          Cấu hình bảng giá
        </Button>
      </Box>
    </Box>
  );
};
export default RoomsNavbar;
