import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FaUser } from "react-icons/fa";
import { useState } from 'react';
import ModalAddRenter from './ModalAddRenter';


const RenterInfo = (props) => {
    const { children, value, index, room, ...other } = props;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
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
                            width: "50%",
                            mt: 3,
                            border: "1px solid #CCC"
                        }}>
                            <Typography sx={{
                                p:1,
                                background: "#26c281",
                                color: "#FFF",
                                fontSize: "18px"
                            }}>
                                <FaUser /> Trần Trung Nguyên ( Đại diện )
                            </Typography>
                            <Box sx={{
                                display: "flex",
                                gap: 2,
                                p: 2
                            }}>
                                <img src="https://quanlynhatro.com/frontend3/assets/img/avatar_thue@1x.png" alt="avatar" height="100px" width="100px"/>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column"
                                }}>
                                    <Typography>Họ và tên : Tran Trung Nguyen</Typography>
                                    <Typography>CCCD : Tran Trung Nguyen</Typography>
                                    <Typography>SĐT : Phone</Typography>
                                    <Typography>Giới tính  : Phone</Typography>
                                    <Typography>Ngày sinh  : Phone</Typography>
                                    <Button variant='outlined' sx={{mt:2}}>Cập nhật thông tin khách thuê</Button>
                                    <Button variant='outlined' color='error' sx={{mt:2}}>Xoá khách thuê</Button>
                                </Box>                            
                            </Box>
                        </Box>
    
                    </Box>
                    <ModalAddRenter handleClose={handleClose} open={open}/>

                </>
            )}
        </div>
    );
}
 
export default RenterInfo;