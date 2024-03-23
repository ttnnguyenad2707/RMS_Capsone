import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";

const ProblemInfomation = () => {
  const data = [
    {
      category: "Số sự cố mới",
      incidentNumber: 0,
    },
    {
      category: "Số sự cố đang xử lý",
      incidentNumber: 0,
    },
    {
      category: "Số sự cố hoàn thành",
      incidentNumber: 0,
    },
  ];
  return (
    <Box>
      <Box>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h3"
          sx={{ fontWeight: "Bold", color: "#1976d2" }}
        >
          Theo Dõi Sự Cố
        </Typography>
      </Box>
      <TableContainer component={Paper} className="mt-5">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="fw-bold fs-5" sx={{ color: "#1976d2" }}>
                Nội Dung
              </TableCell>
              <TableCell className="fw-bold  fs-5" sx={{ color: "#1976d2" }}>
                Số Sự Cố
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="fs-5">{item.category}</TableCell>
                <TableCell className="fs-5">{item.incidentNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default ProblemInfomation;
