import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ChartRooms from "../../Rooms/Component/ChartRooms";
import { useEffect, useState } from "react";
import { statisticGeneral } from "../../../services/statistic";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const styleBox = {
  backgroundColor: "#1976d2",
  color: "#fff",
  width: "23%",
  height: "120px",
  padding: "20px",
};
const CommonInformation = () => {
  const [statistic, setStatistic] = useState();
  const [isLoading,setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchStatistic() {
      statisticGeneral().then(data => {
        setIsLoading(false)
        setStatistic(data.data.data)
      }).catch(error => {
        console.log(error.response);
      })
    }
    fetchStatistic()
  }, [])

  return (
    <Box>
      <Box>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h3"
          sx={{ fontWeight: "Bold", color: "#1976d2" }}
        >
          Thông Tin Chung
        </Typography>
      </Box>
      <Box className="d-flex justify-content-between mt-3 ">
        <Box className="d-flex flex-column align-items-start" sx={styleBox}>
          <Typography className="fs-5">Số Nhà</Typography>
          <Typography className="fs-2">{isLoading === true ? (<AiOutlineLoading3Quarters/>) : statistic?.houseNumber}</Typography>
        </Box>
        <Box className="d-flex flex-column align-items-start" sx={styleBox}>
          <Typography className="fs-5">Số Phòng</Typography>
          <Typography className="fs-2">{isLoading === true ? (<AiOutlineLoading3Quarters/>) : statistic?.roomNumber}</Typography>
        </Box>
        <Box className="d-flex flex-column align-items-start" sx={styleBox}>
          <Typography className="fs-5">Số Phòng Trống</Typography>
          <Typography className="fs-2">{isLoading === true ? (<AiOutlineLoading3Quarters/>) : statistic?.roomNumberEmpty}</Typography>
        </Box>
        <Box className="d-flex flex-column align-items-start" sx={styleBox}>
          <Typography className="fs-5">Số Phòng Đã Thuê</Typography>
          <Typography className="fs-2">{isLoading === true ? (<AiOutlineLoading3Quarters/>) : statistic?.roomNumberNotEmpty}</Typography>
        </Box>
      </Box>
      {/* <ChartRooms/> */}
    </Box>
  );
};
export default CommonInformation;
