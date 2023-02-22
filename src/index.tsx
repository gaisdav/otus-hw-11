import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Main } from "./pages/main";
import { Course } from "./pages/course";
import { ClassEntity } from "./pages/class";
import { Login } from "./pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App>
        <Main />
      </App>
    ),
  },
  {
    path: "course/:id",
    element: (
      <App>
        <Course />
      </App>
    ),
  },
  {
    path: "class/:id",
    element: (
      <App>
        <ClassEntity />
      </App>
    ),
  },
  {
    path: "login",
    element: (
      <App>
        <Login />
      </App>
    ),
  },
]);

// @ts-ignore
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
