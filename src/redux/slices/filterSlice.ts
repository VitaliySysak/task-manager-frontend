import { TaskStatus } from "@/@types/user-tasks";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  title: "",
  description: "",
  status: TaskStatus.TODO,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { setTitleFilter } = filterSlice.actions;
export const selectTitleFilter = (state: RootState) => state.filter.title;

const filterReducer = filterSlice.reducer;
export default filterReducer;
