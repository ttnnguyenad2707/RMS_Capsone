import { useEffect, useState } from "react";
import SelectHouse from "../../CommonComponents/SelectHouse";
import { confirmBill, getBills } from "../../services/bill";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { formatMoney } from "../../Utils";
import { GetRooms, getRoomWithBills } from "../../services/houses";
import SelectMonth from "../../CommonComponents/SelectMonth";
import Alert from '@mui/material/Alert';
import Notification from "../../CommonComponents/Notification";
import ModalBillCreate from "../Rooms/Bills/ModalBillCreate";
import ModalBillDetail from "./components/ModalBillDetail";

const ListBill = () => {
    const [roomIdSelected,setRoomIdSelected ] = useState()
    const [openAddBill,setOpenAddBill] = useState(false); 
    const [selectedHouseId, setSelectedHouseId] = useState();
    const [monthSelected, setMonthSelected] = useState();
    const [roomAndBills, setRoomAndBills] = useState([])
    const [openBillDetail,setOpenBillDetail] = useState(false);
    const [billIdSelected,setBillIdSelected] = useState();

    useEffect(() => {
        async function fetchBills() {
            const query = {
                month: monthSelected
            }
            await getRoomWithBills(selectedHouseId, query).then(data => {
                console.log(data.data.data);
                setRoomAndBills(data.data.data)
            })
        }
        fetchBills()
    }, [selectedHouseId, monthSelected])

    const handleOpenBillDetail = (billId) => {
        console.log(billId);
        setBillIdSelected(billId)
        setOpenBillDetail(true);
    }
    const handleCloseBillDetail = () => {
        setRoomIdSelected(null)
        setOpenBillDetail(false);
    }

    const handleOpenAddBill = (roomId) => {
        setRoomIdSelected(roomId)
        setOpenAddBill(true);
    }
    const handleCloseAddBill = (message, bill, roomId) => {
        if (message === "added") {
            try {
                const updatedRoomAndBills = [...roomAndBills];
    
                updatedRoomAndBills.forEach(roomAndBill => {
                    if (roomAndBill.room._id === roomId) {
                        roomAndBill.bill =  bill; 
                    }
                });
    
                setRoomAndBills(updatedRoomAndBills);
            } catch (error) {
                console.log(error);
            }
        }
        setRoomIdSelected(null)
        setOpenAddBill(false);
    };
    
    
    const cashBill = (billId,roomName,roomId) => {
        Notification("Confirm","Bạn chắc chắn hoá đơn phòng "+ roomName+ " đã được thanh toán bằng tiền mặt","")
        .then( async (result) => {
            if (result) {
                try {
                    confirmBill(billId,{paymentMethod: "Cash"}).then(res => {
                        const updatedRoomAndBills = [...roomAndBills];

                        updatedRoomAndBills.forEach(roomAndBill => {
                            if (roomAndBill?.room?._id === roomId) {
                                roomAndBill.bill.isPaid = true; // Cập nhật trạng thái isPaid thành true
                            }
                        });

                        setRoomAndBills(updatedRoomAndBills);
                    });
                    Notification("Success", "Đã xác nhận", "Thanh toán bằng tiền mặt phòng "+ roomName + " thành công");
                    
                } catch (error) {
                    console.log(error);
                }
            }
        })
        
    }
    return (
        <>
            <SelectHouse onSelect={setSelectedHouseId} />
            <SelectMonth setMonthSelected={setMonthSelected} />
            <Box sx={{
                p: 2
            }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell align="right">Phòng</TableCell>
                                <TableCell align="right">Số người đang ở</TableCell>
                                <TableCell align="right">Thành tiền tháng này</TableCell>
                                <TableCell align="right">Đã tạo hoá đơn</TableCell>
                                <TableCell align="right">Đã thanh toán</TableCell>
                                <TableCell align="right">Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {roomAndBills?.map((roomAndBill, index) => (
                                <TableRow>
                                    <TableCell align="right">{index + 1}</TableCell>
                                    <TableCell align="right">{roomAndBill?.room?.name}</TableCell>
                                    <TableCell align="right">{roomAndBill?.room?.members.length}</TableCell>
                                    <TableCell align="right">{formatMoney(roomAndBill?.bill?.total)}</TableCell>
                                    <TableCell align="right">
                                        {roomAndBill?.bill === null ? (<Alert severity="error">Chưa tạo hoá đơn</Alert>) : (<Alert severity="success">Đã tạo hoá đơn</Alert>)}

                                    </TableCell>
                                    <TableCell align="right">
                                        {roomAndBill?.bill?.isPaid === true ? (
                                            <Alert severity="success">Đã thanh toán</Alert>
                                        ) : (
                                            <Alert severity="error">Chưa thanh toán</Alert>
                                        )}
                                    </TableCell>
                                    <TableCell sx={{
                                    }}>
                                        <Button sx={{mr:1}} variant="outlined" disabled={roomAndBill?.bill !== null} onClick={() => handleOpenAddBill(roomAndBill?.room?._id)} >Tạo hoá đơn</Button>
                                        <Button sx={{mr:1}} variant="outlined" disabled={roomAndBill?.bill === null} onClick={() => handleOpenBillDetail(roomAndBill?.bill?._id)}>Xem chi tiết</Button>
                                        <Button sx={{mr:1}} variant="outlined" onClick={() => cashBill(roomAndBill?.bill?._id,roomAndBill?.room?.name,roomAndBill?.room?._id)} disabled={roomAndBill?.bill?.isPaid === true}>Đã thanh toán bằng tiền mặt</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <ModalBillCreate open={openAddBill} handleClose={handleCloseAddBill} roomId={roomIdSelected}/>
            <ModalBillDetail open={openBillDetail} handleClose={handleCloseBillDetail} billId={billIdSelected}/>
        </>
    );
}

export default ListBill;