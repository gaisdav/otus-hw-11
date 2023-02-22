import React, { FC, PropsWithChildren } from "react";
import { CssBaseline } from "@mui/material";
import "./App.css";
import { Link, useLocation } from "react-router-dom";

const App: FC<PropsWithChildren> = ({ children }) => {
  let location = useLocation();

  return (
    <div className="app-wrapper">
      <CssBaseline />

      {location.pathname !== "/login" && location.pathname !== "/" && (
        <Link to="/">На главную</Link>
      )}

      {children}
    </div>
  );
};

export default App;
