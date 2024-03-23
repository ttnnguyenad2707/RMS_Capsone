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
import Tabs from "@mui/material/Tabs";
import Notification from "../../../CommonComponents/Notification";
import { useDispatch } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import { useSelector } from "react-redux";
import {
  fetchOneHouse,
  updateHouse,
  fetchHouses,
} from "../../../reduxToolkit/HouseSlice";
import { fetchDefaultPrice } from "../../../reduxToolkit/DefaultPrice";
import Paper from "@mui/material/Paper";
import {
  fetchRooms,
  addRooms,
  addOneRoom,
} from "../../../reduxToolkit/RoomSlice";
import UtilitiesTab from "../../Houses/Component/UtilitiesTab";
import "../Scss/Popup.scss";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  height: "60%",
  bgcolor: "background.paper",
  border: "2px solid #grey",
  boxShadow: 25,
  p: 5,
  borderRadius: "10px",
  padding: "18px",
  overflow: "auto",
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
  overflow: "auto",
};
const styleAddUnit = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: "30%",
  bgcolor: "background.paper",
  border: "2px solid #grey",
  boxShadow: 25,
  p: 5,
  borderRadius: "10px",
  padding: "18px",
  overflow: "auto",
};
function createData(stt, typePrice, unitPrice, unit, action) {
  return {
    stt,
    typePrice,
    unitPrice,
    unit,
    action,
  };
}
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
  const [member, setMember] = React.useState();
  const [openAdd, setOpenAdd] = React.useState(false);
  const [priceRoom, setPriceRoom] = React.useState();
  const [CostDeposit, setCostDeposit] = React.useState();
  const [CostArea, setCostArea] = React.useState();
  const [status, setStatus] = React.useState("");
  const [unit, setUnit] = React.useState("");
  const [roomType, setRoomType] = React.useState("");
  const [value, setValue] = React.useState("1");
  const [defaultPrice, setDefaultPrice] = React.useState();
  const [defaultPriceSystem, setDefaultPriceSystem] = React.useState();
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [rows, setRows] = React.useState([]);
  const [utilities, setUtilities] = React.useState();
  const [utilitiesOther, setUtilitiesOther] = React.useState();
  const [utilitiesRooms, setUtilitiesRooms] = React.useState();
  const [utilitiesOtherRooms, setUtilitiesOtherRooms] = React.useState();
  const inputName = React.useRef();
  const inputMember = React.useRef();
  const inputPriceRoom = React.useRef();
  const inputCostDeposit = React.useRef();
  const inputCostArea = React.useRef();
  const inputUnitPrice = React.useRef();
  const inputExpense = React.useRef();
  const dispatch = useDispatch();
  const headCells = [
    {
      id: "stt",
      label: "STT",
    },
    {
      id: "typePrice",
      label: "Loại Phí",
    },
    {
      id: "unitPrice",
      label: "Đơn Giá",
    },
    {
      id: "unit",
      label: "Đơn Vị",
    },
    {
      id: "action",
      label: "Thao Tác",
    },
  ];
  const StyledTableRow = styled(TableRow)(() => ({
    backgroundColor: "#1976d2",
    "td, th": {
      fontWeight: "bold",
      color: "#ffffff",
    },
  }));
  const gethouse = async () => {
    const response = await dispatch(fetchOneHouse({ houseId }));
    console.log(response, "response");
    if (typeModal === "Cấu Hình Bảng Giá") {
      setDefaultPrice(response.payload.priceList);
    } else if (typeModal === "Thêm Phòng") {
      setUtilities(response.payload.utilities);
      setUtilitiesOther(response.payload.otherUtilities);
    }
  };
  const getDefaultPrice = async () => {
    const response = await dispatch(fetchDefaultPrice());
    console.log(response.payload);
    setDefaultPriceSystem(response.payload);
  };
  React.useEffect(() => {
    if (typeModal === "Cấu Hình Bảng Giá") {
      gethouse();
      getDefaultPrice();
    } else if (typeModal === "Thêm Phòng") {
      gethouse();
    }
  }, [typeModal, openAdd]);
  // feat data price
  React.useEffect(() => {
    if (defaultPrice) {
      const dataTable = defaultPrice.map((house, index) => {
        return createData(
          index + 1,
          house.base.name,
          house.price,
          house.base.unit,
          <div className="d-flex">
            <Button
              variant="contained"
              sx={{ fontWeight: "bold", margin: "10px" }}
              color="error"
              onClick={() => handleDeletePrice(house._id)}
            >
              Xóa
            </Button>
          </div>
        );
      });
      setRows(dataTable);
    }
  }, [defaultPrice]);
  React.useEffect(() => {
    if (inputUnitPrice.current) {
      console.log(unit, "unit");
      const getUnit = defaultPriceSystem.find((price) => unit === price._id);
      console.log(getUnit, "getUnit");
      if (getUnit) {
        inputUnitPrice.current.value = getUnit.unit;
      }
    }
  }, [unit, inputUnitPrice.current]);
  const handleChangeMenu = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeStatus = (event) => {
    const inputSelect = event.target.value;
    if (inputSelect !== null) {
      setStatus(inputSelect);
    }
  };
  const handleChangeUnit = (event) => {
    const inputSelect = event.target.value;
    if (inputSelect !== null) {
      setUnit(inputSelect);
      console.log(unit, "unit");
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
    if (validateInputNumber(inputValue) && inputValue != " ") {
      setName(inputValue);
      setErrorName(false);
    } else {
      setErrorName(true);
    }
  };
  const handleMember = () => {
    const inputValue = inputMember.current.value;
    if (validateInputNumber(inputValue) && inputValue != " ") {
      setErrorAddress(false);
    } else {
      setErrorAddress(true);
    }
  };
  const handlePriceRoom = () => {
    const inputValue = inputPriceRoom.current.value;
    if (validateInputNumber(inputValue) && inputValue != " ") {
      setErrorAddress(false);
    } else {
      setErrorAddress(true);
    }
  };
  const handleInputCostDeposit = () => {
    const inputValue = inputCostDeposit.current.value;
    if (validateInputNumber(inputValue) && inputValue != " ") {
      setErrorCostElectric(false);
    } else {
      setErrorCostElectric(true);
    }
  };
  const handleInputCostArea = () => {
    const inputValue = inputCostArea.current.value;
    if (validateInputNumber(inputValue) && inputValue != " ") {
      setErrorWater(false);
    } else {
      setErrorWater(true);
    }
  };

  // add price
  const handleAddPrice = async () => {
    const Expense = inputExpense.current.value;
    const UnitPrice = inputUnitPrice.current.value;
    if (
      typeof Expense !== "undefined" &&
      typeof UnitPrice !== "undefined" &&
      typeof unit !== "undefined"
    ) {
      const getUnit = defaultPriceSystem.find((price) => unit === price._id);
      const newPrice = {
        base: {
          _id: getUnit._id,
          name: getUnit.name,
          unit: getUnit.unit,
        },
        price: parseInt(Expense),
      };
      defaultPrice.push(newPrice);
      const setData = {
        priceList: defaultPrice,
      };
      const id = houseId;
      const response = await dispatch(updateHouse({ setData, id }));
      console.log(response, "response");
      if (response.payload) {
        Notification("Success", "Thêm kinh phí", "Thành công");
        dispatch(fetchHouses());
        handleCloseAdd();
      } else {
        Notification("Error", "Thêm kinh phí", "Thất Bại");
      }
    }
  };
  // delete price
  const handleDeletePrice = async (idPrice) => {
    const getUnit = defaultPrice.filter((price) => idPrice !== price._id);
    const setData = {
      priceList: getUnit,
    };
    const id = houseId;
    Notification("Confirm", "Xác Nhận", "Xóa Loại Kinh Phí Này").then(
      async (result) => {
        if (result) {
          const response = await dispatch(updateHouse({ setData, id }));
          console.log(response, "response");
          if (typeof response.payload !== "undefined") {
            gethouse();
            Notification("Success", "Xóa kinh phí", "Thành công");
            dispatch(fetchHouses());
            handleCloseAdd();
          } else {
            Notification("Error", "Xóa kinh phí", "Thất Bại");
          }
        } else {
          console.log("Người dùng đã chọn Cancel");
          // Xử lý khi người dùng chọn Cancel
        }
      }
    );
  };
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  // Add one rooms
  const HandleSubmit = async () => {
    handleMember();
    handlePriceRoom();
    handleInputCostDeposit();
    handleInputCostArea();
    handleInputUtilities();
    handleInputUtilitiesOrther();
    if (
      inputName.current.value !== "" &&
      parseInt(inputMember.current.value) > 0 &&
      parseInt(inputPriceRoom.current.value) > 0 &&
      parseInt(inputCostDeposit.current.value) > 0 &&
      parseInt(inputCostArea.current.value) > 0 &&
      typeof status !== "undefined" &&
      typeof roomType !== "undefined" &&
      utilitiesRooms &&
      utilitiesOtherRooms
    ) {
      const setData = {
        name: inputName.current.value,
        status: status,
        quantityMember: parseInt(inputMember.current.value),
        roomType: roomType,
        roomPrice: parseInt(inputPriceRoom.current.value),
        deposit: parseInt(inputCostDeposit.current.value),
        area: parseInt(inputCostArea.current.value),
        utilities: utilitiesRooms,
        otherUtilities: utilitiesOtherRooms,
      };
      const response = await dispatch(addOneRoom({ setData, houseId }));
      if (response.payload === "Created") {
        // await dispatch(fetchRooms({ houseId }));
        await dispatch(fetchHouses());
        Notification("Success", "Thêm Phòng", "Thành Công");
        // setStatus("");
        // setRoomType("");
        // setCostArea("");
        // setCostDeposit("");
        // setPriceRoom("");
        // setMember("");
        // setName("");
        // setErrorName(false);
        // setErrorCostElectric(false);
        // setErrorWater(false);
        handleClose();
      } else {
        Notification(
          "Error",
          "Thêm Danh Sách Phòng Thất Bại",
          response.payload
        );
      }
      await dispatch(fetchRooms({ houseId }));
      handleClose();
    }
  };
  // Add list rooms
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  // Upload file to be
  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("excelFile", selectedFile);
    formData.set("houseId", houseId);
    // AddRoomsFileService({data: formData} );
    const response = await dispatch(addRooms({ data: formData }));
    if (response.payload === "Created") {
      // await dispatch(fetchRooms({ houseId }));
      await dispatch(fetchHouses());
      Notification("Success", "Thêm Danh Sách Phòng", "Thành Công");
      handleClose();
    } else {
      Notification("Error", "Thêm Danh Sách Phòng Thất Bại", response.payload);
    }
  };
  // const validateInput = (input) => {
  //   const regex = /^[\p{L}\d\s]+$/u;
  //   return regex.test(input);
  // };
  const sortCharacter = (character1, character2) => {
    return character1.toLowerCase().localeCompare(character2.toLowerCase());
  };
  const sortCharacterBack = (character1, character2) => {
    return -character1.toLowerCase().localeCompare(character2.toLowerCase());
  };
  const sortNumber = (number1, number2) => {
    return number1 - number2;
  };
  const sortNumberBack = (number1, number2) => {
    return -number1 - number2;
  };
  const handleSort = (cellId) => {
    const sortedRows = rows.slice();
    console.log(cellId);

    // Sắp xếp mảng sao chép
    switch (cellId) {
      case "houseName":
        const updateHouseName = status.map((s) => {
          if (s.cellId === "houseName") {
            if (s.statusSort === true) {
              sortedRows.sort((a, b) =>
                sortCharacterBack(a.houseName, b.houseName)
              );
              s.statusSort = false;
            } else {
              sortedRows.sort((a, b) =>
                sortCharacter(a.houseName, b.houseName)
              );
              s.statusSort = true;
            }
          }
          return s;
        });
        setStatus(updateHouseName);
        break;
      case "numberRooms":
        const updateNumberRooms = status.map((s) => {
          if (s.cellId === "numberRooms") {
            if (s.statusSort === true) {
              sortedRows.sort((a, b) =>
                sortNumberBack(a.numberRooms, b.numberRooms)
              );
              s.statusSort = false;
            } else {
              sortedRows.sort((a, b) =>
                sortNumber(a.numberRooms, b.numberRooms)
              );
              s.statusSort = true;
            }
          }
          return s;
        });
        setStatus(updateNumberRooms);
        break;
      default:
        break;
    }

    // Cập nhật state rows
    setRows(sortedRows);
  };
  const handleInputUtilities = (data) => {
    if (data) {
      // setUtilities(data);
      setUtilitiesRooms(data);
    }
  };
  const handleInputUtilitiesOrther = (data) => {
    if (data) {
      // setUtilitiesOther(data);
      setUtilitiesOtherRooms(data);
    }
  };
  const validateInputNumber = (input) => {
    return !isNaN(input) && Number(input) > 0;
  };
  if (typeModal === "Thêm Phòng") {
    return (
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
          <hr />
          <Tabs
            value={value}
            onChange={handleChangeMenu}
            textColor="primary"
            indicatorColor="primary"
            aria-label="secondary tabs example"
          >
            <Tab value="1" label="Thêm Phòng" />
            <Tab value="2" label="Thêm Danh Sách Phòng" />
          </Tabs>
          {value === "1" && (
            <Box sx={stylesBody} className="mt-4">
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
                  style={{
                    fontWeight: "bold",
                    opacity: "0.5",
                    color: "red",
                  }}
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">VND</InputAdornment>
                    ),
                  }}
                />
                <p
                  style={{
                    fontWeight: "bold",
                    opacity: "0.5",
                    color: "red",
                  }}
                ></p>
              </Box>
              <Box>
                <TextField
                  required
                  id="outlined-basic"
                  label="Tiền Cọc"
                  variant="outlined"
                  sx={{ width: "50%", mr: "1%" }}
                  inputRef={inputCostDeposit}
                  error={errorCostElectric}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">VND</InputAdornment>
                    ),
                  }}
                />
                <TextField
                  required
                  id="outlined-basic"
                  label="Diện Tích"
                  variant="outlined"
                  sx={{ width: "49%" }}
                  inputRef={inputCostArea}
                  error={errorCostWater}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">m²</InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ width: "100%", mt: "20px" }}>
                <Tabs
                  value={value}
                  onChange={handleChangeMenu}
                  textColor="primary"
                  indicatorColor="primary"
                  aria-label="secondary tabs example"
                >
                  <Tab value="1" label="Tiện Ích" />
                </Tabs>
                {value === "1" && (
                  <UtilitiesTab
                    handleInputSelect={handleInputUtilities}
                    dataUtil={utilities}
                    dataOrtherUtil={utilitiesOther}
                    typeUtil={"update"}
                    handleInputSelectOrther={handleInputUtilitiesOrther}
                  />
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  marginTop: "5%",
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
          )}
          {value === "2" && (
            <Box sx={stylesBody}>
              <Typography variant="h5">Add File</Typography>
              <input
                type="file"
                accept=".xlsx"
                onChange={handleFileChange}
                className="input-file"
                style={{ width: "50%" }}
              />
              <Button
                variant="contained"
                sx={{ ml: 2 }}
                onClick={() => handleFileUpload()}
              >
                Upload
              </Button>
              <Button
                variant="contained"
                sx={{ ml: 2 }}
                onClick={() =>
                  window.open(
                    "http://localhost:5000/api/v1/downloadTemplate",
                    "_blank"
                  )
                }
              >
                Download teamplate
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    );
  } else if (typeModal === "Cấu Hình Bảng Giá") {
    return (
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
              Cấu Hình Bảng Giá
            </Typography>
            <IconButton
              sx={{ position: "absolute", right: "10px" }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <hr />
          <Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <StyledTableRow>
                    {headCells.map((headCell) => (
                      <TableCell key={headCell.id} align="left">
                        {headCell.sort === true ? (
                          <TableSortLabel
                            active={true}
                            direction="asc"
                            onClick={() => handleSort(headCell.id)}
                            className="label-header"
                          >
                            {headCell.label}
                          </TableSortLabel>
                        ) : (
                          headCell.label
                        )}
                      </TableCell>
                    ))}
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {rows
                    ? rows.map((row, index) => (
                        <TableRow
                          key={row.stt}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell align="left" sx={{ width: "10%" }}>
                            {row.stt}
                          </TableCell>
                          <TableCell align="left" sx={{ width: "20%" }}>
                            {row.typePrice}
                          </TableCell>
                          <TableCell align="left" sx={{ width: "20%" }}>
                            {row.unitPrice}
                          </TableCell>
                          <TableCell align="left" sx={{ width: "20%" }}>
                            {row.unit}
                          </TableCell>
                          <TableCell align="left" sx={{ width: "30%" }}>
                            {row.action}
                          </TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Button
            variant="contained"
            color="primary"
            className="mt-3"
            onClick={() => handleOpenAdd()}
          >
            Thêm Kính Phí
          </Button>
          <Modal
            open={openAdd}
            onClose={handleCloseAdd}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styleAddUnit}>
              <Box sx={stylesHeader}>
                <Typography
                  id="modal-modal-title"
                  variant="h4"
                  component="h3"
                  sx={{ fontWeight: "Bold" }}
                >
                  Cấu Hình Bảng Giá
                </Typography>
                <IconButton
                  sx={{ position: "absolute", right: "10px" }}
                  onClick={handleCloseAdd}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <hr />
              <Box sx={{ display: "flex" }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={unit}
                  label="Trạng đơn vị"
                  onChange={handleChangeUnit}
                  sx={{ width: "40%" }}
                  className="me-4"
                >
                  {defaultPriceSystem ? (
                    defaultPriceSystem.map((d, index) => (
                      <MenuItem value={d._id} key={index}>
                        {d.name}
                      </MenuItem>
                    ))
                  ) : (
                    <div>Không có dữ liệu</div>
                  )}
                </Select>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  sx={{ width: "25%" }}
                  inputRef={inputUnitPrice}
                  className="me-4"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  required
                  id="outlined-basic"
                  label="Giá"
                  variant="outlined"
                  sx={{ width: "35%" }}
                  inputRef={inputExpense}
                />
              </Box>
              <Box className="d-flex">
                <Button
                  variant="contained"
                  color="primary"
                  className="mt-3"
                  onClick={() => handleAddPrice()}
                >
                  Thêm Kính Phí
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  className="mt-3 ms-3"
                  onClick={handleCloseAdd}
                >
                  Hủy
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Modal>
    );
  }
}
