import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { AddOrtherUtilService } from "../../../services/houses";
const AddUtil = () => {
  const inputAddress = React.useRef();
  const handleAddUtil = () => {
    const utilValue = inputAddress.current.value;
    
    const data = {
        name: utilValue
    }
    AddUtilService(data);
  };
  const AddUtilService = async (input) => {
    try {
     const OtherUtil= await AddOrtherUtilService(input);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box sx={{ mt: "20px" }}>
      <TextField
        required
        id="outlined-basic"
        label="Nhập Thêm Tiện Ích"
        variant="outlined"
        sx={{ width: "100%" }}
        inputRef={inputAddress}
      />
      <Button
        onClick={handleAddUtil}
        variant="contained"
        style={{
          fontWeight: "bold",
          margin: "10px",
        }}
      >
        Thêm Tiện Ích <AddIcon fontSize="small" />
      </Button>
    </Box>
  );
};

export default AddUtil;
