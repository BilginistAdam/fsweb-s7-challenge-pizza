import React, { ReactNode } from "react";
import { AppHero } from "./AppHero";
import { Outlet } from "react-router-dom";

import "../../App.css";

export const AppLayout = () => {
  return (
    <div className="container">
      <Outlet />
    </div>
  );
};
