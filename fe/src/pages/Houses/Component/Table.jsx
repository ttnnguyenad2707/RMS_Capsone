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
import { ToastContainer, toast } from "react-toastify";
import { deleteHouse } from "../../../reduxToolkit/HouseSlice";
import { fetchHouses } from "../../../reduxToolkit/HouseSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useTheme } from "@mui/material/styles";
import Notification from "../../../CommonComponents/Notification";
import PropTypes from "prop-types";
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(
  stt,
  id,
  houseName,
  numberRooms,
  address,
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
  const [houseSelect, setHouseSelect] = useState();
  const [open, setOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const houses = useSelector((state) => state.house.houses);

  useEffect(() => {
    // GetHouse();
    dispatch(fetchHouses());
  }, [dispatch, page, rowsPerPage]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const DeleteHouse = async (houseID) => {
    Notification("Confirm", "Xác Nhận", "Xóa Nhà").then(async (result) => {
      if (result) {
        try {
          const id = houseID;
          dispatch(deleteHouse({ id }));
          dispatch(fetchHouses());
          Notification("Success", "Đã Xóa", "Nhà Thành Công");
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("Người dùng đã chọn Cancel");
        // Xử lý khi người dùng chọn Cancel
      }
    });
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
      id: "action",
      label: "Thao Tac",
    },
  ];
  useEffect(() => {
    if (houses) {
      const dataTable = houses.map((house) => {
        const address =
          house.locationschema.district +
          "-" +
          house.locationschema.province +
          "-" +
          house.locationschema.ward +
          "-" +
          house.locationschema.detailLocation;
        return createData(
          1,
          house._id,
          house.name,
          house.room.length,
          address,
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
                  house.room.length,
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
              onClick={() => DeleteHouse(house.id)}
            >
              Xóa
            </Button>
          </div>
        );
      });
      setRows(dataTable);
    }
  }, [houses]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = rows.slice(startIndex, endIndex);
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
                a.numberRooms === b.numberRooms
                  ? 0
                  : sortNumberBack(a.numberRooms, b.numberRooms)
              );
              s.statusSort = false;
            } else {
              sortedRows.sort((a, b) =>
                a.numberRooms === b.numberRooms
                  ? 0
                  : sortNumber(a.numberRooms, b.numberRooms)
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
                {displayedData
                  ? displayedData.map((row, index) => (
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
                        <TableCell align="left" sx={{ width: "20%" }}>
                          {row.action}
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
              <TableFooter>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableFooter>
            </Table>
          </TableContainer>
          <BasicModalUpdate
            data={dataModelUpdate}
            handleOpen={handleOpen}
            handleClose={handleClose}
            openModal={open}
          />
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
