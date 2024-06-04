import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import './App.css'

import App from './App'
import Login from './Login'
import ErrorPage from './ErrorPage'

import { AuthContext } from './authContext'

function Layout() {
  return (
    <>
      {/* <Header /> */}
      <div id='page-content'>
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/login',
        element: <Login />
      },
      
    ]
  }
])

const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState('')
  
  const auth = {
    accessToken,
    setAccessToken
  }

  return (
    <AuthContext.Provider value={{ auth }}>
      {children}
    </AuthContext.Provider>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
