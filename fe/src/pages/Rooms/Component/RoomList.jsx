import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { formatMoney } from "../../../Utils";
import PopupInfoRoom from "./PopupInfoRoom";
import { GetRooms, getFloor } from "../../../services/houses";

const RoomList = ({ house }) => {
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [floorSelected, setFloorSelected] = useState(1);
  const [floors, setFloors] = useState([]);
  const [roomIdSelect, setRoomIdSelect] = useState("");
  const [expanded, setExpanded] = useState({});
  useEffect(() => {
    async function fetchFloor() {
      await getFloor(house._id).then((data) => {
        setFloors(data.data.data);
      });
    }
    setFloorSelected(1);
    fetchFloor();
  }, [house]);
  useEffect(() => {
    async function fetchRoomInFloor() {
      const filterParams = {
        floor: floorSelected,
        page: 1,
        limit: 30,
      };
      await GetRooms(house._id, filterParams).then((data) => {
        setRooms(data.data.data);
      });
    }
    fetchRoomInFloor();
  }, [floorSelected, house]);
  const handleChangeFloor = (floor) => {
    setFloorSelected(floor);
  };
  const handleOpen = (id) => {
    setRoomIdSelect(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAccordionChange = (id) => {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  useEffect(() => {
    if (rooms) {
      const initialExpandedState = {};
      rooms.forEach((room, index) => {
        initialExpandedState[index] = true;
      });
      setExpanded(initialExpandedState);
    }
  }, [rooms]);
  const handleEditButtonClick = (event) => {
    event.stopPropagation();
  };
  const handleDeleteButtonClick = (event) => {
    event.stopPropagation();
  };
  return (
    <Box
      sx={{
        p: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 3,
        }}
      >
        {floors?.map((floor, index) => (
          <Button
            variant={floorSelected === floor ? "contained" : "outlined"}
            key={index}
            onClick={() => handleChangeFloor(floor)}
          >
            Tầng {floor}
          </Button>
        ))}
      </Box>
      {rooms?.map((room, index) => (
        <Accordion
          key={index}
          expanded={expanded[index] || false}
          onChange={() => handleAccordionChange(index)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                p: 1,
              }}
            >
              <Typography sx={{ fontSize: "20px" }}>
                Phòng {room.name} -{" "}
                {room.members.length === 0 ? "Đang trống" : "Đang ở"}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                }}
              >
                <Button variant="contained" onClick={handleEditButtonClick}>
                  Sửa thông tin
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDeleteButtonClick}
                >
                  Xoá
                </Button>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Giá</TableCell>
                    <TableCell align="right">Loại phòng </TableCell>
                    <TableCell align="right">Diện tích (m2) </TableCell>
                    <TableCell align="right">Số người tối đa</TableCell>
                    <TableCell align="right">Số người hiện tại</TableCell>
                    <TableCell align="right">Số tiền chưa thanh toán</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{formatMoney(room.roomPrice)}</TableCell>
                    <TableCell align="right">
                      {room.roomType === "normal" ? "Bình Thường" : "Cao cấp"}{" "}
                    </TableCell>
                    <TableCell align="right">{room.area}</TableCell>
                    <TableCell align="right">{room.quantityMember}</TableCell>
                    <TableCell align="right">{room.members.length}</TableCell>
                    <TableCell align="right">Số tiền chưa thanh toán</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                mt: 3,
              }}
            >
              <Button variant="contained" onClick={() => handleOpen(room._id)}>
                Thông tin phòng
              </Button>
              <Button variant="contained" color="warning">
                Tạo hoá đơn
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
      <PopupInfoRoom
        open={open}
        handleClose={handleClose}
        roomId={roomIdSelect}
      />
    </Box>
  );
};

export default RoomList;
