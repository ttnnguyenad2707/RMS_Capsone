import { RouterProvider } from 'react-router-dom'
import SignUp from './pages/Auth/SignUp'
import Dashboard from './pages/Dashboard/Dashboard'
import {createBrowserRouter} from 'react-router-dom'

function App() {
  const appRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />
    },
    {
      path: "/register",
      element: <SignUp />
    }
  ])
  return (
      <RouterProvider router={appRoutes}/>
  )
}

export default App
