import React from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ToastContainer, toast } from "react-toastify";

// import { Formik, Field, Form } from "formik";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  FormHelperText,
  TextareaAutosize,
} from "@mui/material";
import * as Yup from "yup";
import { addProblemsInHouse } from "../../../services/problems";
import { useSelector } from "react-redux";
import { socket } from "../../../socket/socket";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "0.5px solid #000",
  boxShadow: 24,
  borderRadius: 8,
  p: 4,
};
const ModalAddProblem = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const validationSchema = Yup.object().shape({
    type: Yup.string().required("Vui lòng chọn vấn đề"),
    title: Yup.string().required("Vui lòng nhập tiêu đề"),
    content: Yup.string().required("Vui lòng nhập nội dung vấn đề"),
  });
  const userData = useSelector((state) => state.user.data); //state là rootReducer trong store ,counter cái tên đăng kí trong rootReducer
  const initialValues = {
    roomId : userData.roomId,
    type: "",
    title: "",
    content: "",
  };
  const handleSubmit =async (values) => {
    // Xử lý logic khi form được submit
    console.log(values);
    try {
    const res = await addProblemsInHouse(values).then((data) => {
      socket.emit("addNotification",{message: "add"});
    })
      toast.success("vấn đề đã được gửi đi !");
      setOpen(false)
        
    } catch (error) {
        toast.warning(error.response.data.error);
        
    }

  };
  return (
    <div>
      <Button onClick={handleOpen}>Add Problem</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Formik initialValues={initialValues}
              validationSchema={validationSchema}
          
          onSubmit={handleSubmit}>
            <Form>
                <div className="">
                    <h1>Vấn đề cần thông báo</h1>
                </div>

              <div>
                {/* <Field
                  label="Trạng thái"
                  className="form-control"
                  variant="outlined"
                  as="select"
                  id="status"
                  name="status"
                >
                  <option value="none">Trạng thái</option>
                  <option value="done">Đã giải quyết</option>
                  <option value="pending">Đang chờ giải quyết</option>
                  <option value="doing">Đang xử lý vấn đề</option>
                </Field> */}
                {/* <ErrorMessage name="type" component="div" className="error" /> */}
              </div>
              {/* enum: ["common","electric","water","other"], */}
              
              <div className="p-3 form-group">
                <Field
                  label="Lựa chọn vấn đề"
                  className="form-control"
                  variant="outlined"
                  as="select"
                  id="type"
                  name="type"
                >
                  <option value="none">Lựa chọn vấn đề </option>
                  <option value="common">Vấn đề cơ bản</option>
                  <option value="water">Vấn đề về nước</option>
                  <option value="electric">Vấn đề về điện </option>
                  <option value="other">Vấn đề khác</option>
                </Field>
                <ErrorMessage style={{color: 'red'}} name="type" component="div" className="error" />
              </div>

              <div className="p-3">
                <Field
                  label="Tiêu Đề"
                  className="form-control"
                  variant="outlined"
                  as={TextField}
                  type="text"
                  id="title"
                  name="title"
                />
                <ErrorMessage style={{color: 'red'}} name="title" component="div" className="error" />
              </div>

              <div className="p-3">
                <Field
                  className="form-control"
                  variant="outlined"
                  as={TextareaAutosize}
                  
                  placeholder="Nội Dung vấn đề"
                  id="content"
                  name="content"
                />
                <ErrorMessage
                  name="content"
                  component="div"
                  className="error"
                  style={{color: 'red'}}
                />
              </div>
              <div className="">
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalAddProblem;
