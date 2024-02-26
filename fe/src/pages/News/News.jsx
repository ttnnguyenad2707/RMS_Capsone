
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
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
  width: 1200,
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
                      <p>
                        "Em tỏa hương
                      </p>
                      <p>
                        Tôi tưởng hoa.."
                      </p>
                    <div>
                    <Button variant="outlined" onClick={handleOpen}>Bình Luận</Button>
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
                      
                      <p>(Dân trí) - Nhìn lại chặng đường hơn 3 năm nỗ lực chống đại dịch Covid-19, Thủ tướng Phạm Minh Chính cho rằng chúng ta đã làm được những điều không tưởng, để Việt Nam "đi sau về trước" trong phòng chống dịch.
Thủ tướng Phạm Minh Chính nhấn mạnh nhận định này khi phát biểu khai mạc Hội nghị tổng kết công tác phòng, chống dịch Covid-19 sáng 29/10.

Đây là dịp để nhìn lại chặng đường hơn 3 năm cả nước nỗ lực chống Covid-19, đại dịch ghi nhận ca bệnh đầu tiên vào cuối tháng 12/2019 tại Vũ Hán, Trung Quốc.

Hội nghị tổng kết của Ban Chỉ đạo phòng, chống dịch diễn ra trong bối cảnh dịch bệnh đã được kiểm soát tốt nhờ những nỗ lực lớn, những giải pháp quyết liệt, hiệu quả mang tính toàn cầu, toàn dân; kinh tế từng bước phục hồi và phát triển, đời sống người dân trở lại trạng thái bình thường.</p>
                    <div>
                    <Button variant="outlined" onClick={handleOpen}>Bình Luận</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Rất nhiều thứ !!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
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
