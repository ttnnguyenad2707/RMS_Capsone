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

const RenterProblem = () => {
  const userData = useSelector((state) => state.user.data); //state là rootReducer trong store ,counter cái tên đăng kí trong rootReducer

  const [problems, setProblems] = useState([]);
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
              Room: data.roomId.name,
              Creator: data.creatorId.name,
            },
          ]);
        });
      });
    }
    //  console.log("userData",userData)
  }, [selectedHouseId]);

  console.log("selectedRoomId", userData.roomId);

  console.log("userData", userData);

  const getProblemsInRoomRenter = async () => {
    try {
      const res = await getProblemsInRoomOfRenter(userData.roomId);
      console.log("res", res);
    } catch (error) {
      console.log(error);
    }
  };

  getProblemsInRoomRenter();

  const handleDelete = (id) => {
    deleteProblem(id).then((data) => {
      toast.success("Delete successfully");
      setDataTable((prevDataTable) =>
        prevDataTable.filter((problem) => problem.id !== id)
      );
    });
  };
  const handleUpdate = (problemId) => {
    updateStatusProblemsInHouse(problemId).then((data) => {
      //   toast.success("Delete successfully");
    });
  };
  return (
    <>
      {userData ? (
        <div>
          {userData.accountType == "renter" ? (
            <>
              {" "}
              <ModalAddProblem />
              <TableData
                data={dataTableForRenter}
                userData={userData}
                deleteData={handleDelete}
              />
            </>
          ) : (
            ""
          )}

          {userData.accountType == "host" ? (
            <>
              <SelectHouse onSelect={setSelectedHouseId} />
              <TableData
                data={dataTable}
                userData={userData}
                deleteData={handleDelete}
              />
            </>
          ) : (
            "loading"
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default RenterProblem;
