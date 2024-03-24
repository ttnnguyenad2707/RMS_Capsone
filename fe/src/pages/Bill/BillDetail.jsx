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
import BillComponent from './Bill.component';

const BillDetail = () => {
    const { billId } = useParams();
    const [bill, setBill] = useState({})
    useEffect(() => {
        async function fetch() {
            getBill(billId).then(data => {
                setBill(data.data.data)
            })
        }
        fetch()
    }, [])
    return (
        <>
            <BillComponent bill={bill}/>
        </>
    );
}

export default BillDetail;