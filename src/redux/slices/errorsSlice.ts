import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AppError {
  message: string;
  statusCode: number;
}

const initialState = <AppError[]>[];

const errorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    setError: (state, action) => {
      return action.payload;
    },
    clearError: () => {
      return initialState;
    },
  },
});

export const { setError, clearError } = errorsSlice.actions;

export const selectErrors = (state: RootState) => state.errors;

const errorsReducer = errorsSlice.reducer;
export default errorsReducer;
