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
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Notification from "../../../CommonComponents/Notification";
import {
  fetchCommentNews,
  addCommentNews,
} from "../../../reduxToolkit/CommentSlice";
import CancelIcon from "@mui/icons-material/Cancel";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import LinearProgress from "@mui/material/LinearProgress";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../scss/modal.scss";
const ModalNews = ({ handleClose, open, typeModal, houseID, dataNews }) => {
  const [image_src, setImageSrc] = React.useState([]);
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const present_key = "demo_api_image";
  const cloud_name = "debiqwc2z";
  const folder_name = "rms";
  const dispatch = useDispatch();
  const fileRef = React.useRef();
  const inputContent = React.useRef();
  const userData = useSelector((state) => state.user.data);
  const comments = useSelector((state) => state.comment.comments);
  const handleImageUpload = async (event) => {
    const files = event.target.files;
    const selectedImagesArray = Array.from(files);
    setSelectedImages(selectedImagesArray);
  };
  const handleUpload = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    console.log(selectedImages)
    // Kiểm tra điều kiện trước khi tải lên
    if (selectedImages.length === 0) {
      Notification("Error","Không có tệp tin được chọn.")
      setIsLoading(false)
      return;
    }
    const allowedExtensions = [".jpg", ".jpeg", ".png"];
    selectedImages.forEach((image) => {
      const fileExtension = image.name.slice(image.name.lastIndexOf(".")).toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        Notification("Error",`Tệp tin ${image.name} không hợp lệ. Chỉ chấp nhận các tệp tin .jpg hoặc .png.`)
        setIsLoading(false)
        return;
      }
      formData.append("file", image);
      formData.append("upload_preset", present_key);
      formData.append("folder", folder_name);
      formData.append("public_id", uuidv4());
      callToClould(formData);
      fileRef.current.value = '';
      setSelectedImages([])
    });
  };
  // Call to clound to update
  const callToClould = async (formData) => {
    try {
      const res_data = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );
      const data = {
        url: res_data.data.url,
        caption: "anh1",
        path: res_data.data.url,
      };
      const updatedData = [...image_src];
      updatedData.push(data.url);
      // Cập nhật giá trị mới cho state image_src
      setImageSrc(updatedData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
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
  React.useEffect(() => {
    if (dataNews) {
      const idNews = dataNews._id;
      dispatch(fetchCommentNews({ idNews }));
    }
  }, [dataNews]);
  // Get data to update news
  React.useEffect(() => {
    if (typeModal === "Update") {
      setImageSrc(dataNews.images);
    } else if (typeModal === "Add") {
      setImageSrc([]);
    }
  }, [dataNews]);
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
  // update image
  const handleDeleteImage = (imageDelete) => {
    const newlistImages = image_src.filter((image) => image !== imageDelete);
    setImageSrc(newlistImages);
  };
  // if (inputContent.current && dataNews.content) {
  //   const initialContent = dataNews.content;
  //   inputContent.current.value = initialContent;
  // }
  if (typeModal === "Add") {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <Box sx={stylesHeader}>
            <p className="h3 fw-bold">Tạo Bài Viết</p>
          </Box>
          <hr />
          <Box sx={{ py: 2 }}>
            <p>
              <p>
                <AccountCircleIcon />
                {userData.accountType == "host" ? (
                  <b className="fs-5">{userData.name}</b>
                ) : (
                  <b className="fs-5">{userData.username}</b>
                )}
              </p>
            </p>
            <textarea
              name=""
              id=""
              rows={3} // Số dòng hiển thị ban đầu (có thể điều chỉnh)
              placeholder="Có tin gì mới thế?"
              className="areastyle"
              ref={inputContent}
              style={{ width: "100%" }}
            ></textarea>
          </Box>
          <Box
            sx={{
              py: 2,
              border: "2px solid #ccc",
              borderRadius: "5px",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            <h5>Thêm ảnh vào bài viết của bạn</h5>
            <Box sx={{ width: "100%", height: 450, overflowY: "scroll" }}>
              {image_src.map.length > 0 ? (
                <ImageList variant="masonry" cols={3} gap={8}>
                  {image_src.map((image, index) => (
                    <ImageListItem key={index} className="position-relative">
                      <img
                        src={`${image}?w=248&fit=crop&auto=format`}
                        alt={"Hình Ảnh"}
                        loading="lazy"
                      />
                      <Button
                        className="position-absolute top-0 end-0"
                        onClick={() => handleDeleteImage(image)}
                      >
                        <CancelIcon />
                      </Button>
                    </ImageListItem>
                  ))}
                </ImageList>
              ) : null}
            </Box>
            {isLoading ? (
              <div className="text-center">
                <LinearProgress />
                <p>Loading...</p>
              </div>
            ) : null}
            <div className="d-flex gap-3">
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
          <Box sx={{ py: 2 }}>
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
        <Box sx={style}>
          <Box sx={stylesHeader}>
            <p className="h3 fw-bold">Bài Viết</p>
          </Box>
          <hr />
          <Box className="d-flex flex-column">
            <p>
              <AccountCircleIcon />
              {dataNews.authorId.name === null ? (
                <b className="fs-5">{dataNews.authorId.username}</b>
              ) : (
                <b className="fs-5">{dataNews.authorId.name}</b>
              )}
            </p>
            <p className="fs-4">{dataNews.content}</p>
          </Box>
          <Box>
            {dataNews.images.length >= 0 ? (
              dataNews.images.length >= 3 ? (
                <Box sx={{ width: "100%", height: 450, overflowY: "scroll" }}>
                  <ImageList variant="masonry" cols={3} gap={8}>
                    {dataNews.images.map((item) => (
                      <ImageListItem key={item.img}>
                        <img
                          src={`${item}?w=248&fit=crop&auto=format`}
                          alt={"Hình Ảnh"}
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Box>
              ) : (
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
              comments.data.map((comment, index) => (
                <Box className="d-flex flex-row" key={index}>
                  {comment.creatorId.name === null ? (
                    <p className="fw-bold me-3">{comment.creatorId.username}</p>
                  ) : (
                    <p className="fw-bold me-3">{comment.creatorId.name}</p>
                  )}
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
        <Box sx={style}>
          <Box sx={stylesHeader}>
            <p className="h3">Cập Nhật Bài Viết</p>
            {/* <IconButton
              sx={{ position: "absolute", right: "10px" }}
              onClick={() => {
                inputContent.current.value = "";
                setImageSrc([]);
                handleClose();
              }}
            >
              <CloseIcon />
            </IconButton> */}
          </Box>
          <hr />
          <Box>
            <p>
              <AccountCircleIcon />
              {dataNews.authorId.name === null ? (
                <b className="fs-5">{dataNews.authorId.username}</b>
              ) : (
                <b className="fs-5">{dataNews.authorId.name}</b>
              )}
            </p>
            <Box className="position-relative">
              <textarea
                name=""
                id="inputArea"
                className="areastyle fs-5"
                ref={inputContent}
              >
                {dataNews.content}
              </textarea>
            </Box>
            <div className="d-flex flex-column gap-2">
              <h5>Thêm ảnh vào bài viết của bạn</h5>
              <Box sx={{ width: "100%", height: 450, overflowY: "scroll" }}>
                {image_src.map.length > 0 ? (
                  <ImageList variant="masonry" cols={3} gap={8}>
                    {image_src.map((image, index) => (
                      <ImageListItem key={index} className="position-relative">
                        <img
                          src={`${image}?w=248&fit=crop&auto=format`}
                          alt={"Hình Ảnh"}
                          loading="lazy"
                        />
                        <Button
                          className="position-absolute top-0 end-0"
                          onClick={() => handleDeleteImage(image)}
                        >
                          <CancelIcon />
                        </Button>
                      </ImageListItem>
                    ))}
                  </ImageList>
                ) : null}
              </Box>
              {isLoading ? (
                <div className="text-center">
                  <LinearProgress />
                  <p>Loading...</p>
                </div>
              ) : null}
              <div className="d-flex gap-3">
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
            </div>
          </Box>
          <Box sx={{ py: 2 }}>
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
