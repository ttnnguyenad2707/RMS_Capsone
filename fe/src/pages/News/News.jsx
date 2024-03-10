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
import { fetchNews } from "../../reduxToolkit/NewsSlice";
import { fetchHouses } from "../../reduxToolkit/HouseSlice";
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
  const handleAdd = (typeModal) => {
    setTypeModal(typeModal);
    handleOpen();
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
            height: "100vh",
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
            news.data.map((n) => (
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
                  {/* <Chart /> */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p style={{ marginRight: "10px" }}>
                      <b>m_ducs</b>
                    </p>
                    <p>1 giờ trước</p>
                  </div>
                  <p>{n.content}</p>
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
