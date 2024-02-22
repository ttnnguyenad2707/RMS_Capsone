import { Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { updateUser } from "../../services/auth";

const Profile = () => {
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
      const data = res.data.data;
      console.log("data", data);
      // setUser(data);
    
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
  console.log("isEditMode", isEditMode);
  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <AiOutlineLoading3Quarters className="loading-icon" />
          <p>Loading...</p>
        </div>
      ) : (
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            elevation={3}
            sx={{
              p: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className=" component-profile ">
        
              <div className="">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmitForm}
                >
                  {({ values, setFieldValue }) => (
                    <Form>
                      <div>
                        {/* Trường tải ảnh lên */}
                      {/* <div>
                        <div className="form-group row mb-3">
                          <label className="col-md-2" htmlFor="avatar">
                            Avatar:
                          </label>
                          <div className="col-md-7">
                            <input
                              type="file"
                              id="avatar"
                              name="avatar"
                              onChange={(event) => {
                                setFieldValue(
                                  "avatar",
                                  // 
                                  base64Data
                                );
                              }}
                              disabled={!isEditMode}
                            />
                            <ErrorMessage name="avatar" component="div" />
                          </div>

                          {values.avatar && (
                        <div className="form-group row mb-3">
                          <label className="col-md-2" htmlFor="avatar">
                            Avatar Preview:
                          </label>
                          <div className="col-md-7">
                            <img
                              src={URL.createObjectURL(values.avatar)}
                              alt="Avatar Preview"
                              style={{ maxWidth: "100%" }}
                            />
                          </div>
                        </div>
                      )}
                        </div>
                      </div> */}
                      </div>
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
                            value = {userData.email}
                            disabled={true}
                          />
                          <ErrorMessage name="email" component="div" />
                        </div>
                      </div>

                      {/* <button type="submit">Lưu</button> */}
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
            </div>
          </Paper>
        </Grid>
      )}
    </>
  );
};

export default Profile;
