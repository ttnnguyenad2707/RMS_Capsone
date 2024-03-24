import { Box, Button, MenuItem, Modal, Select } from "@mui/material";
import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import {
  getDetailProblem,
  getProblemsInHouse,
  updateStatusProblemsInHouse,
} from "../../../services/problems";
import { toast } from "react-toastify";
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
const ModalUpdateProblem = ({ problemsId, Room, Status, onUpdateStatus }) => {
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = React.useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleUpdate = async (values) => {
    try {
      const res = await updateStatusProblemsInHouse(problemsId, values);
      // console.log("res", res);
      toast.success("trạng thái đã được cập nhât !");
      onUpdateStatus(res.data.data);
      setUpdate(res.data.data.status)
      // console.log("update",update);
      handleClose();
      // console.log("res.data.data.id",res.data.data._id);
    } catch (error) {
      toast.warning(error.response.data.error);
      console.log(error);
    }
  };

  const getProblemDetail = async () => { // giúp cập nhật trạng thái trên thanh select
    try {
      const res = await getDetailProblem(problemsId);
      setUpdate(res.data.data.status);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getProblemDetail();
  }, [problemsId,update]);

  const initialValues = {
    status: update,
  };
  const validationSchema = Yup.object().shape({
    status: Yup.string().notOneOf(["none"], "Vui lòng chọn trạng thái"),
  });
  return (
    <div>
      <Button variant="outlined" onClick={() => handleOpen()}>
        Update
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleUpdate}
            validationSchema={validationSchema}
          >
            <Form>
              <div className="">
                <h5>Cập nhật vấn đề cho phòng {Room} </h5>
              </div>
              <div>
                <Field
                  as={Select}
                  id="status"
                  variant="outlined"
                  className="form-control"
                  name="status"
                >
                  <MenuItem value={"none"}>Chưa tiếp nhận</MenuItem>

                  <MenuItem value={"done"}>Đã giải quyết</MenuItem>
                  <MenuItem value={"pending"}>Đang chờ giải quyết</MenuItem>
                  <MenuItem value={"doing"}>Đang xử lý vấn đề</MenuItem>
                </Field>
                <ErrorMessage name="status" component="div" className="error" />
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
