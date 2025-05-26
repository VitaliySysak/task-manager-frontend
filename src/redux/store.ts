import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/tasksSlice";
import filtersReducer from "./slices/filtersSlice";
import errorReducer from "./slices/errorSlice";

export const store = configureStore({
  reducer: { tasks: tasksReducer, filter: filtersReducer, error: errorReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
