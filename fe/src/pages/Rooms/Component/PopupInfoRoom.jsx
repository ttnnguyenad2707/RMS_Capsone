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
import GeneralInfo from '../DetailRoom/GeneralInfo';
import RenterInfo from '../DetailRoom/RenterInfo';
import ListBill from '../DetailRoom/ListBill';
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

const PopupInfoRoom = ({ setRooms,roomId, open, handleClose }) => {
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
            <Box sx={{ ...style, width: "65vw" }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Thông tin phòng" value={1} />
                    <Tab label="Khách thuê" value={2} />
                    <Tab label="Thông tin hoá đơn" value={3} />

                </Tabs>
                <GeneralInfo value={value} index={1} room={room} />
                <RenterInfo setRooms={setRooms} value={value} index={2} room={room} />
                <ListBill value={value} index={3} room={room}/>



            </Box>
        </Modal>
    );
}

export default PopupInfoRoom;