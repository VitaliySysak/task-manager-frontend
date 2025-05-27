import {
  createUserTask,
  deleteUserTask,
  deleteCompletedUserTasks,
  getUserTasks,
  updateUserTask,
} from "@/src/services/tasks";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { applyFilter } from "./utils/task-filter";
import { FilterType, TasksState } from "@/@types/filter";

const initialState: TasksState = { allTasks: [], tasks: [], isLoading: false, activeFilter: FilterType.ALL };

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setAll: (state) => {
      state.activeFilter = FilterType.ALL;
      state.tasks = applyFilter(state.allTasks, FilterType.ALL);
    },
    setActive: (state) => {
      state.activeFilter = FilterType.ACTIVE;
      state.tasks = applyFilter(state.allTasks, FilterType.ACTIVE);
    },
    setCompleted: (state) => {
      state.activeFilter = FilterType.COMPLETED;
      state.tasks = applyFilter(state.allTasks, FilterType.COMPLETED);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allTasks = action.payload;
        state.tasks = action.payload;
      })
      .addCase(getUserTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserTasks.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createUserTask.fulfilled, (state, action) => {
        state.allTasks.push(action.payload);
        state.tasks = applyFilter(state.allTasks, state.activeFilter);
      })
      .addCase(createUserTask.rejected, (state, action) => {
        console.error("Error while execution tasks/createUserTask:", action.error);
      })
      .addCase(updateUserTask.fulfilled, (state, action) => {
        state.allTasks  = state.allTasks .map((task) => (task.id === action.payload.id ? action.payload : task));
        state.tasks = applyFilter(state.allTasks, state.activeFilter);
      })
      .addCase(updateUserTask.rejected, (state, action) => {
        console.error("Error while execution tasks/updateUserTask:", action.error);
      })
      .addCase(deleteUserTask.fulfilled, (state, action) => {
        state.allTasks  = state.allTasks .filter((task) => task.id !== action.payload.id);
        state.tasks = applyFilter(state.allTasks, state.activeFilter);
      })
      .addCase(deleteUserTask.rejected, (state, action) => {
        console.error("Error while execution tasks/deleteUserTask:", action.error);
      })
      .addCase(deleteCompletedUserTasks.fulfilled, (state, action) => {
        state.allTasks = state.allTasks.filter(({ id }) => !action.payload.ids.includes(id));
      })
      .addCase(deleteCompletedUserTasks.rejected, (state, action) => {
        console.error("Error while execution tasks/deleteCompletedUserTasks:", action.error);
      });
  },
});

export const { setAll, setActive, setCompleted } = tasksSlice.actions;
export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectIsTasksLoading = (state: RootState) => state.tasks.isLoading;
export const selectActiveFilter = (state: RootState) => state.tasks.activeFilter;

const tasksReducer = tasksSlice.reducer;
export default tasksReducer;
