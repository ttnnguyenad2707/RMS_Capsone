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
function createData(
  stt,
  houseName,
  numberRooms,
  numberBed,
  emptyPosition,
  address,
  lender,
  passPort,
  phoneNumber,
  email,
  costElectricity,
  costWater,
  action
) {
  return {
    stt,
    houseName,
    numberRooms,
    numberBed,
    emptyPosition,
    address,
    lender,
    passPort,
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
    {
      cellId: "numberBed",
      statusSort: true, // sắp xếp xuôi , false sắp xếp ngược
    },
    {
      cellId: "emptyPosition",
      statusSort: true, // sắp xếp xuôi , false sắp xếp ngược
    },
  ]);
  const [dataModelUpdate, setDataModelUpdate] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    console.log("l0o");
  };
  const list = [
    createData(
      "1",
      "Nguyên",
      3,
      3,
      3,
      "Thành Phố Hà Nội/Quận Ba Đình/Phường Trúc Bạch/114",
      "Trần Trung Nguyên",
      "001202999999",
      "0123456789",
      "trantrungnguyenad@gmail.com",
      20000,
      20000,
      <div className="d-flex">
        <Button
          variant="contained"
          sx={{ fontWeight: "bold", margin: "10px" }}
          color="warning"
          onClick={() =>
            updateHouse(
              "1",
              "Nguyên",
              3,
              3,
              3,
              "Thành Phố Hà Nội/Quận Ba Đình/Phường Trúc Bạch/114",
              "Trần Trung Nguyên",
              "001202999999",
              "0123456789",
              "trantrungnguyenad@gmail.com",
              20000,
              20000
            )
          }
        >
          Cập Nhật
        </Button>
        <Button
          variant="contained"
          sx={{ fontWeight: "bold", margin: "10px" }}
          color="error"
        >
          Xóa
        </Button>
      </div>
    ),
    createData(
      "1",
      "Nguyên",
      3,
      3,
      3,
      "Thành Phố Hà Nội/Quận Ba Đình/Phường Trúc Bạch/114",
      "Trần Trung Nguyên",
      "001202999999",
      "0123456789",
      "trantrungnguyenad@gmail.com",
      20000,
      20000,
      <div className="d-flex">
        <Button
          variant="contained"
          sx={{ fontWeight: "bold", margin: "10px" }}
          color="warning"
          onClick={() =>
            updateHouse(
              "1",
              "Nguyên",
              3,
              3,
              3,
              "Thành Phố Hà Nội/Quận Ba Đình/Phường Trúc Bạch/114",
              "Trần Trung Nguyên",
              "001202999999",
              "0123456789",
              "trantrungnguyenad@gmail.com",
              20000,
              20000
            )
          }
        >
          Cập Nhật
        </Button>
        <Button
          variant="contained"
          sx={{ fontWeight: "bold", margin: "10px" }}
          color="error"
        >
          Xóa
        </Button>
      </div>
    ),
    createData(
      "1",
      "Nguyên",
      3,
      3,
      3,
      "Thành Phố Hà Nội/Quận Ba Đình/Phường Trúc Bạch/114",
      "Trần Trung Nguyên",
      "001202999999",
      "0123456789",
      "trantrungnguyenad@gmail.com",
      20000,
      20000,
      <div className="d-flex">
        <Button
          variant="contained"
          sx={{ fontWeight: "bold", margin: "10px" }}
          color="warning"
          onClick={() =>
            updateHouse(
              "1",
              "Nguyên",
              3,
              3,
              3,
              "Thành Phố Hà Nội/Quận Ba Đình/Phường Trúc Bạch/114",
              "Trần Trung Nguyên",
              "001202999999",
              "0123456789",
              "trantrungnguyenad@gmail.com",
              20000,
              20000
            )
          }
        >
          Cập Nhật
        </Button>
        <Button
          variant="contained"
          sx={{ fontWeight: "bold", margin: "10px" }}
          color="error"
        >
          Xóa
        </Button>
      </div>
    ),
  ];

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
      id: "numberBed",
      label: "Số Giường",
      sort: true,
    },
    {
      id: "emptyPosition",
      label: "Chỗ Trống",
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
      id: "passPort",
      label: "CMTND",
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
    setRows(list);
  }, []);
  const StyledTableRow = styled(TableRow)(() => ({
    backgroundColor: "#5A67BA",
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
    houseName,
    numberRooms,
    numberBed,
    emptyPosition,
    address,
    lender,
    passPort,
    phoneNumber,
    email,
    costElectricity,
    costWater
  ) => {
    handleOpen();
    console.log(open);
    const addressParts = address.split("/");
    const City = addressParts[0];
    const Ward = addressParts[1];
    const county = addressParts[2];
    const streetNumber = addressParts[3];
    const data = {
      stt: stt,
      houseName: houseName,
      numberRooms: numberRooms,
      numberBed: numberBed,
      emptyPosition: emptyPosition,
      address: {
        city: City,
        ward: Ward,
        county: county,
        streetNumber: streetNumber,
      },
      lender: lender,
      passPort: passPort,
      phoneNumber: phoneNumber,
      email: email,
      costElectricity: costElectricity,
      costWater: costWater,
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
      case "numberBed":
        const updateNumberBed = status.map((s) => {
          if (s.cellId === "numberBed") {
            if (s.statusSort === true) {
              sortedRows.sort((a, b) =>
                sortNumberBack(a.numberBed, b.numberBed)
              );
              s.statusSort = false;
            } else {
              sortedRows.sort((a, b) => sortNumber(a.numberBed, b.numberBed));
              s.statusSort = true;
            }
          }
          return s;
        });
        setStatus(updateNumberBed);
        break;
      case "emptyPosition":
        const updateEmptyPosition = status.map((s) => {
          if (s.cellId === "emptyPosition") {
            if (s.statusSort === true) {
              sortedRows.sort((a, b) =>
                sortNumberBack(a.emptyPosition, b.emptyPosition)
              );
              s.statusSort = false;
            } else {
              sortedRows.sort((a, b) =>
                sortNumber(a.emptyPosition, b.emptyPositions)
              );
              s.statusSort = true;
            }
          }
          return s;
        });
        setStatus(updateEmptyPosition);
        break;
      default:
        break;
    }

    // Cập nhật state rows
    setRows(sortedRows);
  };
  console.log(status);
  return (
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
              ? rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell align="left">{row.stt}</TableCell>
                    <TableCell align="left">{row.houseName}</TableCell>
                    <TableCell align="left">{row.numberRooms}</TableCell>
                    <TableCell align="left">{row.numberBed}</TableCell>
                    <TableCell align="left">{row.emptyPosition}</TableCell>
                    <TableCell align="left">{row.address}</TableCell>
                    <TableCell align="left">{row.lender}</TableCell>
                    <TableCell align="left">{row.passPort}</TableCell>
                    <TableCell align="left">{row.phoneNumber}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.action}</TableCell>
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
    </div>
  );
}
