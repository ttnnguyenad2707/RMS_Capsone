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
const CommonRooms = () => {
  const data = [
    { category: "Danh mục 1", content: "Nội dung 1" },
    { category: "Danh mục 2", content: "Nội dung 2" },
    { category: "Danh mục 3", content: "Nội dung 3" },
    { category: "Danh mục 3", content: "Nội dung 3" },
    { category: "Danh mục 3", content: "Nội dung 3" },
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
        <Box sx={{ width: "50%", alignItems:"center" }}>
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
