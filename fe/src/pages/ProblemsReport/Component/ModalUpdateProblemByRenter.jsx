import { Box, Button, MenuItem, Modal, Select } from "@mui/material";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateStatusProblemsInHouse } from "../../../services/problems";

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

const ModalUpdateProblem = ({problem, problemsId, Room, Status, onUpdateStatus }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleUpdate = async (values) => {
    try {
      console.log("values",values);
      console.log("problemsId",problemsId);
      // alert("ád")
      const res = await updateStatusProblemsInHouse(problemsId, values);
      console.log("res2", res);
      toast.success("Trạng thái đã được cập nhật!");
      onUpdateStatus(res.data.data);
      handleClose();
    } catch (error) {
      toast.warning(error.response.data.error);
      console.log(error);
    }
  };

  const initialValues = {
    title: problem.title,
    content: problem.content,
  
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Vui lòng nhập Tiêu Đề"),
    content: Yup.string().required("Vui lòng nhập Nội Dung"),
  });

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Cập nhật vấn đề
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleUpdate}
            validationSchema={validationSchema}
          >
            <Form>
              <div>
                <h5>Cập nhật vấn đề</h5>
              </div>
              <div>
                <label htmlFor="title">Tiêu Đề</label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className="form-control"
                />
                <ErrorMessage name="title" component="div" className="error" />
              </div>

              <div>
                <label htmlFor="content">Nội Dung</label>
                <Field
                  as="textarea"
                  id="content"
                  name="content"
                  rows="3"
                  className="form-control"
                />
                <ErrorMessage name="content" component="div" className="error" />
              </div>

              <button className="btn btn-primary mt-3" type="submit">
                Cập nhật
              </button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalUpdateProblem;