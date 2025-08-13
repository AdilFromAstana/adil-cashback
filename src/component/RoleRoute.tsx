// components/RoleRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

interface Props {
  children: React.ReactNode;
  roles: string[];
}

export const RoleRoute: React.FC<Props> = ({ children, roles }) => {
  const { isAuthenticated, role } = useSelector((state: RootState) => {
    const clientAuth = state.client.isAuthenticated;
    const employeeAuth = state.employee.isAuthenticated;
    const userRole = clientAuth
      ? "customer"
      : employeeAuth
      ? (state.employee.user as any).type
      : "guest";
    return {
      isAuthenticated: clientAuth || employeeAuth,
      role: userRole,
    };
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!roles.includes(role)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};
