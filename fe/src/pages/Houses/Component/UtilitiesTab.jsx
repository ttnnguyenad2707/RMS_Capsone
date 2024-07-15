import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrtherUtil,
  fetchOrtherUtil,
} from "../../../reduxToolkit/UtilSlice";
import { fetchDefaultUtil } from "../../../reduxToolkit/UtilSliceDefault";
const UtilitiesTab = ({
  handleInputSelect,
  handleInputSelectOrther,
  dataUtil,
  dataOrtherUtil,
  typeUtil,
}) => {
  const [utils, setUtil] = useState([]);
  const [utilsOrther, setUtilOther] = useState([]);
  const [open, setOpen] = useState(false);
  const inputName = useRef();
  const dispatch = useDispatch();
  const defaultUtils = useSelector((state) => state.defaultUtil.defaultutils);
  const ortherUtil = useSelector((state) => state.utilOther.otherutils);
  const handleInputName = () => {
    const inputValue = inputName.current.value;
    if (validateInput(inputValue) && inputValue != " ") {
      const data = {
        name: inputValue,
      };

      dispatch(addOrtherUtil({ data }));
      dispatch(fetchOrtherUtil());
      toast.success("Thêm Tiện Ích Thành Công");
      handleClose();
    } else {
      toast.error("Tên không đúng định dạng");
    }
  };
  const validateInput = (input) => {
    const pattern = /^[\p{L}\p{N}\s]+$/u;

    return pattern.test(input);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
    const data = utils.filter((u) => u.isCheck === true).map((u) => u.value);
    handleInputSelect( data );
  }, [utils]);
  useEffect(() => {
    const data = utilsOrther
      .filter((u) => u.isCheck === true)
      .map((u) => u.value);
    console.log(utilsOrther);
    handleInputSelectOrther(data );
  }, [utilsOrther]);
  useEffect(() => {
    if (defaultUtils && typeUtil === "update" && dataUtil) {
      const dataUtils = defaultUtils.map((u) => {
        const foundUtil = dataUtil.find((u2) => u.id === u2.id);
        return {
          name: u.name,
          value: u.id,
          isCheck: foundUtil ? true : false,
        };
      });
      setUtil(dataUtils);
    } else if (defaultUtils && typeUtil === "add") {
      const dataUtils = defaultUtils.map((u) => {
        return {
          name: u.name,
          value: u.id,
          isCheck: false,
        };
      });
      setUtil(dataUtils);
    }
  }, [defaultUtils, dataUtil]);
  useEffect(() => {
    if (ortherUtil && typeUtil === "update" && dataOrtherUtil) {
      const dataUtils = ortherUtil.map((u) => {
        const foundUtil = dataOrtherUtil.find((u2) => u.id === u2.id);
        return {
          name: u.name,
          value: u.id,
          isCheck: foundUtil ? true : false,
        };
      });
      setUtilOther(dataUtils);
    } else if (ortherUtil && typeUtil === "add") {
      const dataUtils = ortherUtil.map((u) => {
        return {
          name: u.name,
          value: u.id,
          isCheck: false,
        };
      });
      setUtilOther(dataUtils);
    }
  }, [ortherUtil,dataUtil]);
  useEffect(() => {
    dispatch(fetchOrtherUtil());
    dispatch(fetchDefaultUtil());
  }, []);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: "20%",
    bgcolor: "background.paper",
    border: "2px solid #grey",
    boxShadow: 25,
    p: 5,
    borderRadius: "10px",
    padding: "18px",
    overflow: "auto",
  };
  const stylesHeader = {
    color: "#1976d2",
    display: "flex",
    position: "relative",
    fontWeight: "Bold",
  };
  return (
    <Box>
      <FormGroup
        sx={{
          width: "fit-content",
          display: "flex",
          flexDirection: "row !important",
        }}
      >
        {utils.map((u) => (
          <FormControlLabel
            control={
              <Checkbox checked={u.isCheck} onChange={() => handleChange(u)} />
            }
            label={u.name}
            key={u.value}
            sx={{ width: "132px" }}
          />
        ))}
      </FormGroup>
      <FormGroup
        sx={{
          width: "fit-content",
          display: "flex",
          flexDirection: "row !important",
        }}
      >
        {utilsOrther.map((u) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={u.isCheck}
                onChange={() => handleChangeOrther(u)}
              />
            }
            label={u.name}
            key={u.value}
            sx={{ width: "fit-content", display: "flex" }}
          />
        ))}
      </FormGroup>
      <Button variant="contained" onClick={handleOpen} sx={{ padding: "3px" }}>
        <AddCircleOutlineIcon sx={{ width: "fit-content" }} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={stylesHeader}>
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h3"
              sx={{ fontWeight: "Bold" }}
            >
              Thêm tiện ích
            </Typography>
            <IconButton
              sx={{ position: "absolute", right: "10px" }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", mt: 3, mb: 3 }}>
            <TextField
              required
              id="outlined-basic"
              label="Tên Tiện Ích"
              variant="outlined"
              sx={{ width: "100%" }}
              inputRef={inputName}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="contained"
              sx={{ padding: "3px", ml: 3 }}
              onClick={handleClose}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              sx={{ padding: "3px", ml: 3 }}
              onClick={() => handleInputName()}
            >
              Thêm
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
export default UtilitiesTab;
