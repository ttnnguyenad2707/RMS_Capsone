import Box from "@mui/material/Box";
import ChartRooms from "./ChartRooms";
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
  return (
    <Box sx={{ position: "relative", backgroundColor: "#FFFFFF" }}>
      <Box
        sx={{ backgroundColor: "#1976d2", alignItems: "center" }}
        className="p-2"
      >
        <p className="fs-4 fw-bold" style={{ color: "#fff", margin: "unset" }}>
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
  );
};
export default CommonRooms;
