import {createBrowserRouter} from 'react-router-dom'
import Dashboard from '../pages/Dashboard/Dashboard'
import SignUp from '../pages/Auth/SignUp'
export const appRoutes = createBrowserRouter([
    {
        path: '/home',
        element : <Dashboard/>
    },
    {
        path: "/register",
        element : <SignUp/>
    }
])