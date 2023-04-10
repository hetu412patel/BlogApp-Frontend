import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Home from '../pages/Home';
import About from '../pages/About'
import Login from '../pages/Login';
import Register from '../pages/Register'
import Forgetpassword from '../pages/Forgetpassword'
import Users from '../pages/Users';
import Blogs from '../pages/Blogs';
import Myblogs from '../pages/Myblogs';
import BlogDetail from '../pages/BlogDetail';
  
const Routes = () => {

const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {path: "/users",element: <Users />},
        {path: "/about",element: <About />},
        {path: "/blogs",element: <Blogs />},
        {path: "/myblogs",element: <Myblogs />},
        {path: "/blogDetail/:id",element: <BlogDetail />},
        {path: "/login",element: <Login />},
        {path: "/register",element: <Register />},
        {path: "/forgetpassword",element: <Forgetpassword />}
      ],
    },
  ]);
  
    return (
        <RouterProvider router={router} />
    )

}

export default Routes