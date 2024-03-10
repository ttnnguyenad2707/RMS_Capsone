import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  fetchNews,
  addNews,
  updateNews,
} from "../../../reduxToolkit/NewsSlice";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import {
  fetchCommentNews,
  addCommentNews,
} from "../../../reduxToolkit/CommentSlice";
import Notification from "../../../CommonComponents/Notification";
import "../scss/modal.scss";
const ModalNews = ({ handleClose, open, typeModal, houseID, dataNews }) => {
  const comments = useSelector((state) => state.comment.comments);
  const [image_src, setImageSrc] = React.useState([]);
  const [selectedImages, setSelectedImages] = React.useState([]);
  const present_key = "demo_api_image";
  const cloud_name = "debiqwc2z";
  const folder_name = "rms";
  const dispatch = useDispatch();
  const fileRef = React.useRef();
  const inputContent = React.useRef();
  const handleImageUpload = async (event) => {
    const files = event.target.files;
    const selectedImagesArray = Array.from(files);
    setSelectedImages(selectedImagesArray);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(selectedImages);
    selectedImages.forEach((image) => {
      formData.append("file", image);
      formData.append("upload_preset", present_key);
      formData.append("folder", folder_name);
      formData.append("public_id", uuidv4());
      callToClould(formData);
    });
  };
  // Call to clound to update
  const callToClould = async (formData) => {
    try {
      const res_data = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );
      console.log(res_data.data.url);
      const data = {
        url: res_data.data.url,
        caption: "anh1",
        path: res_data.data.url,
      };
      const updatedData = [...image_src];
      updatedData.push(data.url);
      // Cập nhật giá trị mới cho state image_src
      setImageSrc(updatedData);
    } catch (error) {
      console.log(error);
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    height: "80%",
    bgcolor: "background.paper",
    border: "2px solid #grey",
    boxShadow: 25,
    p: 5,
    borderRadius: "10px",
    padding: "18px",
    overflow: "auto",
  };
  const stylesHeader = {
    display: "flex",
    position: "relative",
    fontWeight: "Bold",
    justifyContent: "center",
    color: "#1976d2",
  };
  const settings = {
    centerMode: true,
    infinite: true,
    slidesToShow: 2,
    speed: 500,
  };
  React.useEffect(() => {
    if (dataNews) {
      const idNews = dataNews._id;
      dispatch(fetchCommentNews({ idNews }));
    }
  }, [dataNews]);
  // Get data to update news
  React.useEffect(() => {
    if (typeModal === "Update" && dataNews) {
      if (inputContent.current && dataNews.content) {
        const initialContent = dataNews.content;
        inputContent.current.value = initialContent;
      }
      setImageSrc(dataNews.images);
    }
  }, [dataNews, typeModal, inputContent.current]);
  // add news
  const handleInputName = async () => {
    const inputValue = inputContent.current.value;
    if (inputValue !== "" && typeof inputValue !== "undefined") {
      const data = {
        houseId: houseID,
        title: "news",
        content: inputValue,
        images: image_src,
      };
      const response = await dispatch(addNews({ data }));
      console.log(response, "há");
      if (response.payload === "Created") {
        const id = houseID;
        dispatch(fetchNews({ id }));
        Notification("Success", "Thêm Tin Tức", "Thành Công");
        inputContent.current.value = "";
        setImageSrc([]);
        handleClose();
      } else {
        Notification("Error", "Thêm Tin Tức", "Không Thành Công");
      }
    }
  };
  // add comments
  const handleInputComment = () => {
    const inputValue = inputContent.current.value;
    console.log(inputValue, "inputValue");
    if (inputValue !== "" && typeof inputValue !== "undefined") {
      const comment = {
        content: inputValue,
      };
      const idNews = dataNews._id;
      dispatch(addCommentNews({ idNews, comment }));
      dispatch(fetchCommentNews({ idNews }));
      inputContent.current.value = "";
    }
  };
  // update news to service
  const handleUpdateNews = async () => {
    const inputValue = inputContent.current.value;
    if (inputValue !== "" && typeof inputValue !== "undefined") {
      const idNews = dataNews._id;
      const data = {
        content: inputValue,
        images: image_src,
      };
      const response = await dispatch(updateNews({ data, idNews }));
      if (response.payload === "Success") {
        const id = houseID;
        dispatch(fetchNews({ id }));
        Notification("Success", "Cập Nhật Tin Tức", "Thành Công");
        inputContent.current.value = "";
        setImageSrc([]);
        handleClose();
      } else {
        Notification("Error", "Cập Nhật Tin Tức", "Không Thành Công");
      }
    }
  };
  if (typeModal === "Add") {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ width: 400 }} sx={style}>
          <Box sx={stylesHeader}>
            <p className="h3">Tạo Bài Viết</p>
          </Box>
          <hr />
          <Box>
            <p>MR.Duc</p>
            <textarea
              name=""
              id=""
              placeholder="Đức Ơi Bạn Đang Nghĩ Gì Thế"
              className="areastyle"
              ref={inputContent}
            ></textarea>
            <div className="d-flex flex-column gap-2">
              <label htmlFor="thumbnail">Thumbnail</label>
              <Box className="d-flex gap-3">
                {image_src.length > 0
                  ? image_src.map((image, index) => (
                      <img
                        src={image}
                        key={index}
                        alt="Cloudinary Image"
                        style={{ width: "10%" }}
                      />
                    ))
                  : null}
              </Box>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                id="thumbnail"
                onChange={handleImageUpload}
                ref={fileRef}
              />
              <button className="btn btn-primary" onClick={handleUpload}>
                Upload
              </button>
            </div>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleInputName()}
            >
              Đăng tin
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  } else if (typeModal === "Comment" && dataNews) {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ width: 400 }} sx={style}>
          <Box sx={stylesHeader}>
            <p className="h3">Bài Viết</p>
          </Box>
          <hr />
          <Box className="d-flex flex-column">
            <p>Tác Giả: MR.Duc</p>
            <p>{dataNews.content}</p>
          </Box>
          <Box>
            {dataNews.images.length >= 0 ? (
              dataNews.images.length >= 3 ? null : ( // </Slider> //   ))} //     <img src={image} alt="Ảnh miêu tả" key={index} /> //   {dataNews.images.map((image, index) => ( // <Slider {...settings}>
                <Box className="d-flex">
                  {dataNews.images.map((image, index) => (
                    <img
                      src={image}
                      alt="Ảnh miêu tả"
                      key={index}
                      style={{ width: "50%" }}
                    />
                  ))}
                </Box>
              )
            ) : null}
          </Box>

          <hr />
          <p className="h6 fw-bold">Bình Luận</p>
          <Box className="d-flex flex-column">
            {comments.data ? (
              comments.data.map((comment) => (
                <Box className="d-flex flex-row">
                  <p className="fw-bold me-3">{comment.creatorId}</p>
                  <p>{comment.content}</p>
                </Box>
              ))
            ) : (
              <p>Chưa có bình luận nào cả :(( </p>
            )}
          </Box>
          <Box className="d-flex flex-column">
            <TextField
              id="filled-basic"
              inputRef={inputContent}
              label="Bình Luận"
              variant="filled"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleInputComment()}
              className="mt-3"
            >
              Gửi Bình Luận
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  } else if (typeModal === "Update" && dataNews) {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ width: 400 }} sx={style}>
          <Box sx={stylesHeader}>
            <p className="h3">Cập Nhật Bài Viết</p>
          </Box>
          <hr />
          <Box>
            <p>MR.Duc</p>
            <Box className="position-relative">
              <textarea
                name=""
                id="inputArea"
                className="areastyle"
                ref={inputContent}
              ></textarea>
            </Box>
            <div className="d-flex flex-column gap-2">
              <label htmlFor="thumbnail">Thumbnail</label>
              <Box className="d-flex gap-3">
                {image_src.length > 0
                  ? image_src.map((image, index) => (
                      <img
                        src={image}
                        key={index}
                        alt="Cloudinary Image"
                        style={{ width: "10%" }}
                      />
                    ))
                  : null}
              </Box>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                id="thumbnail"
                onChange={handleImageUpload}
                ref={fileRef}
              />
              <button className="btn btn-primary" onClick={handleUpload}>
                Upload
              </button>
            </div>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleUpdateNews()}
            >
              Cập Nhật Tin Tức
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  }
};

export default ModalNews;
