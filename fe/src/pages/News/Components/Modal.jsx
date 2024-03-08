import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { fetchNews, addNews } from "../../../reduxToolkit/NewsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCommentNews,
  addCommentNews,
} from "../../../reduxToolkit/CommentSlice";
import "../scss/modal.scss";
const ModalNews = ({ handleClose, open, typeModal, houseID, dataNews }) => {
  const comments = useSelector((state) => state.comment.comments);
  const dispatch = useDispatch();
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
  const inputContent = React.useRef();
  const handleInputName = () => {
    const inputValue = inputContent.current.value;
    if (inputValue !== "" && typeof inputValue !== "undefined") {
      const data = {
        houseId: houseID,
        title: "news",
        content: inputValue,
      };
      dispatch(addNews({ data }));
      const id = houseID;
      dispatch(fetchNews({ id }));
      inputContent.current.value = "";
      handleClose();
    }
  };
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
  }
};

export default ModalNews;
