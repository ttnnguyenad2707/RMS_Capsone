import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableSortLabel from "@mui/material/TableSortLabel";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import BasicModalUpdate from "./PopupUpdate";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { DeleteHouseService } from "../../../services/houses";
import { ToastContainer, toast } from "react-toastify";
import { deleteHouse } from "../../../reduxToolkit/HouseSlice";
import { fetchHouses } from "../../../reduxToolkit/HouseSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
function createData(
  stt,
  id,
  houseName,
  numberRooms,
  address,
  lender,
  phoneNumber,
  email,
  costElectricity,
  costWater,
  action
) {
  return {
    stt,
    id,
    houseName,
    numberRooms,
    address,
    lender,
    phoneNumber,
    email,
    costElectricity,
    costWater,
    action,
  };
}
export default function BasicTable() {
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState([
    {
      cellId: "houseName",
      statusSort: true, // sắp xếp xuôi , false sắp xếp ngược
    },
    {
      cellId: "numberRooms",
      statusSort: true, // sắp xếp xuôi , false sắp xếp ngược
    },
  ]);
  const dispatch = useDispatch();
  const [dataModelUpdate, setDataModelUpdate] = useState();
  const [open, setOpen] = useState(false);
  const [houseSelect, setHouseSelect] = useState();
  const [openConfirm, setOpenConfirm] = useState(false);
  const houses = useSelector((state) => state.house.houses);
  useEffect(() => {
    // GetHouse();
    dispatch(fetchHouses());
  }, [dispatch]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  const DeleteHouse = async (id) => {
    try {
      dispatch(deleteHouse({ id }));
      dispatch(fetchHouses());
      toast.success("Xóa Nhà Thành Công");
      handleCloseConfirm();
    } catch (error) {
      console.log(error);
    }
  };
  const headCells = [
    {
      id: "stt",
      label: "STT",
    },
    {
      id: "houseName",
      label: "Tên Nhà",
      sort: true,
    },
    {
      id: "numberRooms",
      label: "Số Phòng",
      sort: true,
    },
    {
      id: "address",
      label: "Địa Chỉ",
    },
    {
      id: "lender",
      label: "Chủ Sở Hữu",
    },
    {
      id: "phoneNumber",
      label: "Số Điện Thoại",
    },
    {
      id: "email",
      label: "Email",
    },
    {
      id: "action",
      label: "Thao Tac",
    },
  ];
  useEffect(() => {
    if (houses) {
      const dataTable = houses.map((house) => {
        const address =
          house.location.district +
          "-" +
          house.location.province +
          "-" +
          house.location.ward +
          "-" +
          house.location.detailLocation;
        return createData(
          1,
          house._id,
          house.name,
          house.numberOfRoom,
          address,
          house.hostId.name,
          house.hostId.phone,
          house.hostId.email,
          house.electricPrice,
          house.waterPrice,
          <div className="d-flex">
            <Button
              variant="contained"
              sx={{ fontWeight: "bold", margin: "10px" }}
              color="warning"
              onClick={() =>
                updateHouse(
                  1,
                  house._id,
                  house.name,
                  house.numberOfRoom,
                  address,
                  house.hostId.name,
                  house.hostId.phone,
                  house.hostId.email,
                  house.electricPrice,
                  house.waterPrice,
                  house.utilities,
                  house.otherUtilities
                )
              }
            >
              Cập Nhật
            </Button>
            <Button
              variant="contained"
              sx={{ fontWeight: "bold", margin: "10px" }}
              color="error"
              onClick={() => {
                setHouseSelect({
                  id: house._id,
                  name: house.name,
                });

                handleOpenConfirm();
              }}
            >
              Xóa
            </Button>
          </div>
        );
      });
      setRows(dataTable);
    }
  }, [houses]);

  const StyledTableRow = styled(TableRow)(() => ({
    backgroundColor: "#1976d2",
    "td, th": {
      fontWeight: "bold",
      color: "#ffffff",
    },
  }));
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
  const updateHouse = (
    stt,
    id,
    houseName,
    numberRooms,
    address,
    lender,
    phoneNumber,
    email,
    costElectricity,
    costWater,
    utils,
    ortherUtils
  ) => {
    handleOpen();
    console.log(open);
    const addressParts = address.split("-");
    const City = addressParts[0];
    const Ward = addressParts[1];
    const county = addressParts[2];
    const streetNumber = addressParts[3];
    const data = {
      stt: stt,
      id: id,
      houseName: houseName,
      numberRooms: numberRooms,
      address: {
        city: City,
        ward: Ward,
        county: county,
        streetNumber: streetNumber,
      },
      lender: lender,
      phoneNumber: phoneNumber,
      email: email,
      costElectricity: costElectricity,
      costWater: costWater,
      utils: utils,
      ortherUtils: ortherUtils,
    };
    setDataModelUpdate(data);
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
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: "20%",
    bgcolor: "background.paper",
    border: "2px solid #grey",
    boxShadow: 25,
    p: 5,
    borderRadius: "10px",
    padding: "18px",
  };
  const stylesHeader = {
    color: "#1976d2",
    display: "flex",
    position: "relative",
    fontWeight: "Bold",
  };
  return (
    <>
      {houses ? (
        <div>
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
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell align="left">{row.houseName}</TableCell>
                        <TableCell align="left">{row.numberRooms}</TableCell>
                        <TableCell align="left">{row.address}</TableCell>
                        <TableCell align="left">{row.lender}</TableCell>
                        <TableCell align="left">{row.phoneNumber}</TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left" sx={{ width: "20%" }}>
                          {row.action}
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
          <BasicModalUpdate
            data={dataModelUpdate}
            handleOpen={handleOpen}
            handleClose={handleClose}
            openModal={open}
          />
          {houseSelect ? (
            <Modal
              open={openConfirm}
              onClose={handleCloseConfirm}
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
                    Xác Nhận Xóa Nhà
                  </Typography>
                  <IconButton
                    sx={{ position: "absolute", right: "10px" }}
                    onClick={handleCloseConfirm}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: "flex", mt: 3, mb: 3 }}>
                  <Typography
                    id="modal-modal-title"
                    sx={{ fontWeight: "Bold", color: "red" }}
                    component="h3"
                    variant="h5"
                  >
                    Tên Nhà: {houseSelect.name}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    variant="contained"
                    sx={{ padding: "3px", ml: 3 }}
                    onClick={handleCloseConfirm}
                  >
                    Hủy
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ padding: "3px", ml: 3 }}
                    onClick={() => DeleteHouse(houseSelect.id)}
                  >
                    Xóa
                  </Button>
                </Box>
              </Box>
            </Modal>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div className="text-center">
          <AiOutlineLoading3Quarters className="loading-icon" />
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}
