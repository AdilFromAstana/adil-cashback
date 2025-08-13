import React, { memo } from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/Header";
import type { AppRoute } from "../routesConfig";

const MainLayout: React.FC<{ routes: AppRoute[] }> = memo(({ routes }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Header routes={routes} />
      <Outlet />
    </div>
  );
});

export default MainLayout;
