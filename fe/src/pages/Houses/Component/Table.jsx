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
    action,
  };
}
const list = [
  createData(
    "1",
    "Nguyên",
    "3 phòng",
    "3",
    "3",
    "Hưng",
    "Trần Trung Nguyên",
    "001202999999",
    "0123456789",
    "trantrungnguyenad@gmail.com",
    <div className="d-flex">
      <Button variant="contained" color="primary">
        Nút 1
      </Button>
      <Button variant="contained" color="secondary">
        Nút 2
      </Button>
    </div>
  ),
  createData(
    "1",
    "Long",
    "3 phòng",
    "3",
    "3",
    "Hưng",
    "Trần Trung Nguyên",
    "001202999999",
    "0123456789",
    "trantrungnguyenad@gmail.com",
    <div className="d-flex">
      <Button variant="contained" color="primary">
        Nút 1
      </Button>
      <Button variant="contained" color="secondary">
        Nút 2
      </Button>
    </div>
  ),
  createData(
    "1",
    "Hải",
    "3 phòng",
    "3",
    "3",
    "Hưng",
    "Trần Trung Nguyên",
    "001202999999",
    "0123456789",
    "trantrungnguyenad@gmail.com",
    <div className="d-flex">
      <Button variant="contained" color="primary">
        Nút 1
      </Button>
      <Button variant="contained" color="secondary">
        Nút 2
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
export default function BasicTable() {
  const [rows, setRows] = useState([]);
  const [status,setStatus] = useState([]);
  useEffect(() => {
    setRows(list);
  }, []);
  const StyledTableRow = styled(TableRow)(() => ({
    backgroundColor: "#5A67BA",
  }));
  const sortCharacter= (character1,character2 )=> {
    return character1.toLowerCase().localeCompare(character2.toLowerCase())
  }
  const sortCharacterBack= (character1,character2 )=> {
    return -(character1.toLowerCase().localeCompare(character2.toLowerCase()))
  }
  const handleSort = (data) => {
    const sortedRows = rows.slice();
    // Sắp xếp mảng sao chép
    sortedRows.sort((a, b) => sortCharacter(a.houseName, b.houseName));
    // Cập nhật state rows
    setRows(sortedRows);
  };
  return (
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
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
  );
}
