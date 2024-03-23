import React, { useEffect, useLayoutEffect, useState } from "react";
import SelectHouse from "../../CommonComponents/SelectHouse";
import TableData from "../../CommonComponents/TableData";
import {
  deleteProblem,
  getProblemsInHouse,
  getProblemsInRoomOfRenter,
} from "../../services/problems";
import { toast } from "react-toastify";
import ModalAddProblem from "./Component/ModalAddProblem";
import { useSelector } from "react-redux";
import "./RenterProblem.scss";
import Notification from "../../CommonComponents/Notification";
import ModalUpdateProblem from "./Component/ModalUpdateProblemByRenter";

const RenterProblem = () => {
  const userData = useSelector((state) => state.user.data); //state là rootReducer trong store ,counter cái tên đăng kí trong rootReducer

  const [selectedHouseId, setSelectedHouseId] = useState();

  // const [selectedRoomId, setSelectedRoomId] = useState(userData.roomId);

  const [dataTableForRenter, setDataTableForRenter] = useState();

  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    if (selectedHouseId) {
      setDataTable([]);
      getProblemsInHouse(selectedHouseId).then((data) => {
        data.data.data.data.map((data) => {
          setDataTable((prev) => [
            ...prev,
            {
              id: data._id,
              Title: data.title,
              Content: data.content,
              Status: data.status,
              Room: data.roomId?.name,
              Creator: data.creatorId?.name,
            },
          ]);
        });
      });
    }
    //  console.log("userData",userData)
  }, [selectedHouseId]);

  console.log("selectedRoomId", userData.roomId);

  console.log("userData", userData);
  console.log("dataTableForRenter", dataTableForRenter);

  const getProblemsInRoomRenter = async () => {
    try {
      const res = await getProblemsInRoomOfRenter(userData?.roomId);
      console.log("res", res);
      setDataTableForRenter(res.data.data.data);
    } catch (error) {
      console.log(error);
      console.log("call fail");
    }
  };

  useEffect(() => {
    if (userData?.roomId) {
      getProblemsInRoomRenter();
    }
  }, [userData?.roomId]);

  useEffect(() => {}, [dataTableForRenter, dataTable]);
  // getProblemsInRoomRenter();

  const handleDelete = async (id) => {
    Notification("Confirm", "Xác Nhận", "Xóa Vấn đề").then(async (result) => {
      if (result) {
        try {
          const res = await deleteProblem(id);
          console.log("res", res);
          setDataTableForRenter((prevDataTableForRenter) =>
            prevDataTableForRenter.filter((problem) => problem._id !== id)
          );
          toast.success("Delete successfully");
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        console.log("Người dùng đã chọn Cancel");
        // Xử lý khi người dùng chọn Cancel
      }
    });
  };
  // const handleUpdate = (problemId) => {

  // };
  const handleUpdate = (datares) => {
    console.log("problemsId", datares._id);
    setDataTableForRenter((prevDisplayData) =>
      prevDisplayData.map((row) =>
        row._id === datares._id
          ? { ...row, title: datares.title, content: datares.content }
          : row
      )
    );
  };

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
  return (
    <>
      {userData && (
        <div className="">
          {userData?.accountType == "renter" ? (
            <>
              <div className="m-5">
                <button class="btn btn-dark">
                  <ModalAddProblem
                    setDataTableForRenter={setDataTableForRenter}
                  />
                </button>
              </div>
              <div className="">
                <table className="table">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tiêu Đề</th>
                      <th>Nội Dung</th>
                      <th>Trạng Thái</th>
                      <th>Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataTableForRenter && dataTableForRenter.length > 0 ? (
                      dataTableForRenter.map((problem, index) => (
                        <tr key={problem.id}>
                          <td>{index + 1}</td>
                          <td>{problem?.title}</td>
                          <td>{problem?.content}</td>
                          <td>{convertStatusToVietnamese(problem?.status)}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <button
                                className="btn btn-danger m-2"
                                onClick={() => handleDelete(problem._id)}
                              >
                                Xóa vấn đề
                              </button>
                              <ModalUpdateProblem
                                problem={problem}
                                problemsId={problem._id}
                                onUpdateStatus={handleUpdate}
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">chưa có dữ liệu</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            ""
          )}

          {userData?.accountType == "host" ? (
            <>
              <SelectHouse onSelect={setSelectedHouseId} />
              <TableData
                data={dataTable}
                userData={userData}
                deleteData={handleDelete}
              />
            </>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};

export default RenterProblem;
