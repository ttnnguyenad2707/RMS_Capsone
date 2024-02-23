import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
const UtilitiesTab = ({ handleInputSelect, dataUtil }) => {
  const [utils, setUtil] = useState([]);
  const handleChange = (util) => {
    console.log(util.value);
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
  useEffect(() => {
    const selectUtil = utils
      .filter((u) => u.isCheck === true)
      .map((u) => u.value);
    handleInputSelect(selectUtil);
  }, [utils]);
  useEffect(() => {
    if (dataUtil) {
      const dataUtils = dataUtil.map((u) => {
        return {
          name: u.name,
          vale: u.name,
          isCheck: true,
        };
      });
      setUtil(dataUtils);
    }
  }, [dataUtil]);
  return (
    <Box sx={{ display: "flex" }}>
      <FormGroup>
        {utils.map((u) => (
          <FormControlLabel
            control={
              <Checkbox checked={u.isCheck} onChange={() => handleChange(u)} />
            }
            label={u.name}
            key={u.value}
            sx={{ width: "fit-content" }}
          />
        ))}
      </FormGroup>
    </Box>
  );
};
export default UtilitiesTab;
