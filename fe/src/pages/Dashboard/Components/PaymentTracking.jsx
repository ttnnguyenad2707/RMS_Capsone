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
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
const PaymentTracking = () => {
  const [year, setYear] = React.useState();
  const [month, setMonth] = React.useState();
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
  const handleChangeYear = (date) => {
    if (date !== null) {
      setYear(date);
    }
  };
  const handleChangeMonth = (date) => {
    if (date !== null) {
      setMonth(date);
    }
  };
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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            views={["year"]}
            label="Chọn năm"
            value={year}
            onChange={handleChangeYear}
          />
          <DatePicker
            views={["month"]}
            label="Chọn tháng"
            value={month}
            onChange={handleChangeMonth}
          />
        </MuiPickersUtilsProvider>
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
