import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ModalUpdateProblemByHost from "../pages/ProblemsReport/Component/ModalUpdateProblemByHost";
import { getProblemsInHouse } from "../services/problems";
// import { useSelector } from "react-redux";

const TableData = ({ data, setDataSelect, deleteData, userData }) => {

  if (data?.length === 0) {
    return <Typography>No data available</Typography>;
  }
  const [displayData, setDisplayData] = useState(data);
  const handleStatusUpdate = (datares) => {
    console.log("problemsId", datares._id);
    setDisplayData((prevDisplayData) =>
      prevDisplayData.map((row) =>
        row.id === datares._id ? { ...row, Status: datares.status } : row
      )
    );
  };

  const convertStatusToVietnamese = (status) => {
    switch (status) {
      case "done":
        return "Đã giải quyết";
      case "pending":
        return "Đang chờ giải quyết";
      case "doing":
        return "Đang xử lý vấn đề";
      default:
        return "Chưa giải quyết";
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            {/* {Object?.keys(displayData[0]).map(
              (key) => key !== "id" && key !== "Creator" && <TableCell key={key}>{key}</TableCell>
            )} */}
            <TableCell>Tiêu Đề</TableCell>
            <TableCell>Nội Dung</TableCell>
            <TableCell>Trạng Thái</TableCell>
            <TableCell>Phòng</TableCell>
            <TableCell>Hành Động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayData?.map((row, index) => (
            <TableRow key={index}>
              <TableCell key={index}>{index + 1}</TableCell>
              {Object.keys(row).map((key, index) => {
                if (key !== "id" && key !== "Creator") {
                  let cellContent = row[key];
                  if (key === "Status") {
                    cellContent = convertStatusToVietnamese(row[key]);
                  }
                  return <TableCell key={index}>{cellContent}</TableCell>;
                }
              })}

              <TableCell key={index}>
                <Stack spacing={2} direction="row">
                  {/* <Button variant="outlined" onClick={() => updateData(row.id)}>Update</Button> */}
                  <ModalUpdateProblemByHost
                    problemsId={row.id}
                    Room={row.Room}
                    Status={row.Status}
                    onUpdateStatus={handleStatusUpdate}
                  />
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableData;
