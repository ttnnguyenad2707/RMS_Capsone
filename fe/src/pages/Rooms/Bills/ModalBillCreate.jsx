import React, { useEffect, useMemo, useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getOneRoom } from "../../../services/houses";
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Field, Form, Formik } from "formik";
import { convertStringToNumber, formatMoney } from "../../../Utils";
import FormControl from '@mui/material/FormControl';
import { addBill, getDebt } from "../../../services/bill";
import Notification from "../../../CommonComponents/Notification";
import CircularProgress from '@mui/material/CircularProgress';
import { socket } from "../../../socket/socket";



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,

};

const ModalBillCreate = ({ open, handleClose, roomId }) => {
    const [room, setRoom] = useState();
    const [dateValue, setDateValue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [debt, setDebt] = useState()
    useEffect(() => {
        let isMounted = true;
        async function fetchData() {
            getOneRoom(roomId).then(data => {
                setRoom(data.data.data);
            })
            getDebt(roomId).then(data => {
                setDebt(data.data.data.debt)
            })
        }
        fetchData();
        return () => {
            isMounted = false;
        };
    }, [roomId])
    useEffect(() => {
        const now = new Date();
        const formattedDate = `${now.getMonth() + 1}/${now.getFullYear()}`;
        setDateValue(formattedDate);
    }, []);

    const handleAddBill = async (values, { resetForm }) => {
        try {
            setIsSubmitting(true);

            const priceListToAdd = []
            room?.house?.pricelistitem?.map((priceItem, index) => {
                const startUnitKey = `startUnit-${index}`
                const endUnitKey = `endUnit-${index}`

                const itemPriceToAdd = {
                    base: priceItem.baseId,
                    unitPrice: priceItem.price,
                    startUnit: values[startUnitKey] || 0,
                    endUnit: values[endUnitKey] || 0,

                }
                priceListToAdd.push(itemPriceToAdd);
            })
            const dataPayload = {
                priceList: priceListToAdd,
                note: values.note
            }
            await addBill(roomId, dataPayload).then(res => {
                if (res.data.statusCode === 201) {
                    Notification("Success", "Thêm hoá đơn", "Thành công")                   
                    socket.emit("addNotification", { message: "add" });
                    handleClose("added",res.data.data.bill,res.data.data.bill.roomId)
                }
                else {
                    Notification("Error", "Lỗi " + res.data.statusCode, res.data.message)
                }
            }).catch(error => {
                Notification("Error", "Lỗi " + error.response.data.error)
            })
        } catch (error) {
            console.error("Error:", error);

        } finally {
            setIsSubmitting(false)

        }
    }

    const initialValues = useMemo(() => {
        return {
            priceList: [],
            note: ""
        };
    }, []);

    const handleCalculateTotal = (index, values, setFieldValue, unitPrice) => {
        const startUnit = parseFloat(values[`startUnit-${index}`]) || 0;
        const endUnit = parseFloat(values[`endUnit-${index}`]) || 0;
        const total = (endUnit - startUnit) * unitPrice;
        if (total > 0) {
            setFieldValue(`total-${index}`, formatMoney(total));
        }
        if (endUnit <= startUnit) {
            setFieldValue(`total-${index}`, 0);
        }
        
    };

    const handleTotal = (values, setFieldValue) => {
       

        const total = room?.house?.pricelistitem?.reduce((init, item, index) => {
            if (item.defaultprice.unit === "DONG_PER_PERSON") {
                const totalUnit = item.price * room.members.length
                return init + totalUnit
            } else if (item.defaultprice.unit === "DONG_PER_MONTH") {
                const totalUnit = item.price
                return init + totalUnit
            }
            else {

                const totalUnit = convertStringToNumber(values[`total-${index}`]) || 0;
                return init + totalUnit;
            }
        }, 0)
        setFieldValue('total', formatMoney(total + room?.roomPrice + debt))
    }

    if (!room) {
        return (
            <></>
        )
    }


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style, width: "65vw" }}>
                <Typography sx={{
                    fontWeight: 600,
                    p: 2,
                    background: "#5376b9",
                    color: "#FFF",
                    fontSize: "20px"
                }}>
                    Tạo hoá đơn phòng {room?.name}
                </Typography>
                <Box sx={{
                    p: 5
                }}>
                    <Box>
                        <TextField
                            label="Tháng"
                            variant="outlined"
                            value={dateValue}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            mt: 3
                        }}
                    >
                        <Typography sx={{
                            fontWeight: 600,
                            p: 2,
                            background: "#5376b9",
                            color: "#FFF",
                            fontSize: "20px"
                        }}>
                            Phòng {room?.name}, {room?.houseId?.name}
                        </Typography>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={(values, { resetForm }) => handleAddBill(values, { resetForm })}
                        >
                            {({ setFieldValue, values }) => (


                                <Form>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>STT </TableCell>
                                                    <TableCell align="left">Loại phí</TableCell>
                                                    <TableCell align="left">Đơn giá</TableCell>
                                                    <TableCell align="left">Đơn vị</TableCell>
                                                    <TableCell align="left">Chỉ số đầu</TableCell>
                                                    <TableCell align="left">Chỉ số Cuối</TableCell>
                                                    <TableCell align="left">Thành tiền</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>



                                                {room?.house?.pricelistitem.map((priceItem, index) => (
                                                    <TableRow key={index}>

                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell align="left">{priceItem?.defaultprice?.name}</TableCell>
                                                        <TableCell align="left">{priceItem?.defaultprice?.unit}</TableCell>
                                                        <TableCell align="left">{formatMoney(priceItem?.price)}</TableCell>
                                                        <TableCell align="left">
                                                            <Field
                                                                type="number"
                                                                placeholder="Chỉ số đầu"
                                                                id="startUnit"
                                                                min="0"
                                                                name={`startUnit-${index}`}
                                                                onBlur={() => handleCalculateTotal(index, values, setFieldValue, priceItem?.price)}
                                                                disabled={!(priceItem?.defaultprice?.unit === "DONG_PER_BLOCK" || priceItem?.defaultprice?.unit === "DONG_PER_kWh")}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            <Field
                                                                type="number"
                                                                placeholder="Chỉ số cuối"
                                                                id="endUnit"
                                                                min="0"
                                                                name={`endUnit-${index}`}
                                                                onBlur={() => handleCalculateTotal(index, values, setFieldValue, priceItem?.price)}
                                                                disabled={!(priceItem?.defaultprice?.unit === "DONG_PER_BLOCK" || priceItem?.defaultprice?.unit === "DONG_PER_kWh")}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {(priceItem?.defaultprice?.unit === "DONG_PER_BLOCK" || priceItem?.defaultprice?.unit === "DONG_PER_kWh") ? (

                                                                <Field
                                                                    type="text"
                                                                    id={`total-${index}`}
                                                                    name={`total-${index}`}
                                                                    disabled={true}
                                                                />
                                                            ) : (
                                                                <Field
                                                                    type="text"
                                                                    id={`total-${index}`}
                                                                    name={`total-${index}`}
                                                                    disabled={true}
                                                                    value={priceItem?.defaultprice?.unit === "DONG_PER_MONTH" ? formatMoney(priceItem?.price) : (priceItem?.defaultprice?.unit === "DONG_PER_PERSON" ? formatMoney((priceItem?.price * room?.members.length)) : "")}
                                                                />
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                                <TableRow>
                                                    <TableCell colSpan={6}><Typography sx={{ fontWeight: 600 }}>Tiền Phòng</Typography> </TableCell>
                                                    <TableCell align="left">{formatMoney(room?.roomPrice)}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell colSpan={6}><Typography sx={{ fontWeight: 600 }}>Tiền Nợ</Typography> </TableCell>
                                                    <TableCell align="left">{formatMoney(debt)}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell colSpan={5}><Typography sx={{ fontWeight: 600 }}>Tổng tiền</Typography> </TableCell>
                                                    <TableCell colSpan={1}><Button variant="outlined" onClick={() => handleTotal(values, setFieldValue)}>Tính tổng</Button> </TableCell>

                                                    <TableCell align="left">
                                                        <Field
                                                            type="text"
                                                            name='total'
                                                            id='total'
                                                            disabled
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Box
                                        sx={{
                                            mt: 2,
                                            width: "100%"
                                        }}
                                    >
                                        <FormControl fullWidth>
                                            <Field
                                                label="Nhập ghi chú"
                                                type="text"
                                                id="note"
                                                name="note"
                                                as={TextField}
                                            />
                                        </FormControl>
                                        
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 2,
                                            justifyContent: "flex-end",
                                            mt: 2
                                        }}
                                    >
                                        <Button variant="outlined" onClick={handleClose}>Huỷ</Button>
                                        <Button type="submit" variant="contained" disabled={isSubmitting}>
                                            {isSubmitting ? <CircularProgress size={24} /> : 'Lưu'}
                                        </Button>
                                    </Box>
                                </Form>
                            )}
                        </Formik>

                    </Box>
                </Box>


            </Box>
        </Modal>
    );
}

export default ModalBillCreate;