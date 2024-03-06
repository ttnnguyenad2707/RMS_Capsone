import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import "../scss/modal.scss";
const ModalNews = ({ handleClose, open, typeModal }) => {
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
            <textarea name="" id="" placeholder="Đức Ơi Bạn Đang Nghĩ Gì Thế" className="areastyle"></textarea>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalNews;
