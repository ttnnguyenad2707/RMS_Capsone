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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/vi";
const PaymentTracking = () => {
  const [month, setMonth] = React.useState();
  const [year, setYear] = React.useState();
  dayjs.locale("vi"); // Thiết lập ngôn ngữ tiếng Việt cho dayjs
  const data = [
    {
      category: "Tổng số hóa đơn đã thanh toán",
      numberBill: 0,
      totalBill: 0,
    },
    {
      category: "Tổng số hóa đơn chưa thanh toán hết",
      numberBill: 0,
      totalBill: 0,
    },
  ];
  console.log(year, "year");
  console.log(month, "month");
  return (
    <Box>
      <Box>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h3"
          sx={{ fontWeight: "Bold", color: "#1976d2" }}
        >
          Theo Dõi Thanh Toán
        </Typography>
      </Box>
      <Box className="d-flex mt-5">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              label="Chọn năm"
              views={["year"]}
              openTo="year"
              onChange={(newValue) => setYear(newValue.$y)}
            />
            <DatePicker
              label="Chọn tháng"
              views={["month"]}
              openTo="month"
              onChange={(newValue) => setMonth(newValue.$M+1)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
      <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="fw-bold fs-5" sx={{ color: "#1976d2" }}>
                Nội Dung
              </TableCell>
              <TableCell className="fw-bold  fs-5" sx={{ color: "#1976d2" }}>
                Số Hóa Đơn
              </TableCell>
              <TableCell className="fw-bold  fs-5" sx={{ color: "#1976d2" }}>
                Số Tiền
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="fs-5">{item.category}</TableCell>
                <TableCell className="fs-5">{item.numberBill}</TableCell>
                <TableCell className="fs-5">{item.totalBill}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default PaymentTracking;
