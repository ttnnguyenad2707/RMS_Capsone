import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
    TextField,
    Select,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
    FormHelperText,
} from "@mui/material";
import { fetchDefaultPrice } from "../../../reduxToolkit/DefaultPrice";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { updateHouse } from "../../../reduxToolkit/HouseSlice";
import { AddPriceItem } from "../../../services/houses";
import Notification from "../../../CommonComponents/Notification";

const stylesHeader = {
    color: "#5A67BA",
    display: "flex",
    position: "relative",
    fontWeight: "Bold",
};
const stylesBody = {
    width: "100%",
    marginTop: "20px",
    overflow: "auto",
};
const styleAddUnit = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    height: "30%",
    bgcolor: "background.paper",
    border: "2px solid #grey",
    boxShadow: 25,
    p: 5,
    borderRadius: "10px",
    padding: "18px",
    overflow: "auto",
};

const AddSettingPrice = ({ houseId, setSettingPrices }) => {
    // console.log(settingPrices);
    const [open, setOpen] = useState(false);
    const [defaultPrices, setDefaultPrices] = useState()
    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const initialValues = {
        priceName: "",
        unit: "",
        unitPrice: ""

    }
    const validationSchema = Yup.object().shape({
        unitPrice: Yup.number().typeError("Vui lòng nhập một số").positive("Giá tiền phải lớn hơn 0").required("Giá tiền không được để trống")
    });
    useEffect(() => {
        async function fetchDefault() {
            const response = await dispatch(fetchDefaultPrice());
            setDefaultPrices(response?.payload);
        }
        fetchDefault()
    }, [houseId])
    const handleAddPrice = async (values) => {
        await AddPriceItem(houseId,{
            base: values.priceName,
            price: values.unitPrice
        }).then(data => {
            setSettingPrices(prev => [...prev,data.data.data])
            Notification("Success","Thêm Thành công","")
            handleClose()
        }).catch(error => {
            Notification("Error",error.response.data.error)
        })

    }
    return (
        <>
            <Button
                variant="contained"
                color="primary"
                className="mt-3"
                onClick={() => handleOpen()}
            >
                Thêm Kính Phí
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleAddUnit}>
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
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleAddPrice}
                        >
                            {({ setFieldValue, values }) => (

                                <Form>
                                    <Box sx={{
                                        display: "flex",
                                        gap: 3
                                    }}>
                                        <FormControl fullWidth >
                                            <InputLabel htmlFor="priceName">Loại phí</InputLabel>
                                            <Field as={Select} id="priceName" name="priceName"  >
                                                {defaultPrices?.map((defaultPrice, index) => (
                                                    <MenuItem key={index} value={defaultPrice?._id} onClick={() => setFieldValue("unit", defaultPrice?.unit)}>{defaultPrice?.name}</MenuItem>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="priceName" component={FormHelperText} />
                                        </FormControl>

                                        <FormControl fullWidth>
                                            <Field
                                                label="Đơn vị"
                                                as={TextField}
                                                type="text"
                                                id="unit"
                                                name="unit"
                                                disabled
                                            />
                                            <ErrorMessage name="unit" component={FormHelperText} />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <Field
                                                label="Đơn giá"
                                                as={TextField}
                                                type="number"
                                                id="unitPrice"
                                                name="unitPrice"
                                            />
                                            <ErrorMessage name="unitPrice" component={FormHelperText} />
                                        </FormControl>
                                    </Box>
                                    <Box className="d-flex">
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            className="mt-3"

                                        >
                                            Thêm Kính Phí
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            className="mt-3 ms-3"
                                            onClick={handleClose}
                                        >
                                            Hủy
                                        </Button>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </Box>

                </Box>
            </Modal></>
    );
}

export default AddSettingPrice;