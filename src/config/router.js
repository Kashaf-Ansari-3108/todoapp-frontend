import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import TodoApp from "../pages/TodoApp";
import Signup from "../pages/Signup";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Todo",
    element: <TodoApp />,
  },
  {
    path: "/CreateAccount",
    element: <Signup />,
  },
]);
export default router;