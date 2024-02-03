import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import * as React from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tab from "@mui/material/Tab";
import Tabs from '@mui/material/Tabs';
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  height: "80%",
  bgcolor: "background.paper",
  border: "2px solid #grey",
  boxShadow: 25,
  p: 5,
  borderRadius: "10px",
  padding: "18px",
};
const stylesHeader = {
  color: "#5A67BA",
  display: "flex",
  position: "relative",
  fontWeight: "Bold",
};
const stylesBody = {
  width: "100%",
  marginTop: "20px",
};
export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState("");
  const [value, setValue] = React.useState("1");

  const handleChangeMenu = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={stylesHeader}>
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h3"
              sx={{ fontWeight: "Bold" }}
            >
              Thêm Nhà
            </Typography>
            <IconButton
              sx={{ position: "absolute", right: "10px" }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography id="modal-modal-description" sx={stylesHeader}>
            Thêm nhà vào hệ thống
          </Typography>
          <Box sx={stylesBody}>
            <Box sx={{ display: "flex" }}>
              <TextField
                id="outlined-basic"
                label="Tên Nhà"
                variant="outlined"
                sx={{ width: "65%" }}
              />
              <FormControl fullWidth sx={{ width: "35%", ml: "20px" }}>
                <InputLabel id="demo-simple-select-label">Loại Nhà</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mt: "20px", display: "flex" }}>
              <FormControl fullWidth sx={{ width: "30%" }}>
                <InputLabel id="demo-simple-select-label">
                  Tỉnh/Thành Phố
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ width: "35%", ml: "20px" }}>
                <InputLabel id="demo-simple-select-label">
                  Quận/Huyện
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ width: "35%", ml: "20px" }}>
                <InputLabel id="demo-simple-select-label">Phường/Xã</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mt: "20px" }}>
              <TextField
                id="outlined-basic"
                label="Tên Nhà"
                variant="outlined"
                sx={{ width: "100%" }}
              />
              <p>(Không nhập tên Xã/Phường,Quận/Huyện,Tỉnh/Thành Phố)</p>
            </Box>
            <Box>
              <TextField
                id="outlined-basic"
                label="Tiền Điện Trên 1kwH"
                variant="outlined"
                sx={{ width: "50%", mr: "1%" }}
              />
              <TextField
                id="outlined-basic"
                label="Tiền Nước Trên 1 Khối"
                variant="outlined"
                sx={{ width: "49%" }}
              />
            </Box>
            <Box sx={{ width: "100%", mt: "20px" }}>
              <Tabs
                value={value}
                onChange={handleChangeMenu}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
              >
                <Tab value="1" label="Item One" />
                <Tab value="2" label="Item Two" />
                <Tab value="3" label="Item Three" />
              </Tabs>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              position: "absolute",
              right: "18px",
              bottom: "18px",
            }}
          >
            <Button
              variant="contained"
              color="error"
              sx={{ ml: "10px", fontWeight: "Bold" }}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              sx={{
                ml: "10px",
                backgroundColor: "#5A67BA",
                fontWeight: "Bold",
              }}
            >
              Thêm Nhà
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
