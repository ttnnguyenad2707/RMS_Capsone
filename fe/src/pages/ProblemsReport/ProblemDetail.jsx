import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { getDetailProblem } from "../../services/problems";
import { convertTimeFormat } from "../../Utils";
import "./ProblemDetail.scss";
import { useSelector } from "react-redux";
import ModalUpdateProblemByHost from "./Component/ModalUpdateProblemByHost";

const ProblemDetail = ({ problem, handleDelete }) => {
  const userData = useSelector((state) => state.user.data); //state là rootReducer trong store ,counter cái tên đăng kí trong rootReducer

  // console.log("problem",problem);
  const { problemId } = useParams();
  const [detailProblem, setDetailProblem] = useState();
  console.log("problemId", problemId);
  const convertStatusToVietnamese = (status) => {
    switch (status) {
      case "done":
        return "Đã giải quyết";
      case "pending":
        return "Đang chờ giải quyết";
      case "doing":
        return "Đang xử lý vấn đề";
      default:
        return "Chưa tiếp nhận";
    }
  };

 const handleStatusUpdate = (datares) => {
    // console.log("problemsId", datares._id);
    setDetailProblem(datares)
    
  };

  useEffect(() => {
    getProblemDetail();
  }, [problemId]);

  const getProblemDetail = async () => {
    try {
      const res = await getDetailProblem(problemId);
      setDetailProblem(res.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log("data Detail ", detailProblem);

  return (
    <div className="problem-detail-container">
      <Card variant="outlined" className="problem-card">
        <div className="head">
          <h1>Chi tiết sự cố</h1>
        </div>
        <CardHeader
          className="CardHeader"
          title={`${detailProblem?.creatorId?.name} - ${detailProblem?.creatorId?.username}`}
          subheader={`${convertTimeFormat(
            detailProblem?.creatorId?.createdAt
          )}`}
        />
        <CardContent>
          <Typography variant="h6" component="div" className="row">
            <div className="col-3">
              <h5> Tiêu đề:</h5>
            </div>
            <div className="col-9">{detailProblem?.title}</div>
          </Typography>
          <hr></hr>
          <Typography variant="body1" component="div" className="row">
            <div className="col-3">
              <h5>Nội Dung:</h5>
            </div>

            <div className="col-9">{detailProblem?.content}</div>
          </Typography>
          <hr></hr>
          <Typography variant="body2" component="div" className="row">
            <div className="col-3">
              <h5>Trạng thái:</h5>
            </div>

            <div className="col-9">
              {convertStatusToVietnamese(detailProblem?.status)}
            </div>
          </Typography>
          <hr></hr>
          {userData?.accountType == "host" ? (
            <>
              {/* <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(problem._id)}
              >
                Cập nhật vấn đề
              </Button> */}

              <ModalUpdateProblemByHost
                    problemsId={problemId}
                    // Room={row.Room}
                    // Status={row.Status}
                    onUpdateStatus={handleStatusUpdate}
                  />
            </>
          ) : (
            <></>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProblemDetail;
