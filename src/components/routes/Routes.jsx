import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ProtectedAdminRoute, ProtectedLoginRoute, ProtectedLogoutRoute} from '../auth/protectedRoutes'

import Home from '../pages/Home';
import About from '../pages/About'
import Login from '../pages/Login';
import Register from '../pages/Register'
import Forgetpassword from '../pages/Forgetpassword'
import Resetpassword from '../pages/Resetpassword';
import Users from '../pages/Users';
import Blogs from '../pages/Blogs';
import BlogDetail from '../pages/BlogDetail';
import Error from '../pages/Error'
  
const Routes = () => {

const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {path: "/users",element: <ProtectedAdminRoute><Users /></ProtectedAdminRoute>},
        {path: "/about",element: <About />},
        {path: "/blogs",element: <Blogs />},
        {path: "/myblogs",element: <ProtectedAdminRoute><Blogs /></ProtectedAdminRoute>},
        {path: "/blogDetail/:id",element: <ProtectedLoginRoute><BlogDetail /></ProtectedLoginRoute>},
        {path: "/login",element: <ProtectedLogoutRoute><Login /></ProtectedLogoutRoute>},
        {path: "/register",element: <ProtectedLogoutRoute><Register /></ProtectedLogoutRoute>},
        {path: "/forgetpassword/:id/:token",element: <ProtectedLogoutRoute><Forgetpassword /></ProtectedLogoutRoute>},
        {path: "/resetpassword",element: <Resetpassword />},        
        {path: "*",element: <Error />},        
      ],
    },
  ]);
  
    return (
        <RouterProvider router={router} />
    )

}

export default Routes