import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { GlobalContextProvider } from './context'
import App from './App.tsx'
import LoginPage from './pages/login.tsx'
import AccountPage from './pages/account.tsx'
import './index.css'
import { getAuth } from "firebase/auth"

import { firebaseApp, firebaseAuth } from './adapters/firebase'
// TODO: call this methods other way
console.log(firebaseApp, firebaseAuth)

export const PrivateRoute = ({ element }) => {
  const auth = getAuth()
  if (auth.currentUser === null) {
    return <Navigate to="/login" />;
  }
  return element;
};

export const LoginRoute = ({ element }) => {
  const auth = getAuth()
  if (auth.currentUser !== null) {
    return <Navigate to="/" />;
  }
  return element;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute element={<App />} />,
  },
  {
    path: '/account',
    element: <PrivateRoute element={<AccountPage />} />,
  },
  {
    path: '/login',
    element: <LoginRoute element={<LoginPage />} />,
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <RouterProvider router={router} />
    </GlobalContextProvider>
  </React.StrictMode>,
)
