import { Link, useNavigate, useParams } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect, useState } from 'react';
import { confirmBill, getBill } from '../../services/bill';
import Notification from '../../CommonComponents/Notification';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { formatMoney } from '../../Utils';
import { Button } from '@mui/material'

import { usePayOS, PayOSConfig } from "payos-checkout";



const BillComponent = ({ bill }) => {
    
    return (
        <>
            <Box sx={{
                p: 2
            }}>
                <Typography sx={{ fontWeight: 600, fontSize: "20px" }}>Phòng {bill?.roomId?.name}</Typography>


                <Box
                    sx={{
                        mt: 3,
                        border: bill.isPaid === true ? "#26c281 solid 1px" : "#e7505a solid 1px"
                    }}
                >
                    <Box
                        sx={{
                            background: bill.isPaid === true ? "#26c281" : "#e7505a",
                            p: 2,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#FFF",
                                fontSize: "18px",
                            }}
                        >
                            Tháng 3/2024
                        </Typography>
                        <Typography
                            sx={{
                                color: "#FFF",
                                fontSize: "18px",
                            }}
                        >
                            {bill?.isPaid === true ? "Đã thanh toán " : "Chưa thanh toán. Tổng tiền: " + formatMoney(bill?.total)}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            p: 3
                        }}
                    >
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>STT</TableCell>
                                        <TableCell align="left">Tên</TableCell>
                                        <TableCell align="left">Đơn giá</TableCell>
                                        <TableCell align="left">Đơn vị</TableCell>
                                        <TableCell align="left">Chỉ số đầu</TableCell>
                                        <TableCell align="left">Chỉ số cuối</TableCell>
                                        <TableCell align="left">Thành tiền</TableCell>



                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {bill?.priceList?.map((priceItem, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell align="left">{priceItem?.base?.name}</TableCell>
                                            <TableCell align="left">{formatMoney(priceItem?.unitPrice)}</TableCell>
                                            <TableCell align="left">{priceItem?.base?.unit}</TableCell>
                                            <TableCell align="left">{priceItem?.startUnit}</TableCell>
                                            <TableCell align="left">{priceItem?.endUnit}</TableCell>
                                            <TableCell align="right">{formatMoney(priceItem?.totalUnit)}</TableCell>
                                        </TableRow>
                                    ))}

                                    <TableRow>
                                        <TableCell colSpan={6}><Typography sx={{ fontWeight: 600 }}>Tiền phòng/tháng</Typography></TableCell>
                                        <TableCell align="right">{formatMoney(bill.roomPrice)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={6}><Typography sx={{ fontWeight: 600 }}>Tổng</Typography></TableCell>
                                        <TableCell align="right">{formatMoney(bill.total)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {bill.isPaid ? "" : (
                            <Typography sx={{ fontWeight: 600, mt: 3 }}>
                                Link Thanh Toán:
                                <Link to={bill?.paymentLink?.checkoutUrl} target='_blank'>
                                    <Button variant="outlined"> Nhấn vào đây</Button>

                                </Link>
                            </Typography>
                        )}

                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default BillComponent;