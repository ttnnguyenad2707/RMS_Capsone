import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { getNotification } from "../services/notification";
import { toast } from "react-toastify";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
const DropdownNotification = () => {
    const [notifications, setNotifications] = useState([])
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        getNotification().then(data => {
            setNotifications(data.data.data)
        }).catch(error => {
            toast.error(error)
        })
    }, [])

    return (
        <>
            <IconButton color="inherit" onClick={handleClick} >
                <Badge badgeContent={notifications?.length} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}

            >
                {notifications?.map((notification, index) => (

                    <MenuItem
                        sx={{
                            minWidth: "400px",
                            py: 3
                        }}
                        key={index}
                        onClick={handleClose}
                    >
                        <Box sx={{
                            display: "flex",
                            gap: 3
                        }}>
                            <img src={notification?.avatar === null ? "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg" : notification?.avatar} alt="avatar" width={`100px`} height={`100px`}/>
                            <Typography> {notification?.message} </Typography>
                        </Box>
                        
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

export default DropdownNotification;