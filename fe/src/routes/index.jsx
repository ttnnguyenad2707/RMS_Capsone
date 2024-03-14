import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import SignUp from "../pages/Auth/SignUp";
import Login from "../pages/Auth/Login";
import ToolbarHeader from "../CommonComponents/ToolbarHeader";
import HousePage from "../pages/Houses/HousePage";
import Profile from "../pages/Profiles/Profile";
import RoomsPage from "../pages/Rooms/RoomsPage";
import RenterProblem from "../pages/ProblemsReport/RenterProblem";
import News from "../pages/News/News";
import BillSuccess from "../pages/Bill/BillSuccess";
export const appRoutes = createBrowserRouter([
  {
    path: "",
    element: <ToolbarHeader />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },

      {
        path: "/Profile",
        element: <Profile />,
      },
      {
        path: "/house",
        element: <HousePage />,
      },
      {
        path: "/rooms",
        element: <RoomsPage />,
      },
      {
        path: "/problems",
        element: <RenterProblem />,
      },
      {
        path: "/new",
        element: <News />,
      },
      {
        path: "/bill/:billId",
        element: <BillSuccess/>
      }
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
]);
