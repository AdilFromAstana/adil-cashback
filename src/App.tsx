import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  guestRoutesWithRedirect,
  cashierRoutesWithRedirect,
  customerRoutesWithRedirect,
} from "./routesConfig";
import MainLayout from "./layouts/MainLayout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clientLogin } from "./store/slices/clientSlice";
import { employeeLogin } from "./store/slices/employeeSlice";
import type { RootState } from "./store/store";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { user: client } = useSelector((state: RootState) => state.client);
  const { user: employee } = useSelector((state: RootState) => state.employee);
  const user = client || employee;
  const accessToken = localStorage.getItem("accessToken");
  const lastEnterAs = localStorage.getItem("lastEnterAs") || "customer";
  const [loading, setLoading] = useState(true);
  console.log("loading: ", loading);

  const routes = useMemo(
    () =>
      user
        ? client
          ? customerRoutesWithRedirect
          : cashierRoutesWithRedirect
        : guestRoutesWithRedirect,
    [user, client]
  );

  useEffect(() => {
    if (accessToken) {
      axios
        .post("https://d10271f8f0e4.ngrok-free.app/auth/refresh", {
          accessToken,
          lastEnterAs,
        })
        .then((res) => {
          if (res.data.roles.includes("customer")) {
            dispatch(clientLogin(res.data));
          } else if (res.data.roles.includes("cashier")) {
            dispatch(employeeLogin(res.data));
          }
        })
        .catch(() => {
          localStorage.removeItem("accessToken");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <Suspense fallback="Загрузка">
      <Routes>
        <Route element={<MainLayout routes={routes} />}>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
