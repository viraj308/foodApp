import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from "./components/ContextReducer";
import Cart from "./components/Cart";
import MyOrder from "./pages/MyOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "cart",
    element: <Cart />,
  },
  {
    path: "myorder",
    element: <MyOrder />,
  },
]);

export default function App() {
  return (
    <>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </>
  );
}
