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
import { statisticProblem } from "../../../services/statistic";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ProblemInfomation = () => {
  const [statistic, setStatistic] = React.useState()
  const [isLoading,setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchStatisticProblems(){
      statisticProblem().then(data => {
        setIsLoading(false);
        setStatistic(data.data.data)
      })

    }
    fetchStatisticProblems()
  },[])
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
              <TableRow >
                <TableCell className="fs-5">Sự cố mới</TableCell>
                <TableCell className="fs-5">{isLoading === true ? (<AiOutlineLoading3Quarters/>) : statistic?.numberProblemNone}</TableCell>
              </TableRow>
              <TableRow >
                <TableCell className="fs-5">Sự cố đang xử lý</TableCell>
                <TableCell className="fs-5">{isLoading === true ? (<AiOutlineLoading3Quarters/>) : statistic?.numberProblemDoing}</TableCell>
              </TableRow>
              <TableRow >
                <TableCell className="fs-5">Sự cố đã hoàn thành</TableCell>
                <TableCell className="fs-5">{isLoading === true ? (<AiOutlineLoading3Quarters/>) : statistic?.numberProblemDone}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default ProblemInfomation;
