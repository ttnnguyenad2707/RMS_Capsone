import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import SignUp from "../pages/Auth/SignUp";
import Login from "../pages/Auth/Login";
import HousePage from "../pages/Rooms/HousePage";
export const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/house",
    element: <HousePage />,
  },
]);
