import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/tasksSlice";
import filtersReducer from "./slices/filtersSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: { tasks: tasksReducer, filter: filtersReducer, auth: authReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
