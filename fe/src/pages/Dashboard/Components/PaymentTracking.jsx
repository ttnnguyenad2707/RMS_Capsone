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
import { statisticBills } from "../../../services/statistic";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { formatMoney } from "../../../Utils";

const PaymentTracking = () => {
  const [month, setMonth] = React.useState(`${dayjs().$M+1}-${dayjs().$y}`);
  const [statistic, setStatistic] = React.useState()
  const [isLoading,setIsLoading] = React.useState(true)
  dayjs.locale("vi");

  React.useEffect(() => {
    async function fetchStatisticBills() {
      setIsLoading(true)
      const query = {
        month: month
      }
      statisticBills(query).then(data => {
        setStatistic(data.data.data);
        setIsLoading(false)
      }).catch(error => {
        console.log(error.response);
      })
    }
    fetchStatisticBills()
  }, [month])
  console.log(month);
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
              label="Chọn tháng"
              views={["year", "month"]}
              openTo="month"
              defaultValue={dayjs()}
              onChange={(newValue) => setMonth(`${newValue.$M + 1}-${newValue.$y}`)}
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
              <TableRow >
                <TableCell className="fs-5">Tổng hoá đơn đã thanh toán </TableCell>
                <TableCell className="fs-5">{isLoading === true ? (<AiOutlineLoading3Quarters/>)  : statistic?.billIsPaid}</TableCell>
                <TableCell className="fs-5">{isLoading === true ? (<AiOutlineLoading3Quarters/>)  : formatMoney(statistic?.totalBillIsPaid)}</TableCell>
              </TableRow>
              <TableRow >
                <TableCell className="fs-5">Tổng hoá đơn chưa thanh toán </TableCell>
                <TableCell className="fs-5">{isLoading === true ? (<AiOutlineLoading3Quarters/>)  : statistic?.billIsNotPaid}</TableCell>
                <TableCell className="fs-5">{isLoading === true ? (<AiOutlineLoading3Quarters/>)  : formatMoney(statistic?.totalBillIsNotPaid)}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default PaymentTracking;
