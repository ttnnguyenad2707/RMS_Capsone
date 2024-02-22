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
import AddIcon from "@mui/icons-material/Add";
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
};
const stylesHeader = {
  color: "#5A67BA",
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
  const [age, setAge] = React.useState("");
  const [errorName, setErrorName] = React.useState(false);
  const [errorAddress, setErrorAddress] = React.useState(false);
  const [errorCostElectric, setErrorCostElectric] = React.useState(false);
  const [errorCostWater, setErrorWater] = React.useState(false);
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [CostElectricity, setCostElectricity] = React.useState();
  const [CostWater, setCostWater] = React.useState();
  const [utilities, setUtilities] = React.useState();
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
  const handleChangeMenu = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange = (event) => {
    const inputSelect = event.target.value;
    if (inputSelect !== null) {
      setAge(inputSelect);
    }
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
    setUtilities(data);
  };
  const HandleSubmit = () => {
    handleInputName();
    handleInputAddress();
    handleInputCostElectric();
    handleInputCostWater();

    if (
      name !== "" &&
      address !== "" &&
      CostElectricity !== null &&
      CostWater !== null &&
      utilities !== null &&
      city !== "" &&
      county !== "" &&
      ward !== ""
    ) {
      console.log(
        name,
        city,
        ward,
        county,
        address,
        CostElectricity,
        CostWater,
        utilities
      );
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

  const validateInput = (input) => {
    const pattern = /^[a-zA-Z\s]*$/;

    return pattern.test(input);
  };
  const validateInputNumber = (input) => {
    return !isNaN(input);
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
                sx={{ width: "65%" }}
                inputRef={inputName}
                error={errorName}
              />
              <FormControl fullWidth sx={{ width: "35%", ml: "20px" }}>
                <InputLabel id="demo-simple-select-label">Loại Nhà</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
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
              <p style={{ fontWeight: "bold", opacity: "0.5", color: "red" }}>
                (Không nhập tên Xã/Phường,Quận/Huyện,Tỉnh/Thành Phố)
              </p>
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
              />
              <TextField
                required
                id="outlined-basic"
                label="Tiền Nước Trên 1 Khối"
                variant="outlined"
                sx={{ width: "49%" }}
                inputRef={inputCostWater}
                error={errorCostWater}
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
                <UtilitiesTab handleInputSelect={handleInputUtilities} />
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
                backgroundColor: "#5A67BA",
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
