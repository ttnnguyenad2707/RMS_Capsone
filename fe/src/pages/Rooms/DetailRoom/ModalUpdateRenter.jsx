import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, FormHelperText } from "@mui/material";
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import Notification from '../../../CommonComponents/Notification';
import { getMember, updateInfoMember } from '../../../services/houses';
import * as Yup from "yup";


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
const ModalUpdateRenter = ({ handleClose, open, room, setMembers, memberId }) => {
    const [file, setFile] = useState();
    const [imagePreview, setImagePreview] = useState(null);
    const [initialValues, setInitialValues] = useState()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchMember() {
            setImagePreview(null);
            setInitialValues(null);
            setIsLoading(true);
            await getMember(memberId, room._id).then(data => {
                setInitialValues({
                    name: data.data.data.name,
                    phone: data.data.data.phone,
                    cccd: data.data.data.cccd,
                    gender: data.data.data.gender,
                    dob: data.data.data.dob,
                    note: data.data.data.note,
                });
                if(data.data.data.avatar.imageData){
                    setImagePreview(data.data.data.avatar.imageData)
                }
                else{
                    setImagePreview(null)
                }
                setIsLoading(false);
            });
        }
        fetchMember();
    }, [memberId])
    const handleChangeFile = (e) => {
        const file = e.currentTarget.files[0]
        setFile(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    }
    
   
    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        try {
            const formData = new FormData();
            if (file){
                formData.append("avatar", file)
            }
            formData.set("memberId",memberId)
            formData.set("name", values.name)
            formData.set("phone", values.phone)
            formData.set("cccd", values.cccd)
            formData.set("gender", values.gender)
            formData.set("dob", values.dob)
            formData.set("note", values.note)
            await updateInfoMember(room._id, formData).then(data => {
                setMembers(prevMembers => {
                    const updatedMembers = prevMembers.map(member => {
                        if (member._id === memberId) {
                            return data.data.data;
                        }
                        return member;
                    });
                    return updatedMembers;
                });
            })

            handleClose()
            resetForm();
            Notification("Success", "Sửa thông tin", "Thành Công");
        } catch (error) {
            alert('Failed to add member');
        } finally {
            setSubmitting(false)
        }

    }
    const validationSchema = Yup.object({
        name: Yup.string().required("Vui lòng nhập họ và tên"),
        phone: Yup.string()
          .test('is-numeric', 'Số điện thoại chỉ được chứa chữ số', value => {
            return /^\d+$/.test(value);
          })
          .test('is-ten-digits', 'Số điện thoại phải có 10 chữ số', value => {
            if (!value) return true;
            return value.length === 10;
          }),
        cccd: Yup.string().matches(/^[0-9]{12}$/, "CCCD phải có 12 chữ số"),
        gender: Yup.string(),
        dob: Yup.date(),
      });
    if (isLoading) return null;
    return (
            <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Box sx={style}>
                        <Box>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={(values, { resetForm, setSubmitting }) => handleSubmit(values, { resetForm, setSubmitting })}
                                validationSchema={validationSchema}
                            >
                                <Form>
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
                                            <img src={imagePreview === null ? "https://quanlynhatro.com/frontend3/assets/img/placeholder.png" : imagePreview} alt='preview' height="300px" width="100%" />
                                            <Button variant='contained' color='success'><label htmlFor='avatar' style={{ width: "100%" }}>Chọn ảnh</label></Button>

                                            <Field
                                                type="file"
                                                id="avatar"
                                                name="avatar"
                                                hidden
                                                onChange={handleChangeFile}
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

                                            }}>Cập nhật thông tin khách hàng</Typography>
                                            <FormControl fullWidth>
                                                <Field
                                                    label="Họ và tên"
                                                    as={TextField}
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                />
                                                <ErrorMessage name="name" component={FormHelperText} />
                                            </FormControl>

                                            <FormControl fullWidth>
                                                <Field
                                                    label="Số điện thoại"
                                                    as={TextField}
                                                    type="text"
                                                    id="phone"
                                                    name="phone"
                                                />
                                                <ErrorMessage name="phone" component={FormHelperText} />
                                            </FormControl>


                                            <FormControl fullWidth>

                                                <Field
                                                    label="Căn cước công dân"
                                                    as={TextField}
                                                    type="text"
                                                    id="cccd"
                                                    name="cccd"
                                                />
                                                <ErrorMessage name="cccd" component={FormHelperText} />
                                            </FormControl>

                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="gender">Giới tính:</InputLabel>
                                                <Field
                                                    as={Select}
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
                                                    as={TextField}
                                                    type="date"
                                                    id="dob"
                                                    name="dob"
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
                                        <Button variant="outlined" color="error" onClick={handleClose}>Huỷ</Button>
                                        <Button type="submit" variant="contained" color="primary">Sửa</Button>
                                    </Box>
                                </Form>
                            </Formik>
                        </Box>
                    </Box>
                </Modal>

    );
}

export default ModalUpdateRenter;