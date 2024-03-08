import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { getOneRoom } from '../../../services/houses';
import { formatMoney } from '../../../Utils';
import Checkbox from '@mui/material/Checkbox';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
function GeneralInfo(props) {
    const { children, value, index, room, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: "auto auto auto auto",
                        gap: 4
                    }}>
                        <Typography>
                            Tầng : {room.floor}
                        </Typography>
                        <Typography>
                            Tên phòng : {room.name}
                        </Typography>
                        <Typography>
                            Loại : {room.roomType === "normal" ? "Thường" : "Cao Cấp"}
                        </Typography>
                        <Typography>
                            Đơn giá : {formatMoney(room?.roomPrice)}
                        </Typography>
                        <Typography>
                            Số người phù hợp : {room.quantityMember}
                        </Typography>
                        <Typography>
                            Số người đang thuê : {room && room.members ? room.members.length : 0}
                        </Typography>
                        <Typography>
                            Tình trạng : {room && room.members && room.members.length === 0 ? "Chưa có khách thuê" : "Đã cho thuê"}
                        </Typography>

                    </Box>
                    {/* <Box>
                        <Typography>Tiện ích: </Typography>
                        <Checkbox label={"chec"}></Checkbox>
                    </Box> */}
                </Box>
            )}
        </div>
    );
}
const PopupInfoRoom = ({ roomId, open, handleClose }) => {
    const [room, setRoom] = useState({});
    const [value, setValue] = useState(1);

    useEffect(() => {
        async function fetchData() {
            getOneRoom(roomId).then(data => {
                setRoom(data.data.data);
            })
        }
        fetchData();
    }, [roomId])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style, width: "60vw" }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Thông tin phòng" value={1} />
                    <Tab label="Khách thuê" value={2} />
                    <Tab label="Lịch sử thanh toán" value={3} />
                    <Tab label="Vấn đề" value={4} />

                </Tabs>
                <GeneralInfo value={value} index={1} room={room} />




            </Box>
        </Modal>
    );
}

export default PopupInfoRoom;