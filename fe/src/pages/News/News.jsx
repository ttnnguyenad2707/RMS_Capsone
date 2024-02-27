import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import {
  AiOutlinePlus,
  AiFillDelete,
  AiFillEdit,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

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
        <>
          <Grid item xs={12} md={7} lg={8} marginLeft={17}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: "auto",
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

          <Grid item xs={12} md={7} lg={8} marginLeft={17}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: "auto",
              }}
            >
              {/* <Chart /> */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ marginRight: "10px" }}>
                  <b>m_ducs</b>
                </p>
                <p>1 giờ trước</p>
              </div>
              <p>
                Cuộc phỏng vấn PGS.TS Nguyễn Lân Hiếu, Giám đốc Bệnh viện Đại
                học Y Hà Nội kiêm Giám đốc Bệnh viện Đa khoa tỉnh Bình Dương,
                đại biểu Quốc hội khóa XV, là một cuộc phỏng vấn cởi mở và thú
                vị, khi vị bác sĩ gánh "nhiều vai" chia sẻ rất thẳng thắn và
                không hề né những câu hỏi khó.
              </p>
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

          <Grid item xs={12} md={7} lg={8} marginLeft={17}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: "auto",
              }}
            >
              {/* <Deposits /> */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ marginRight: "10px" }}>
                  <b>m_ducs</b>
                </p>
                <p>9 giờ trước</p>
              </div>
              <p>
                Không ít người dự đoán, với đà tăng này, doanh thu phim Mai sẽ
                sớm chạm mốc 500 tỷ đồng. Tuy nhiên, bên cạnh những phản ứng
                tích cực về "cơn sốt" của phim Mai, nhiều ý kiến cũng bày tỏ sự
                nghi ngờ về doanh thu mà tác phẩm này đạt được. Về vấn đề này,
                ông Nguyễn Khánh Dương - Nhà sáng lập Box Office Vietnam - từng
                chia sẻ với phóng viên Dân trí rằng mọi số liệu của Box Office
                Vietnam đều thu thập, tổng hợp từ dữ liệu bán vé công khai trên
                các hệ thống cụm rạp trong nước.
              </p>

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
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box
                    sx={style}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      <b>Những kẻ mộng mơ </b>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Không ít người dự đoán, với đà tăng này, doanh thu phim
                      Mai sẽ sớm chạm mốc 500 tỷ đồng. Tuy nhiên, bên cạnh những
                      phản ứng tích cực về "cơn sốt" của phim Mai, nhiều ý kiến
                      cũng bày tỏ sự nghi ngờ về doanh thu mà tác phẩm này đạt
                      được. Về vấn đề này, ông Nguyễn Khánh Dương - Nhà sáng lập
                      Box Office Vietnam - từng chia sẻ với phóng viên Dân trí
                      rằng mọi số liệu của Box Office Vietnam đều thu thập, tổng
                      hợp từ dữ liệu bán vé công khai trên các hệ thống cụm rạp
                      trong nước.
                      <hr />
                      <Button variant="">
                        <ThumbUpAltIcon fontSize="small"></ThumbUpAltIcon>Thích
                      </Button>
                      <Button variant="">
                        <ChatBubbleOutlineIcon fontSize="small"></ChatBubbleOutlineIcon>
                        Bình Luận
                      </Button>
                      <hr />
                    </Typography>
                    <Box style={{ marginTop: "auto" }}>
                      <TextField
                        id="comment"
                        label="Bình luận"
                        multiline
                        //rows={6}
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </Box>
                  </Box>
                </Modal>
              </div>
            </Paper>
          </Grid>
        </>
      )}
    </>
  );
}
