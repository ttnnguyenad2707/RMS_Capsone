import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import * as React from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import UtilitiesTab from "./UtilitiesTab";
import InputAdornment from "@mui/material/InputAdornment";
import { updateHouse, fetchHouses } from "../../../reduxToolkit/HouseSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
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
export default function BasicModalUpdate({
  data,
  handleClose,
  handleOpen,
  openModal,
}) {
  const [errorName, setErrorName] = React.useState(false);
  const [errorAddress, setErrorAddress] = React.useState(false);
  const [errorCostElectric, setErrorCostElectric] = React.useState(false);
  const [errorCostWater, setErrorWater] = React.useState(false);
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [CostElectricity, setCostElectricity] = React.useState();
  const [CostWater, setCostWater] = React.useState();
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
        const selectedCity = location.find((c) => c.value === city);

        if (selectedCity) {
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
      setName(inputValue);
      setErrorName(false);
    } else {
      setErrorName(true);
    }
  };
  const handleInputAddress = () => {
    const inputValue = inputAddress.current.value;
    if (validateInput(inputValue) && inputValue != " ") {
      setAddress(inputValue);
      setErrorAddress(false);
    } else {
      setErrorAddress(true);
    }
  };
  const handleInputCostElectric = () => {
    const inputValue = inputCostElectricity.current.value;
    if (validateInputNumber(inputValue) && inputValue != " ") {
      setCostElectricity(inputValue);
      setErrorCostElectric(false);
    } else {
      setErrorCostElectric(true);
    }
  };
  const handleInputCostWater = () => {
    const inputValue = inputCostWater.current.value;
    if (validateInputNumber(inputValue) && inputValue != " ") {
      setCostWater(inputValue);
      setErrorWater(false);
    } else {
      setErrorWater(true);
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
    handleInputName();
    handleInputAddress();
    handleInputCostElectric();
    handleInputCostWater();
    handleInputUtilities();
    console.log(utilities, " sao ");
    if (
      name !== "" &&
      address !== "" &&
      CostElectricity !== null &&
      CostWater !== null &&
      city !== "" &&
      county !== "" &&
      ward !== "" &&
      utilities
    ) {
      const setData = {
        name: name,
        status: true,
        location: {
          district: city,
          ward: ward,
          province: county,
          detailLocation: address,
        },
        electricPrice: CostElectricity,
        waterPrice: CostWater,
        utilities: utilities,
        otherUtilities: utilitiesOther,
      };
      const id = data.id;
      await dispatch(updateHouse({ setData, id }));
      await dispatch(fetchHouses());
      handleClose();
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
    if (data) {
      const cityInput = locationCity.find((c) => c === data.address.city);
      setCity(cityInput);
    }
  }, [data]);
  React.useEffect(() => {
    if (locationWard) {
      const wardInput = locationWard.find(
        (c) => c.value === data.address.county
      );
      if (wardInput) {
        setWard(wardInput.value);
      } else {
        setWard("");
      }
    }
  }, [locationWard]);
  React.useEffect(() => {
    if (locationCounty) {
      const countyInput = locationCounty.find(
        (c) => c.value === data.address.ward
      );
      if (countyInput) {
        setCounty(countyInput.value);
      } else {
        setCounty("");
      }
    }
  }, [locationCounty]);
  const validateInput = (input) => {
    const pattern = /^[\p{L}\p{N}\s]+$/u;
    return pattern.test(input);
  };
  const validateInputNumber = (input) => {
    return !isNaN(input) && Number(input) > 0;
  };
  console.log(data);
  return (
    <div>
      {data ? (
        <Modal
          open={openModal}
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
                Cập Nhật
              </Typography>
              <IconButton
                sx={{ position: "absolute", right: "10px" }}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography id="modal-modal-description" sx={stylesHeader}>
              Cập nhật nhà vào hệ thống
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
                  defaultValue={data.houseName}
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
                  <InputLabel id="demo-simple-select-label">
                    Phường/Xã
                  </InputLabel>
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
                  defaultValue={data.address.streetNumber}
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
                  defaultValue={data.costElectricity}
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
                  defaultValue={data.costWater}
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
                  <Tab value="1" label="Item One" />
                  <Tab value="2" label="Item Two" />
                  <Tab value="3" label="Item Three" />
                </Tabs>
                {value === "1" && (
                  <UtilitiesTab
                    handleInputSelect={handleInputUtilities}
                    dataUtil={data.utils}
                    dataOrtherUtil={data.ortherUtils}
                    typeUtil={"update"}
                    handleInputSelectOrther={handleInputUtilitiesOrther}
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
                Cập Nhật
              </Button>
            </Box>
          </Box>
        </Modal>
      ) : null}
    </div>
  );
}
