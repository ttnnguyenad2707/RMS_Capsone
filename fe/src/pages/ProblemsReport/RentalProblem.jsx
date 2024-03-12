import { Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import Cookies from "js-cookie";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { updateUser } from "../../services/auth";
import { login } from "../../reduxToolkit/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container";

const RentalProblem = () => {
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector((state) => state.user.data); //state là rootReducer trong store ,counter cái tên đăng kí trong rootReducer
  const [isEditMode, setIsEditMode] = useState(false);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(" name can not be blank").required("Required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "The phone number must have exactly 10 digits")
      .nullable(),
    // Các quy tắc cho các trường dữ liệu khác
  });
  // if (userData) {
  //   var userID = userData._id;
  // }
  // console.log("userData1", userData.avatar);
  const initialValues = {
    name: userData.name || "",
    phone: userData.phone || "",
    // email: userData.email || "",
    // avatar: null,
  };
  const accessToken = Cookies.get("accessToken");
  const dispatch = useDispatch();
  const handleSubmitForm = async (values) => {
    try {
      const res = await updateUser(accessToken, values);
      const data = res?.data?.data;
      console.log("data", data);
      // setUser(data);
      dispatch(login(data));
      setIsEditMode(false);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
    console.log("values", values);
  };

  useEffect(() => {
    if (userData) {
      setIsLoading(false);
      // console.log("chya vao effect");
    }
  }, [userData]);
  return (
    <div>
      RentalProblem
      <Container
        maxWidth="false"
        sx={{ backgroundColor: "#F1F2F7", padding: "20px", width: "100%" }}
      >
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            elevation={3}
            sx={{
              p: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="   problem ">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmitForm}
                >
                  {({ values, setFieldValue }) => (
                    <Form>
                      <div></div>
                      <div className=" form-group row mb-3 mt-3">
                        <label className="col-md-2" htmlFor="name">
                          Tên:
                        </label>
                        <div className="col-md-7">
                          <Field
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            disabled={!isEditMode}
                          />
                          <ErrorMessage name="name" component="div" />
                        </div>
                      </div>

                      <div className=" form-group row mb-3">
                        <label className="col-md-2" htmlFor="phone">
                          Số điện thoại:
                        </label>
                        <div className="col-md-7">
                          <Field
                            type="text"
                            id="phone"
                            name="phone"
                            className="form-control"
                            disabled={!isEditMode}
                          />
                          <ErrorMessage name="phone" component="div" />
                        </div>
                      </div>
                      <div className=" form-group row mb-3">
                        <label className="col-md-2" htmlFor="email">
                          Email:
                        </label>
                        <div className="col-md-7">
                          <Field
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={userData.email}
                            disabled={true}
                          />
                          <ErrorMessage name="email" component="div" />
                        </div>
                      </div>

                      <div className="profile-action">
                        {isEditMode ? (
                          <>
                            <div className="row">
                              <div className="col-6 text-right">
                                <button
                                  type="submit"
                                  className="btn btn-bg-primary  btn-radius"
                                >
                                  Save
                                </button>
                              </div>
                              <div className="col-6 text-right">
                                <button
                                  type="button"
                                  className="btn btn-bg-primary  btn-radius"
                                  onClick={() => setIsEditMode(false)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="btn btn-bg-primary  "
                              onClick={() => setIsEditMode(true)}
                            >
                              Edit
                            </button>
                          </>
                        )}
                      </div>
                    </Form>
                  )}
                </Formik>
            </div>
          </Paper>
        </Grid>
      </Container>
    </div>
  );
};

export default RentalProblem;
