import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
const UtilitiesTab = ({ handleInputSelect, dataUtil, typeUtil,dataUtilOther }) => {
  const [utils, setUtil] = useState([]);
  const [utilsOrther, setUtilOther] = useState([]);
  console.log(dataUtil, "dataUtil");
  const handleChange = (util) => {
    const newUtil = utils.map((u) => {
      if (u.value === util.value) {
        if (util.isCheck === true) {
          u.isCheck = false;
        } else {
          u.isCheck = true;
        }
      }
      return u;
    });
    setUtil(newUtil);
  };
  const handleChangeOrther = (util) => {
    const newUtil = utilsOrther.map((u) => {
      if (u.value === util.value) {
        if (util.isCheck === true) {
          u.isCheck = false;
        } else {
          u.isCheck = true;
        }
      }
      return u;
    });
    setUtilOther(newUtil);
  };
  useEffect(() => {
    const selectUtil = utils
      .filter((u) => u.isCheck === true)
      .map((u) => u.value);
    console.log(selectUtil, "looo");
    handleInputSelect(selectUtil);
  }, [utils]);
  useEffect(() => {
    if (dataUtil && typeUtil === "update") {
      const dataUtils = dataUtil.map((u) => {
        return {
          name: u.name,
          value: u._id,
          isCheck: true,
        };
      });
      setUtil(dataUtils);
    } else if(dataUtil && typeUtil === "add") {
      const dataUtils = dataUtil.map((u) => {
        return {
          name: u.name,
          value: u._id,
          isCheck: false,
        };
      });
      setUtil(dataUtils);
    }
  }, []);
  useEffect(() => {
    if (dataUtilOther && typeUtil === "update") {
      const dataUtils = dataUtilOther.map((u) => {
        return {
          name: u.name,
          value: u._id,
          isCheck: true,
        };
      });
      setUtilOther(dataUtils);
    } else if(dataUtilOther && typeUtil === "add") {
      const dataUtils = dataUtilOther.map((u) => {
        return {
          name: u.name,
          value: u._id,
          isCheck: false,
        };
      });
      setUtilOther(dataUtils);
    }
  }, []);
  return (
    <Box>
      <FormGroup  sx={{ width: "fit-content",display: "flex" }}>
        {utils.map((u) => (
          <FormControlLabel
            control={
              <Checkbox checked={u.isCheck} onChange={() => handleChange(u)} />
            }
            label={u.name}
            key={u.value}
            sx={{ width: "fit-content",display: "flex" }}
          />
        ))}
      </FormGroup>
      <FormGroup  sx={{ width: "fit-content",display: "flex" }}>
        {utilsOrther.map((u) => (
          <FormControlLabel
            control={
              <Checkbox checked={u.isCheck} onChange={() => handleChangeOrther(u)} />
            }
            label={u.name}
            key={u.value}
            sx={{ width: "fit-content",display: "flex" }}
          />
        ))}
      </FormGroup>
    </Box>
  );
};
export default UtilitiesTab;
