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
import { AddRoomsFileService } from "../../../services/houses";
import { useDispatch } from "react-redux";
import {
  fetchRooms,
  addRooms,
  addOneRoom,
} from "../../../reduxToolkit/RoomSlice";
import axios from "axios";
import "../Scss/Popup.scss";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  height: "50%",
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
export default function SuperModal({
  openModal,
  handleClose,
  handleOpen,
  typeModal,
  houseId,
}) {
  const [errorName, setErrorName] = React.useState(false);
  const [errorAddress, setErrorAddress] = React.useState(false);
  const [errorCostElectric, setErrorCostElectric] = React.useState(false);
  const [errorCostWater, setErrorWater] = React.useState(false);
  const [name, setName] = React.useState("");
  const [member, setMember] = React.useState("");
  const [priceRoom, setPriceRoom] = React.useState("");
  const [CostDeposit, setCostDeposit] = React.useState();
  const [CostArea, setCostArea] = React.useState();
  const [status, setStatus] = React.useState("");
  const [roomType, setRoomType] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState(null);
  const inputName = React.useRef();
  const inputMember = React.useRef();
  const inputPriceRoom = React.useRef();
  const inputCostDeposit = React.useRef();
  const inputCostArea = React.useRef();
  const dispatch = useDispatch();
  const handleChangeMenu = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeStatus = (event) => {
    const inputSelect = event.target.value;
    if (inputSelect !== null) {
      setStatus(inputSelect);
    }
  };
  const handleChangeRoomType = (event) => {
    const inputSelect = event.target.value;
    if (inputSelect !== null) {
      setRoomType(inputSelect);
    }
  };
  const handleInputName = () => {
    const inputValue = inputName.current.value;
    if (validateInput(inputValue) && inputValue != " ") {
      setName(inputValue);
      setErrorName(false);
    } else {
      setErrorName(true);
    }
  };
  const handleMember = () => {
    const inputValue = inputMember.current.value;
    if (validateInputNumber(inputValue) && inputValue != " ") {
      setMember(inputValue);
      setErrorAddress(false);
    } else {
      setErrorAddress(true);
    }
  };
  const handlePriceRoom = () => {
    const inputValue = inputPriceRoom.current.value;
    if (validateInputNumber(inputValue) && inputValue != " ") {
      setPriceRoom(inputValue);
      setErrorAddress(false);
    } else {
      setErrorAddress(true);
    }
  };
  const handleInputCostDeposit = () => {
    const inputValue = inputCostDeposit.current.value;
    if (validateInputNumber(inputValue) && inputValue != " ") {
      setCostDeposit(inputValue);
      setErrorCostElectric(false);
    } else {
      setErrorCostElectric(true);
    }
  };
  const handleInputCostArea = () => {
    const inputValue = inputCostArea.current.value;
    if (validateInputNumber(inputValue) && inputValue != " ") {
      setCostArea(inputValue);
      setErrorWater(false);
    } else {
      setErrorWater(true);
    }
  };
  const HandleSubmit = async () => {
    handleInputName();
    handleMember();
    handlePriceRoom();
    handleInputCostDeposit();
    handleInputCostArea();
    if (
      name !== "" &&
      member !== "" &&
      priceRoom !== null &&
      CostDeposit !== null &&
      CostArea !== "" &&
      status !== "" &&
      roomType !== ""
    ) {
      const setData = {
        name: name,
        status: status,
        quantityMember: parseInt(priceRoom),
        roomType: roomType,
        roomPrice: parseInt(priceRoom),
        deposit: parseInt(CostDeposit),
        area: parseInt(CostArea),
      };
      console.log(setData, "setData");
      await dispatch(addOneRoom({ setData, houseId }));
      await dispatch(fetchRooms({ houseId }));
      handleClose();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("excelFile", selectedFile);
    formData.set("houseId", houseId);
    // AddRoomsFileService({data: formData} );
    await dispatch(addRooms({ data: formData }));
    await dispatch(fetchRooms({ houseId }));
    handleClose();
  };

  const validateInput = (input) => {
    const regex = /^[\p{L}\d\s]+$/u;
    return regex.test(input);
  };
  const validateInputNumber = (input) => {
    return !isNaN(input);
  };
  return (
    <div>
      {typeModal === "Thêm Một Phòng" ? (
        <Modal
          open={openModal}
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
                Thêm Phòng
              </Typography>
              <IconButton
                sx={{ position: "absolute", right: "10px" }}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography id="modal-modal-description" sx={stylesHeader}>
              Thêm Phòng Vào Nhà
            </Typography>
            <Box sx={stylesBody}>
              <Box sx={{ display: "flex" }}>
                <TextField
                  required
                  id="outlined-basic"
                  label="Tên Phòng"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  inputRef={inputName}
                  error={errorName}
                />
              </Box>
              <Box sx={{ mt: "20px", display: "flex" }}>
                <FormControl fullWidth sx={{ width: "30%" }}>
                  <InputLabel id="demo-simple-select-label">
                    Trạng Thái
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Trạng Thái Nhà"
                    onChange={handleChangeStatus}
                  >
                    <MenuItem value={"Empty"} key={"Empty"}>
                      Phòng Trống
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ width: "35%", ml: "20px" }}>
                  <InputLabel id="demo-simple-select-label">
                    Loại Phòng
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={roomType}
                    label="Loại Phòng"
                    onChange={handleChangeRoomType}
                  >
                    <MenuItem value={"normal"} key={"normal"}>
                      Bình Thường
                    </MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  required
                  id="outlined-basic"
                  label="Số Lượng Thành Viên"
                  variant="outlined"
                  sx={{ width: "35%", ml: "20px" }}
                  inputRef={inputMember}
                  error={errorAddress}
                />
                <p
                  style={{ fontWeight: "bold", opacity: "0.5", color: "red" }}
                ></p>
              </Box>
              <Box sx={{ mt: "20px" }}>
                <TextField
                  required
                  id="outlined-basic"
                  label="Tiền Phòng"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  inputRef={inputPriceRoom}
                  error={errorAddress}
                />
                <p
                  style={{ fontWeight: "bold", opacity: "0.5", color: "red" }}
                ></p>
              </Box>
              <Box>
                <TextField
                  required
                  id="outlined-basic"
                  label="deposit"
                  variant="outlined"
                  sx={{ width: "50%", mr: "1%" }}
                  inputRef={inputCostDeposit}
                  error={errorCostElectric}
                />
                <TextField
                  required
                  id="outlined-basic"
                  label="Diện Tích"
                  variant="outlined"
                  sx={{ width: "49%" }}
                  inputRef={inputCostArea}
                  error={errorCostWater}
                />
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
                onClick={() => handleClose()}
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
                onClick={() => HandleSubmit()}
              >
                Thêm Phòng
              </Button>
            </Box>
          </Box>
        </Modal>
      ) : (
        <Modal
          open={openModal}
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
                Thêm File
              </Typography>
              <IconButton
                sx={{ position: "absolute", right: "10px" }}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={stylesBody}>
              <Typography variant="h5">Add File</Typography>
              <input
                type="file"
                accept=".xlsx"
                onChange={handleFileChange}
                className="input-file"
              />
              <Button variant="contained" onClick={() => handleFileUpload()}>
                Upload
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </div>
  );
}
