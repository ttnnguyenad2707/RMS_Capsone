import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, FormHelperText } from "@mui/material";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    width: "60vw"
};
const ModalAddRenter = ({ handleClose, open }) => {

    return (<Modal
        open={open}
        onClose={handleClose}

    >
        <Box sx={style}>
            <Box>

                <Formik
                    initialValues={{
                        name: "",
                        phone: "",
                        cccd: "",
                        gender: "",
                        dob: "",
                        note: "",
                        avatar: ""
                    }}
                >
                    <Form

                    >
                        <Box sx={{
                            display: 'flex',
                            gap: 2
                        }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    width: "40%"
                                }}
                            >
                                <Typography>Ảnh đại diện khách hàng</Typography>
                                <img src='https://quanlynhatro.com/frontend3/assets/img/placeholder.png' alt='preview' height="300px" width="100%" />
                                <Button variant='contained' color='success'><label htmlFor='avatar' style={{ width: "100%" }}>Chọn ảnh</label></Button>

                                <Field
                                    type="file"
                                    id="avatar"
                                    name="avatar"
                                    hidden
                                />
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    width: "60%"
                                }}
                            >
                                <Typography sx={{
                                    fontWeight: "600",
                                    fontSize: "18px",
                                    textAlign: "center",
                                    
                                }}>Thông tin khách hàng</Typography>
                                <FormControl fullWidth>
                                    <Field
                                        label="Họ và tên"
                                        component={TextField}
                                        type="text"
                                        id="name"
                                        name="name"
                                    />
                                    <ErrorMessage name="name" component={FormHelperText} />
                                </FormControl>

                                <FormControl fullWidth>
                                    <Field
                                        label="Số điện thoại"
                                        component={TextField}
                                        type="text"
                                        id="name"
                                        name="name"
                                    />
                                    <ErrorMessage name="name" component={FormHelperText} />
                                </FormControl>


                                <FormControl fullWidth>

                                    <Field
                                        label="Căn cước công dân"
                                        component={TextField}
                                        type="text"
                                        id="cccd"
                                        name="cccd"
                                    />
                                    <ErrorMessage name="cccd" component={FormHelperText} />
                                </FormControl>

                                <FormControl fullWidth>
                                    <InputLabel htmlFor="gender">Giới tính:</InputLabel>
                                    <Field
                                        component={Select}
                                        id="gender"
                                        name="gender"
                                    >
                                        <MenuItem value="male">Nam</MenuItem>
                                        <MenuItem value="female">Nữ</MenuItem>
                                    </Field>
                                    <ErrorMessage name="gender" component={FormHelperText} />
                                </FormControl>

                                <FormControl fullWidth>

                                    <Field
                                        label="Ngày sinh"
                                        component={TextField}
                                        type="date"
                                        id="dob"
                                        name="dob"
                                        defaultValue="2000-01-01"
                                    />
                                    <ErrorMessage name="dob" component={FormHelperText} />
                                </FormControl>

                                <FormControl fullWidth>

                                    <Field
                                        label="Ghi Chú"
                                        as={TextField}
                                        multiline
                                        id="note"
                                        name="note"
                                    />
                                    <ErrorMessage name="note" component={FormHelperText} />
                                </FormControl>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                                mt: 4,
                                gap: 4
                            }}
                        >
                            <Button type="submit" variant="outlined" color="error" onClick={handleClose}>Huỷ</Button>
                            <Button type="submit" variant="contained" color="primary">Submit</Button>
                        </Box>
                    </Form>
                </Formik>
            </Box>
        </Box>
    </Modal>);
}

export default ModalAddRenter;