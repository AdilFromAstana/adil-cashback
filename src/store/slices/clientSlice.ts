import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Transaction, Wallet } from "../../types";

export type Role = "customer" | "admin" | "cashier";

interface User {
  id: number;
  name: string | null;
  email: string;
  phone: string | null;
  isActive: boolean;
  registrationType: "self" | "shop";
  invitedByShopId?: number | null;
  confirmationToken?: string | null;
}

interface ClientState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  wallet: Wallet | null;
  transactions: Transaction[];
  roles: string[];
}

const initialState: ClientState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  wallet: null,
  transactions: [],
  roles: [],
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    clientLogin: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        roles: Role[];
      }>
    ) => {
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("lastEnterAs", "customer");
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.roles = action.payload.roles;
    },
    clientLogout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.wallet = null;
      state.transactions = [];
      state.roles = [];
      localStorage.removeItem("accessToken");
    },
    clientTransactions: (state, action: PayloadAction<Transaction[]>) => {
      console.log(action.payload);
      state.transactions = action.payload;
    },
  },
});

export const { clientLogin, clientLogout, clientTransactions } =
  clientSlice.actions;
export default clientSlice.reducer;
