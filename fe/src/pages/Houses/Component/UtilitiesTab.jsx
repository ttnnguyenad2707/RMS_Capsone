import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
const UtilitiesTab = ({ handleInputSelect, dataUtil }) => {
  const [utils, setUtil] = useState([
    {
      name: "Ban Công1",
      value: "Ban Công1",
      isCheck: true,
    },
    {
      name: "Ban Công2",
      value: "Ban Công",
      isCheck: true,
    },
    {
      name: "Ban Côn3",
      value: "Ban Công",
      isCheck: true,
    },
    {
      name: "Ban Công4",
      value: "Ban Công",
      isCheck: true,
    },
    {
      name: "Ban Công5",
      value: "Ban Công",
      isCheck: true,
    },
  ]);
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
      const dataUtils = dataUtils.map((u) => {
        return {
          name: u.name,
          vale: u.name,
          isCheck: true,
        };
      });
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
