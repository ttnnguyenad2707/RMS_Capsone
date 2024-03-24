import { Link, useNavigate, useParams } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getBill } from '../../../services/bill';
import { formatMoney, getDate } from '../../../Utils';
import Modal from '@mui/material/Modal';
import BillComponent from '../Bill.component';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,

};
const ModalBillDetail = ({ open, handleClose, billId }) => {
    const [bill, setBill] = useState({})
    useEffect(() => {
        async function fetchBill() {
            getBill(billId).then(res => {
                setBill(res.data.data)
            })
        }
        fetchBill();
    }, [billId])
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: "65vw" }}>
                    <BillComponent bill={bill}/>
                </Box>
            </Modal>
        </>
    );
}

export default ModalBillDetail;