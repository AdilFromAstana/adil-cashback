import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./slices/clientSlice";
import employeeReducer from "./slices/employeeSlice";

export const store = configureStore({
  reducer: {
    client: clientReducer,
    employee: employeeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
