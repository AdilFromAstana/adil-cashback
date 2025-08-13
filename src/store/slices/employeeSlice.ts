import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Employee } from "../../types";

interface EmployeeState {
  user: Employee | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  roles: string[];
}

const initialState: EmployeeState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  roles: [],
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    employeeLogin: (
      state,
      action: PayloadAction<{
        user: Employee;
        accessToken: string;
        roles: string[];
      }>
    ) => {
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("lastEnterAs", "employee");
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.roles = action.payload.roles;
    },
    employeeLogout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.roles = [];
      localStorage.removeItem("accessToken");
    },
  },
});

export const { employeeLogin, employeeLogout } = employeeSlice.actions;
export default employeeSlice.reducer;
