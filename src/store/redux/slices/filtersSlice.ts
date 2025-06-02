import { TaskStatus } from "@/@types/user-tasks";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  title: "",
  description: "",
  status: TaskStatus.TODO,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { setTitleFilter } = filtersSlice.actions;
export const selectTitleFilter = (state: RootState) => state.filter.title;

const filtersReducer = filtersSlice.reducer;
export default filtersReducer;
