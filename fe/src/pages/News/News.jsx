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
  const [isLoading, setIsLoading] = useState(false);

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
                <b>m_ducs</b>
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
                  onClick={() => handleOpen()}
                >
                  Đức ơi bạn đang nghĩ gì thế ?
                </Button>
              </Box>
              <hr></hr>
              <Box
                className="d-flex"
                sx={{ borderTop: "soid 1px #cccccc" }}
              >
                <Button>Phát Trực Tiếp</Button>
                <Button>Phát Trực Tiếp</Button>
                <Button>Phát Trực Tiếp</Button>
              </Box>
            </Paper>
          </Grid>

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
              <p>"Em tỏa hương</p>
              <p>Tôi tưởng hoa.."</p>
              <div>
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <Button variant="outlined">
                    <ThumbUpAltIcon fontSize="small"></ThumbUpAltIcon>Thích
                  </Button>
                  <Button variant="outlined" onClick={handleOpen}>
                    <ChatBubbleOutlineIcon fontSize="small"></ChatBubbleOutlineIcon>{" "}
                    Bình Luận
                  </Button>
                </Box>
              </div>
            </Paper>
          </Grid>

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
              <p>"Em tỏa hương</p>
              <p>Tôi tưởng hoa.."</p>
              <div>
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <Button variant="outlined">
                    <ThumbUpAltIcon fontSize="small"></ThumbUpAltIcon>Thích
                  </Button>
                  <Button variant="outlined" onClick={handleOpen}>
                    <ChatBubbleOutlineIcon fontSize="small"></ChatBubbleOutlineIcon>{" "}
                    Bình Luận
                  </Button>
                </Box>
              </div>
            </Paper>
          </Grid>
         <ModalNews open={open} handleClose={handleClose}/>
        </Box>
      )}
    </>
  );
}
