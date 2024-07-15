import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { fetchDefaultPrice } from "../../../reduxToolkit/DefaultPrice";
import { fetchOneHouse, updateHouse } from "../../../reduxToolkit/HouseSlice";
import { formatMoney } from "../../../Utils";
import Notification from "../../../CommonComponents/Notification";
import AddSettingPrice from "./AddSettingPrice";
import { RemovePriceItem } from "../../../services/houses";
const StyledTableRow = styled(TableRow)(() => ({
    backgroundColor: "#1976d2",
    "td, th": {
        fontWeight: "bold",
        color: "#ffffff",
    },
}));
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    height: "60%",
    bgcolor: "background.paper",
    border: "2px solid #grey",
    boxShadow: 25,
    p: 5,
    borderRadius: "10px",
    padding: "18px",
    overflow: "auto",
};
const stylesHeader = {
    color: "#5A67BA",
    display: "flex",
    position: "relative",
    fontWeight: "Bold",
};
const headCells = [
    {
        id: "stt",
        label: "STT",
    },
    {
        id: "typePrice",
        label: "Loại Phí",
    },
    {
        id: "unitPrice",
        label: "Đơn Giá",
    },
    {
        id: "unit",
        label: "Đơn Vị",
    },
    {
        id: "action",
        label: "Thao Tác",
    },
];

const SettingPrice = ({ houseId }) => {
    
    const [open, setOpen] = useState(false);
    const [settingPrices, setSettingPrices] = useState();
    const dispatch = useDispatch();
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        async function fetchHouse() {
            const response = await dispatch(fetchOneHouse({ houseId }));
            setSettingPrices(response?.payload?.pricelistitem)
        }
        fetchHouse()
    }, [houseId])

    const handleDeletePrice = async (idPrice) => {
        const id = houseId
        Notification("Confirm", "Xác Nhận", "Xóa Loại Kinh Phí Này").then(
            async (result) => {
                if (result) {
                    RemovePriceItem(id,idPrice).then(data => {
                        setSettingPrices(prev => prev.filter(item => item.id !== idPrice))
                        Notification("Success",data.data.data.message,"")
                    })
                    
                } else {
                    console.log("Người dùng đã chọn Cancel");
                    
                }
            }
        );
    };

    if (!houseId) return (<></>)
    return (
        <>
            <Button
                color="info"
                variant="contained"
                className="me-3"
                onClick={handleOpen}
            >
                Cấu hình bảng giá
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={stylesHeader}>
                        <Typography
                            id="modal-modal-title"
                            variant="h4"
                            component="h3"
                            sx={{ fontWeight: "Bold" }}
                        >
                            Cấu Hình Bảng Giá
                        </Typography>
                        <IconButton
                            sx={{ position: "absolute", right: "10px" }}
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <hr />
                    <Box>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <StyledTableRow>
                                        {headCells.map((headCell) => (
                                            <TableCell key={headCell.id} align="left">
                                                {headCell.sort === true ? (
                                                    <TableSortLabel
                                                        active={true}
                                                        direction="asc"
                                                        onClick={() => handleSort(headCell.id)}
                                                        className="label-header"
                                                    >
                                                        {headCell.label}
                                                    </TableSortLabel>
                                                ) : (
                                                    headCell.label
                                                )}
                                            </TableCell>
                                        ))}
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {settingPrices?.map((settingPrice, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{
                                                "&:last-child td, &:last-child th": {
                                                    border: 0,
                                                },
                                            }}
                                        >
                                            <TableCell align="left" sx={{ width: "10%" }}>
                                                {index + 1}
                                            </TableCell>
                                            <TableCell align="left" sx={{ width: "20%" }}>
                                                {settingPrice?.defaultprice?.name}
                                            </TableCell>
                                            <TableCell align="left" sx={{ width: "20%" }}>
                                                {formatMoney(settingPrice?.price)}
                                            </TableCell>
                                            <TableCell align="left" sx={{ width: "20%" }}>
                                                {settingPrice?.defaultprice?.unit}
                                            </TableCell>
                                            <TableCell align="left" sx={{ width: "30%" }}>
                                                <Button variant="outlined" color="error" onClick={() => handleDeletePrice(settingPrice?.id)}>Xoá</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <AddSettingPrice houseId={houseId} setSettingPrices={setSettingPrices}/>
                </Box>
            </Modal>
        </>);
}

export default SettingPrice;