import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = "";

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action) => {
      return action.payload;
    },
  },
});

export const { setError } = errorSlice.actions;
export const selectErrorMessage = (state: RootState) => state.error;

const errorReducer = errorSlice.reducer;
export default errorReducer;
