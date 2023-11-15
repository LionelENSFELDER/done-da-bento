import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { GlobalContextProvider } from './context'
import { GlobalContext } from './context'
import App from './App.tsx'
import LoginPage from './pages/login.tsx'
import './index.css'

export const PrivateRoute = ({ element }) => {
  const { userLogged } = useContext(GlobalContext);

  if (typeof userLogged === 'string') {
    return <Navigate to="/login" />;
  }

  return element;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute element={<App />} />,
  },
  {
    path: '/login',
    element: <LoginPage />
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <RouterProvider router={router} />
    </GlobalContextProvider>
  </React.StrictMode>,
)
