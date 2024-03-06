import Box from "@mui/material/Box";
import ChartRooms from "./ChartRooms";
import { GetRooms } from "../../../services/houses";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../../../reduxToolkit/RoomSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import * as React from "react";
const CommonRooms = ({ houseData }) => {
  console.log(houseData);
  const roomsData = useSelector((state) => state.room.rooms);
  const data = [
    {
      category: "Tên Chủ Nhà",
      content: houseData ? houseData.hostId.name : "Không có Dữ Liệu",
    },
    {
      category: "Trạng Thái ",
      content: houseData
        ? houseData.status
          ? "Đang Hoạt Động"
          : "Không Hoạt Động"
        : "Không có Dữ Liệu",
    },
    {
      category: "Email",
      content: houseData ? houseData.hostId.email : "Không có Dữ Liệu",
    },
    {
      category: "Số Điện Thoại",
      content: houseData ? houseData.hostId.phone : "Không có Dữ Liệu",
    },
    {
      category: "Số Lượng Phòng",
      content: houseData ? houseData.numberOfRoom : "Không có Dữ Liệu",
    },
    // Thêm dữ liệu danh mục và nội dung tương ứng ở đây
  ];
  // Thêm dữ liệu danh mục và nội dung tương ứng ở đây
  return (
    <Box>
      <Box sx={{ position: "relative", backgroundColor: "#FFFFFF", boxShadow:"0px 0px 10px 2px #888888" }}>
        <Box
          sx={{ backgroundColor: "#1976d2", alignItems: "center" }}
          className="p-2"
        >
          <p
            className="fs-4 fw-bold"
            style={{ color: "#fff", margin: "unset" }}
          >
            Thông Tin Chung
          </p>
        </Box>
        <Box sx={{ display: "flex", padding: "20px" }}>
          <Box sx={{ width: "50%", alignItems: "center" }}>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.content}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box>
            <p className="fs-5 fw-bold d-flex justify-content-center">
              Tỷ Lệ Đầy Phòng
            </p>
            <ChartRooms />
          </Box>
        </Box>
      </Box>
      <Box sx={{ position: "relative", backgroundColor: "#FFFFFF" }} className = "mt-3">
        <Box
          sx={{ backgroundColor: "#1976d2", alignItems: "center" }}
          className="p-2"
        >
          <p
            className="fs-4 fw-bold"
            style={{ color: "#fff", margin: "unset" }}
          >
            Thông Tin Phòng
          </p>
        </Box>
        <TableContainer component={Paper} sx={{ mt: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tầng</TableCell>
                <TableCell>Tên</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Số lượng người</TableCell>
                <TableCell>Diện Tích</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roomsData ? (
                roomsData.map((room, index) => (
                  <TableRow key={index}>
                    <TableCell>{room.floor}</TableCell>
                    <TableCell>{room.name}</TableCell>
                    <TableCell>{room.status}</TableCell>
                    <TableCell>{room.quantityMember}</TableCell>
                    <TableCell>{room.area}</TableCell>
                  </TableRow>
                ))
              ) : (
                <Box>Không Có Dữ Liệu</Box>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
export default CommonRooms;
