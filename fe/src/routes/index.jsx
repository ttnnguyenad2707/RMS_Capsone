import {createBrowserRouter} from 'react-router-dom'
import Dashboard from '../pages/Dashboard/Dashboard'
import SignUp from '../pages/Auth/SignUp'
import Login from '../pages/Auth/Login'
import ToolbarHeader from '../CommonComponents/ToolbarHeader'
import HousePage from '../pages/Houses/HousePage'
import Profile from '../pages/Profiles/Profile'
export const appRoutes = createBrowserRouter([
    {
        path: '',
        element: <ToolbarHeader />,
       children :[
        {
            path: '/',
            element: <Dashboard />
        },
        
        {
            path: '/Profile',
            element: <Profile />
        },

       ]
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
