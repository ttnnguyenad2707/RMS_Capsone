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
import ModalUpdateProblem from "../pages/ProblemsReport/Component/ModalUpdateProblem";
import { getProblemsInHouse } from "../services/problems";

const TableData = ({ data, setDataSelect, deleteData }) => {
  if (data.length === 0) {
    return <Typography>No data available</Typography>;
  }
  // const [status, setStatus] = useState(""); // Giá trị ban đầu của Status
  const [displayData, setDisplayData] = useState(data);
  const handleStatusUpdate = (datares) => {
    console.log("problemsId", datares._id);
    setDisplayData((prevDisplayData) =>
      prevDisplayData.map((row) =>
        row.id === datares._id ? { ...row, Status: datares.status } : row
      )
    );
  };
  // console.log("status cha", status);
  // useEffect(() => {
  //   setDisplayData(displayData);

  // }, [status]);

  // console.log("data", displayData);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            {Object.keys(displayData[0]).map(
              (key) => key !== "id" && <TableCell key={key}>{key}</TableCell>
            )}
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayData?.map((row, index) => (
            <TableRow key={index}>
              <TableCell key={index}>{index + 1}</TableCell>
              {Object.keys(row).map(
                (key, index) =>
                  key !== "id" && <TableCell key={index}>{row[key]}</TableCell>
              )}
              <TableCell key={index}>
                <Stack spacing={2} direction="row">
                  {/* <Button variant="outlined" onClick={() => updateData(row.id)}>Update</Button> */}
                  <ModalUpdateProblem
                    problemsId={row.id}
                    Room={row.Room}
                    Status={row.Status}
                    onUpdateStatus={handleStatusUpdate}
                  />

                  <Button variant="outlined" onClick={() => deleteData(row.id)}>
                    Delete
                  </Button>
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
