import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from 'react';
import ModalAddRenter from './ModalAddRenter';
import { removeMember } from '../../../services/houses';
import Notification from '../../../CommonComponents/Notification';
import ModalUpdateRenter from './ModalUpdateRenter';


const RenterInfo = (props) => {
    const { children, value, index, room, ...other } = props;
    const [members,setMembers] = useState([]);
    const [memberIdUpdate,setMemberIdUpdate] = useState()
    useEffect(() => {
        setMembers(room.members) 
    },[props])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openUpdate, setOpenUpdate] = useState(false);
    const handleOpenUpdate = (memberId) => {
        setMemberIdUpdate(memberId)
        setOpenUpdate(true)
    };
    const handleCloseUpdate = () => setOpenUpdate(false);

    const handleRemoveMember = async (memberId,roomId) => {
        
        Notification("Confirm", "Xác nhận", "Xoá khách thuê này").then(
            async(result) => {
                if (result) {
                    await removeMember(memberId,roomId).then(data => {
                        if (data.data.message === "Success"){
                            Notification("Success", "Đã Xóa", "Thành Công");
                        }
                        else{
                            Notification("Error", "Xảy ra lỗi", "");
                        }
                    });
                    setMembers(prev => prev.filter(member => member._id !== memberId))
                }
                else{
                    console.log("cancel")
                }
            }
        )
    }
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            
        >
            {value === index && (
                <>
                    <Box sx={{
                        p: 2
                    }}>
                        <Button variant='contained' onClick={handleOpen}>Thêm khách thuê</Button>
                        <Box sx={{
                            display: "grid",
                            gridTemplateColumns: "auto auto",
                            gap: 3,
                            height: "600px",
                            overflowY: "auto"
                        }}>
                            {members?.map((member,index) => (
                                <Box key={index} sx={{
                                    mt: 3,
                                    border: "1px solid #CCC"
                                }}>
                                    <Typography sx={{
                                        p: 1,
                                        background: index === 0 ? "#e7505a": "#26c281",
                                        color: "#FFF",
                                        fontSize: "18px"
                                    }}>
                                        <FaUser /> {member.name} {index === 0 ? "( Đại diện )" : ""}
                                    </Typography>
                                    <Box sx={{
                                        display: "flex",
                                        gap: 2,
                                        p: 2
                                    }}>
                                        <img src="https://quanlynhatro.com/frontend3/assets/img/avatar_thue@1x.png" alt="avatar" height="100px" width="100px" />
                                        <Box sx={{
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "column"
                                        }}>
                                            <Typography>Họ và tên : {member?.name}</Typography>
                                            <Typography>CCCD : {member?.cccd}</Typography>
                                            <Typography>SĐT : {member?.phone}</Typography>
                                            <Typography>Giới tính  : {member?.gender}</Typography>
                                            <Typography>Ngày sinh  : {member?.dob}</Typography>
                                            <Button variant='outlined' sx={{ mt: 2 }} onClick={() => handleOpenUpdate(member._id)}>Cập nhật thông tin khách thuê</Button>
                                            <Button variant='outlined' color='error' sx={{ mt: 2 }} onClick={()=> handleRemoveMember(member._id,room._id)}>Xoá khách thuê</Button>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                            
                            
                        </Box>


                    </Box>
                    <ModalAddRenter handleClose={handleClose} open={open} room={room} setMembers={setMembers} />
                    <ModalUpdateRenter handleClose={handleCloseUpdate} open={openUpdate} room={room} setMembers={setMembers} memberId={memberIdUpdate} />

                </>
            )}
        </div>
    );
}

export default RenterInfo;