import { Task } from "@/@types/user-tasks";
import { createUserTask, deleteUserTask, getUserTasks, updateUserTask } from "@/src/services/tasks";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = { tasks: <Task[]>[], isLoading: false };

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(getUserTasks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserTasks.rejected, (state, action) => {
        state.isLoading = false
        console.error("Error while execution tasks/getUserTasks:", action.error.message);
      })
      .addCase(createUserTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(createUserTask.rejected, (state, action) => {
        console.error("Error while execution tasks/createUserTask:", action.error);
      })
      .addCase(updateUserTask.pending, (state, action) => {
      })
      .addCase(updateUserTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task));
      })
      .addCase(updateUserTask.rejected, (state, action) => {
        console.error("Error while execution tasks/updateUserTask:", action.error);
      })
      .addCase(deleteUserTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
      })
      .addCase(deleteUserTask.rejected, (state, action) => {
        console.error("Error while execution tasks/deleteUserTask:", action.error);
      });
  },
});

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectisTasksLoading = (state: RootState) => state.tasks.isLoading;

const tasksReducer = tasksSlice.reducer;
export default tasksReducer;
