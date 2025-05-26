import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/tasksSlice";
import filtersReducer from "./slices/filtersSlice";
import { error } from "console";
import errorsReducer from "./slices/errorsSlice";

export const store = configureStore({
  reducer: { tasks: tasksReducer, filter: filtersReducer, errors: errorsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
