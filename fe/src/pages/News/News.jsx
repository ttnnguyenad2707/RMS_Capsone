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
import SelectHouse from "../../CommonComponents/SelectHouse";
import { getOneRoomRedux } from "../../reduxToolkit/RoomSlice";
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
  const [selectedHouseId, setSelectedHouseId] = useState();
  const [typeModal, setTypeModal] = React.useState();
  const [isLoading, setIsLoading] = useState(false);
  const [dataNews, setDataNews] = useState({});
  const news = useSelector((state) => state.new.news);
  const userData = useSelector((state) => state.user.data);
  const room = useSelector((state) => state.room.rooms);
  const GetRoomsRenter = async () => {
    try {
      const roomsId = userData.roomId;
      const response = await dispatch(getOneRoomRedux({ roomsId }));
      setSelectedHouseId(response.payload.houseId.id);
    } catch (error) {
      console.log(error.message);
    }
  };
  const dispatch = useDispatch();
  React.useEffect(() => {
    const id = selectedHouseId;
    dispatch(fetchNews({ id }));
  }, [selectedHouseId]);
  React.useEffect(() => {
    if (userData.accountType === "renter") {
      GetRoomsRenter();
    }
  }, [userData]);
  console.log(room, "room");
  const commentNews = (data) => {
    if (data) {
      setDataNews(data);
      setTypeModal("Comment");
      handleOpen();
    }
  };

  const updateNews = (data) => {
    console.log(typeof data, "data");
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
            const id = selectedHouseId;
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
    const empty = {};
    setDataNews(empty);
    setTypeModal(typeModal);
    handleOpen();
  };

  console.log(news, "news");
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
          {userData.accountType == "owner" ? (
            <SelectHouse onSelect={setSelectedHouseId} />
          ) : null}
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
                  Thêm Tin Tức Mới...
                </Button>
              </Box>
            </Paper>
          </Grid>
          {news.data ? (
            <Grid
              item
              xs={12}
              md={7}
              lg={8}
              sx={{
                backgroundColor: "#F1F2F7",
                margin: "auto",
              }}
              // key={index}
            >
              {news.data.map((newItem, index) => (
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "auto",
                    borderRadius: "18px ",
                    marginTop: "20px",
                  }}
                  key={index}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p style={{ marginRight: "10px" }}><b>{newItem?.authorId?.name?(newItem?.authorId?.name):(newItem?.authorId?.username)}</b></p>
                    <p>{newItem.createdAt}</p>
                    {newItem?.authorId?.id === userData.id ? (
                      <div
                        className="d-flex gap-2 "
                        style={{ marginLeft: "auto", marginTop: "-5px" }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => updateNews(newItem)}
                        >
                          Cập Nhật
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleDeleteNews(newItem.id)}
                        >
                          Xóa
                        </Button>
                      </div>
                    ) : null}
                  </div>
                  <p>{newItem.content}</p>
                  <Box
                    sx={{ width: "100%" }}
                    className="d-flex justify-content-center mb-4 mt-4"
                  >
                    {newItem.images.length > 0 ? (
                      <img
                        src={newItem.images[0]}
                        alt="Image"
                        style={{ width: "45%" }}
                      />
                    ) : null}
                  </Box>
                  <div>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => commentNews(newItem)}
                      >
                        <ChatBubbleOutlineIcon fontSize="small"></ChatBubbleOutlineIcon>{" "}
                        Bình Luận
                      </Button>
                    </Box>
                  </div>
                </Paper>
              ))}
            </Grid>
          ) : (
            <p className="h3">Không có tin tức </p>
          )}

          <ModalNews
            open={open}
            handleClose={handleClose}
            houseID={selectedHouseId}
            typeModal={typeModal}
            dataNews={dataNews}
          />
        </Box>
      )}
    </>
  );
}
