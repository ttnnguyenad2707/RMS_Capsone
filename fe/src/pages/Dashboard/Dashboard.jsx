import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "./Components/listItems";
import Chart from "./Components/Chart";
import Deposits from "./Components/Deposits";
import Orders from "./Components/Orders";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { login } from "../../reduxToolkit/UserSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/auth";
import {
  AiOutlinePlus,
  AiFillDelete,
  AiFillEdit,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import BarChartDisplay from "./Components/BarChart";
import CommonInformation from "./Components/CommonInfomation";
import PaymentTracking from "./Components/PaymentTracking";
import ProblemInfomation from "./Components/ProblemInfomation";
// const drawerWidth = 240;

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   "& .MuiDrawer-paper": {
//     position: "relative",
//     whiteSpace: "nowrap",
//     width: drawerWidth,
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     boxSizing: "border-box",
//     ...(!open && {
//       overflowX: "hidden",
//       transition: theme.transitions.create("width", {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//       }),
//       width: theme.spacing(7),
//       [theme.breakpoints.up("sm")]: {
//         width: theme.spacing(9),
//       },
//     }),
//   },
// }));

// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

export default function Dashboard() {
  // const [open, setOpen] = React.useState(true);
  // const toggleDrawer = () => {
  //   setOpen(!open);
  // };
  const [isLoading, setIsLoading] = useState(false);

  // const navigate = useNavigate();

  // const dispatch = useDispatch();
  // const userData = useSelector((state) => state.user.data); //state là rootReducer trong store ,counter cái tên đăng kí trong rootReducer
  // console.log("userData", userData);
  // const name = userData.name;

  // const accessToken = Cookies.get("accessToken");
  // console.log("accessToken", accessToken);

  // useEffect(() => {
  //   if (!accessToken) {
  //     navigate("/login");
  //     return;
  //   }

  //   getCurrentUser(accessToken)
  //     .then((res) => {
  //       console.log("getCurrentUser", res);
  //       dispatch(login(res?.data?.data));
  //     })
  //     .catch((error) => {
  //       if (error.response && error.response.status === 403) {
  //         navigate("/login");
  //       }
  //       console.log(error);
  //     });
  // }, [dispatch, accessToken]);

  // useEffect(() => {
  //   if (userData) {
  //     setIsLoading(false);
  //   }
  // }, [userData]);

  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <AiOutlineLoading3Quarters className="loading-icon" />
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <Grid item xs={12} md={7} lg={7}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 450,
                boxShadow: "2px 4px 6px rgba(128, 128, 128, 0.5)",
                marginTop: "10px",
              }}
            >
              <CommonInformation />
            </Paper>
          </Grid>

          <Grid item xs={12} md={5} lg={5}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 450,
                boxShadow: "2px 4px 6px rgba(128, 128, 128, 0.5)",
                marginTop: "10px",
              }}
            >
              <PaymentTracking />
            </Paper>
          </Grid>
          <Grid item xs={12} md={7} lg={7}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 450,
                boxShadow: "2px 4px 6px rgba(128, 128, 128, 0.5)",
              }}
            >
              <BarChartDisplay />
            </Paper>
          </Grid>

          <Grid item xs={12} md={5} lg={5}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 450,
                boxShadow: "2px 4px 6px rgba(128, 128, 128, 0.5)",
              }}
            >
              <ProblemInfomation />
            </Paper>
          </Grid>
        </>
      )}
    </>
  );
}
