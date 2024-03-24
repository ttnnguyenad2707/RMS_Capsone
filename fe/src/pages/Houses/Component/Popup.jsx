import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import * as React from "react";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { addHouse } from "../../../reduxToolkit/HouseSlice";
import { fetchOrtherUtil } from "../../../reduxToolkit/UtilSlice";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import UtilitiesTab from "./UtilitiesTab";
import AddIcon from "@mui/icons-material/Add";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { fetchHouses } from "../../../reduxToolkit/HouseSlice";
import Notification from "../../../CommonComponents/Notification";
import InputAdornment from "@mui/material/InputAdornment";

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
  overflow: "auto",
};
const stylesHeader = {
  color: "#1976d2",
  display: "flex",
  position: "relative",
  fontWeight: "Bold",
};
const stylesBody = {
  width: "100%",
  marginTop: "20px",
};
export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [errorName, setErrorName] = React.useState(false);
  const [errorAddress, setErrorAddress] = React.useState(false);
  const [errorCostElectric, setErrorCostElectric] = React.useState(false);
  const [errorCostWater, setErrorWater] = React.useState(false);
  const [utilities, setUtilities] = React.useState();
  const [utilitiesOther, setUtilitiesOther] = React.useState();
  const [value, setValue] = React.useState("1");
  const [location, setLocation] = React.useState();
  const [city, setCity] = React.useState("");
  const [ward, setWard] = React.useState("");
  const [county, setCounty] = React.useState("");
  const [locationCity, setLocationCity] = React.useState("");
  const [locationWard, setLocationWard] = React.useState("");
  const [locationCounty, setLocationCounty] = React.useState("");
  const inputName = React.useRef();
  const inputAddress = React.useRef();
  const inputCostElectricity = React.useRef();
  const inputCostWater = React.useRef();
  const dispatch = useDispatch();
  const handleChangeMenu = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeCity = (event) => {
    const inputSelect = event.target.value;
    if (inputSelect !== null) {
      setCity(inputSelect);
    }
  };
  const handleChangeWard = (event) => {
    const inputSelect = event.target.value;
    if (inputSelect !== null) {
      setWard(inputSelect);
    }
  };
  const handleChangeCounty = (event) => {
    const inputSelect = event.target.value;
    if (inputSelect !== null) {
      setCounty(inputSelect);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fetchLocation = async () => {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      );
      const transformedData = response.data.map((item) => ({
        title: item.Name,
        value: item.Name,
        children: item.Districts
          ? item.Districts.map((child) => ({
              title: child.Name,
              value: child.Name,
              children: child.Wards
                ? child.Wards.map((wards) => ({
                    title: wards.Name,
                    value: wards.Name,
                  }))
                : [],
            }))
          : [],
      }));

      setLocation(transformedData);
    } catch (error) {
      console.error(error);
    }
  };
  const settingCity = () => {
    if (location !== null && typeof location !== "undefined") {
      const listCity = location.map((city) => city.value);
      setLocationCity(listCity);
    }
  };
  const settingWard = () => {
    if (location !== null && typeof location !== "undefined") {
      if (city !== null && typeof city !== "undefined") {
        console.log(city);
        const selectedCity = location.find((c) => c.value === city);

        if (selectedCity) {
          console.log("hello");
          const listWard = selectedCity.children.map((ward) => ({
            title: ward.title,
            value: ward.value,
            children: ward.children,
          }));
          setLocationWard(listWard);
        }
      }
    }
  };
  const settingCounty = () => {
    if (location !== null && typeof location !== "undefined") {
      if (ward !== null && typeof ward !== "undefined") {
        const selectedCounty = locationWard.find((c) => c.value === ward);

        if (selectedCounty) {
          const listCounty = selectedCounty.children.map((county) => ({
            title: county.title,
            value: county.value,
          }));
          setLocationCounty(listCounty);
        }
      }
    }
  };

  const handleInputName = () => {
    const inputValue = inputName.current.value;
    if (validateInput(inputValue) && inputValue != " ") {
      setErrorName(false);
    } else {
      setErrorName(true);
      toast.error("Tên nhà không đúng định dạng");
    }
  };
  const handleInputAddress = () => {
    const inputValue = inputAddress.current.value;
    if (validateInput(inputValue)) {
      setErrorAddress(false);
    } else {
      setErrorAddress(true);
      toast.error("Địa chỉ không đúng định dạng");
    }
  };
  const handleInputCostElectric = () => {
    const inputValue = inputCostElectricity.current.value;
    if (validateInputNumber(inputValue) == true && inputValue != " ") {
      setErrorCostElectric(false);
    } else {
      setErrorCostElectric(true);
      toast.error("Giá tiền điện không đúng định dạng");
    }
  };
  const handleInputCostWater = () => {
    const inputValue = inputCostWater.current.value;
    if (validateInputNumber(inputValue) == true && inputValue != " ") {
      setErrorWater(false);
    } else {
      setErrorWater(true);
      toast.error("Giá tiền nước không đúng định dạng");
    }
  };
  const handleInputUtilities = (data) => {
    if (data) {
      setUtilities(data);
    }
  };
  const handleInputUtilitiesOrther = (data) => {
    console.log(data, " orther util");
    if (data) {
      setUtilitiesOther(data);
    }
  };
  const HandleSubmit = async () => {
    handleInputCostElectric();
    handleInputCostWater();
    handleInputUtilities();
    handleInputUtilitiesOrther();
    if (
      utilities &&
      utilitiesOther &&
      inputName.current.value !== "" &&
      inputAddress.current.value !== "" &&
      Number(inputCostElectricity.current.value) > 0 &&
      Number(inputCostWater.current.value) > 0
    ) {
      const setData = {
        name: inputName.current.value,
        status: true,
        location: {
          district: city,
          ward: ward,
          province: county,
          detailLocation: inputAddress.current.value,
        },
        electricPrice: parseInt(inputCostElectricity.current.value),
        waterPrice: parseInt(inputCostWater.current.value),
        utilities: utilities,
        otherUtilities: utilitiesOther,
      };
      const response = await dispatch(addHouse(setData));
      console.log(response, "response");
      if (response) {
        setErrorWater(false);
        setErrorName(false);
        setErrorAddress(false);
        setErrorCostElectric(false);
        setCity("");
        setWard("");
        setCounty("");
        await dispatch(fetchHouses());
        Notification("Success", "Thêm Nhà", "Thành Công");
        handleClose();
      } else {
        Notification("Error", "Thêm Nhà", "Thất Bại");
      }
    }
  };
  React.useEffect(() => {
    fetchLocation();
  }, []);

  React.useEffect(() => {
    settingCity();
  }, [location]);

  React.useEffect(() => {
    setWard("");
    setCounty("");
    settingWard();
  }, [city]);
  React.useEffect(() => {
    settingCounty();
  }, [ward]);
  React.useEffect(() => {
    dispatch(fetchOrtherUtil());
  }, []);
  const validateInput = (input) => {
    const pattern = /^[\p{L}\p{N}\s]+$/u;

    return pattern.test(input);
  };
  const validateInputNumber = (input) => {
    return !isNaN(input) && Number(input) > 0;
  };
  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        style={{
          backgroundColor: "#1976d2",
          fontWeight: "bold",
          margin: "10px",
        }}
      >
        Thêm Nhà <AddIcon fontSize="small" />
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
              Thêm Nhà
            </Typography>
            <IconButton
              sx={{ position: "absolute", right: "10px" }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography id="modal-modal-description" sx={stylesHeader}>
            Thêm nhà vào hệ thống
          </Typography>
          <Box sx={stylesBody}>
            <Box sx={{ display: "flex" }}>
              <TextField
                required
                id="outlined-basic"
                label="Tên Nhà"
                variant="outlined"
                sx={{ width: "100%" }}
                inputRef={inputName}
                error={errorName}
              />
            </Box>
            <Box sx={{ mt: "20px", display: "flex" }}>
              <FormControl fullWidth sx={{ width: "30%" }}>
                <InputLabel id="demo-simple-select-label">
                  Tỉnh/Thành Phố
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={city}
                  label="Tỉnh Thành Phố"
                  onChange={handleChangeCity}
                >
                  {locationCity ? (
                    locationCity.map((city) => (
                      <MenuItem value={city} key={city}>
                        {city}
                      </MenuItem>
                    ))
                  ) : (
                    <div>Không Có Dữ Liệu</div>
                  )}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ width: "35%", ml: "20px" }}>
                <InputLabel id="demo-simple-select-label">
                  Quận/Huyện
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ward}
                  label="Quận Huyện"
                  onChange={handleChangeWard}
                >
                  {locationWard ? (
                    locationWard.map((city) => (
                      <MenuItem value={city.value} key={city.title}>
                        {city.title}
                      </MenuItem>
                    ))
                  ) : (
                    <div>Không Có Dữ Liệu</div>
                  )}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ width: "35%", ml: "20px" }}>
                <InputLabel id="demo-simple-select-label">Phường/Xã</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={county}
                  label="Phường/Xã"
                  onChange={handleChangeCounty}
                >
                  {locationCounty ? (
                    locationCounty.map((city) => (
                      <MenuItem value={city.value} key={city.title}>
                        {city.title}
                      </MenuItem>
                    ))
                  ) : (
                    <div>Không Có Dữ Liệu </div>
                  )}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mt: "20px" }}>
              <TextField
                required
                id="outlined-basic"
                label="Địa Chỉ"
                variant="outlined"
                sx={{ width: "100%" }}
                inputRef={inputAddress}
                error={errorAddress}
              />
              <p
                style={{ fontWeight: "bold", opacity: "0.5", color: "red" }}
              ></p>
            </Box>
            <Box>
              <TextField
                required
                id="outlined-basic"
                label="Tiền Điện Trên 1kwH"
                variant="outlined"
                sx={{ width: "50%", mr: "1%" }}
                inputRef={inputCostElectricity}
                error={errorCostElectric}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">VND/kwH</InputAdornment>
                  ),
                }}
              />
              <TextField
                required
                id="outlined-basic"
                label="Tiền Nước Trên 1 Khối"
                variant="outlined"
                sx={{ width: "49%" }}
                inputRef={inputCostWater}
                error={errorCostWater}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">VND/m³</InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box sx={{ width: "100%", mt: "20px" }}>
              <Tabs
                value={value}
                onChange={handleChangeMenu}
                textColor="primary"
                indicatorColor="primary"
                aria-label="secondary tabs example"
              >
                <Tab value="1" label="Tiện Ích" />
              </Tabs>
              {value === "1" && (
                <UtilitiesTab
                  handleInputSelect={handleInputUtilities}
                  handleInputSelectOrther={handleInputUtilitiesOrther}
                  typeUtil={"add"}
                />
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              position: "absolute",
              right: "18px",
              bottom: "18px",
            }}
          >
            <Button
              variant="contained"
              color="error"
              sx={{ ml: "10px", fontWeight: "Bold" }}
              onClick={() => handleClose()}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              sx={{
                ml: "10px",
                backgroundColor: "#1976d2",
                fontWeight: "Bold",
              }}
              onClick={() => HandleSubmit()}
            >
              Thêm Nhà
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
