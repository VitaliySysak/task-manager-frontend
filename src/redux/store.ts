import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/tasksSlice";
import filtersReducer from "./slices/filtersSlice";

export const store = configureStore({
  reducer: { tasks: tasksReducer, filter: filtersReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
