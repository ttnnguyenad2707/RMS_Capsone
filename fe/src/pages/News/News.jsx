import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ModalNews from "./Components/Modal";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews, deleteNews } from "../../reduxToolkit/NewsSlice";
import { fetchHouses } from "../../reduxToolkit/HouseSlice";
import Notification from "../../CommonComponents/Notification";
import { IconButton, Menu } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  AiOutlinePlus,
  AiFillDelete,
  AiFillEdit,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

export default function News() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [id, setID] = React.useState();
  const [typeModal, setTypeModal] = React.useState();
  const [isLoading, setIsLoading] = useState(false);
  const [dataNews, setDataNews] = useState();
  const news = useSelector((state) => state.new.news);
  const houses = useSelector((state) => state.house.houses);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchHouses());
  }, []);
  React.useEffect(() => {
    dispatch(fetchNews({ id }));
  }, [id]);
  React.useEffect(() => {
    if (houses && houses.length > 0) {
      setID(houses[0]._id);
    }
  }, [houses]);
  const handleChange = (event) => {
    const inputSelect = event.target.value;
    if (inputSelect !== null) {
      setID(inputSelect);
    }
  };
  const commentNews = (data) => {
    if (data) {
      setDataNews(data);
      setTypeModal("Comment");
      handleOpen();
    }
  };

  const updateNews = (data) => {
    if (data) {
      setDataNews(data);
      setTypeModal("Update");
      handleOpen();
    }
  };

  const handleDeleteNews = async (idNews) => {
    Notification("Confirm", "Xác Nhận", "Xóa Tin Tức Này").then(
      async (result) => {
        if (result) {
          const response = await dispatch(deleteNews({ idNews }));
          if (response.payload === "Success") {
            Notification("Success", "Đã Xóa", "Tin Tức Thành Công");
            dispatch(fetchNews({ id }));
          } else {
            Notification("Error", "Xảy Ra Lỗi", "Khi Xóa Tin Tức");
          }
        } else {
          console.log("Người dùng đã chọn Cancel");
          // Xử lý khi người dùng chọn Cancel
        }
      }
    );
  };
  const handleAdd = (typeModal) => {
    setTypeModal(typeModal);
    setDataNews([]);
    handleOpen();
  };
  console.log(news, "news");

  // Khai báo state
  const [anchorEl, setAnchorEl] = useState(null);

  // Xử lý sự kiện mở menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Xử lý sự kiện đóng menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <AiOutlineLoading3Quarters className="loading-icon" />
          <p>Loading...</p>
        </div>
      ) : (
        <Box
          sx={{
            backgroundColor: "#F1F2F7",
            height: "100%",
            width: "100vw",
          }}
        >
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={id}
            onChange={handleChange}
            sx={{ width: "20%" }}
            className="me-5"
          >
            {houses ? (
              houses.map((h, index) => (
                <MenuItem value={h._id} key={index}>
                  {h.name}
                </MenuItem>
              ))
            ) : (
              <div>Lỗi Dữ Liệu</div>
            )}
          </Select>
          <Grid
            item
            xs={12}
            md={7}
            lg={8}
            sx={{
              backgroundColor: "#F1F2F7",
              margin: "auto",
              mt: 3,
            }}
          >
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: "auto",
                borderRadius: "18px ",
              }}
            >
              <Box className="d-flex">
                {/* <b>m_ducs</b> */}
                <Button
                  className="ms-3"
                  sx={{
                    backgroundColor: "#f2f2f2",
                    width: "95%",
                    border: "soild 1px #f2f2f2",
                    borderRadius: "18px",
                    padding: "10px",
                    justifyContent: "start",
                  }}
                  onClick={() => handleAdd("Add")}
                >
                  Bạn đang nghĩ gì thế ?
                </Button>
              </Box>
              <hr></hr>
              <Box className="d-flex" sx={{ borderTop: "soid 1px #cccccc" }}>
                <Button>Phát Trực Tiếp</Button>
                <Button>Phát Trực Tiếp</Button>
                <Button>Phát Trực Tiếp</Button>
              </Box>
            </Paper>
          </Grid>
          {news.data ? (
            news.data.map((n,index) => (
              <Grid
                item
                xs={12}
                md={7}
                lg={8}
                sx={{
                  backgroundColor: "#F1F2F7",
                  margin: "auto",
                  mt: 3,
                }}
                key={index}
              >
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "auto",
                    borderRadius: "18px ",
                  }}
                >
                  {/* <Chart /> */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p style={{ marginRight: "10px" }}>
                      <b>{n.authorId.name}</b>
                    </p>
                    <p>{n.createdAt}</p>
                    <div style={{ marginLeft: "auto", marginTop: "-5px" }}>
                      <IconButton
                        aria-controls="menu"
                        aria-haspopup="true"
                        onClick={handleMenuOpen}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                      <Menu
                        id="menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={() => updateNews(n)}>
                          Cập Nhật
                        </MenuItem>
                        <MenuItem onClick={() => handleDeleteNews(n._id)}>
                          Xóa
                        </MenuItem>
                      </Menu>
                    </div>
                  </div>
                  <p>{n.content}</p>
                  <Box
                    sx={{ width: "100%" }}
                    className="d-flex justify-content-center mb-4 mt-4"
                  >
                    {n.images.length > 0 ? (
                      <img
                        src={n.images[0]}
                        alt="Image"
                        style={{ width: "45%" }}
                      />
                    ) : null}
                  </Box>
                  <div>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Button variant="outlined">
                        <ThumbUpAltIcon fontSize="small"></ThumbUpAltIcon>Thích
                      </Button>
                      <Button variant="outlined" onClick={() => commentNews(n)}>
                        <ChatBubbleOutlineIcon fontSize="small"></ChatBubbleOutlineIcon>{" "}
                        Bình Luận
                      </Button>
                    </Box>
                  </div>
                </Paper>
              </Grid>
            ))
          ) : (
            <p className="h3">Không có tin tức </p>
          )}

          <ModalNews
            open={open}
            handleClose={handleClose}
            houseID={id}
            typeModal={typeModal}
            dataNews={dataNews}
          />
        </Box>
      )}
    </>
  );
}
