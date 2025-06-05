import {
  createUserTask,
  deleteUserTask,
  deleteCompletedUserTasks,
  getUserTasks,
  updateUserTask,
  createUserGoogleEvent,
} from "@/src/store/tasks";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { applyFilter } from "./utils/task-filter";
import { FilterType, TasksState } from "@/@types/filter";

const initialState: TasksState = {
  formData: {
    title: "",
    description: "",
    isCompleted: false,
    isGoogleEvent: false,
    startGoogleEventTime: null,
    endGoogleEventTime: null,
    showDrawer: false,
  },
  allTasks: [],
  tasks: [],
  isLoading: false,
  isTaskLoading: false,
  loadingTaskId: null,
  activeFilter: FilterType.ALL,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTaskTitle: (state, action) => {
      state.formData.title = action.payload;
    },
    setTaskDescription: (state, action) => {
      state.formData.description = action.payload;
    },
    toggleTaskIsCompleted: (state) => {
      state.formData.isCompleted = !state.formData.isCompleted;
    },
    toggleTaskIsGoogleEvent: (state) => {
      state.formData.isGoogleEvent = !state.formData.isGoogleEvent;
    },
    setTaskTimeStart: (state, action) => {
      state.formData.startGoogleEventTime = action.payload;
    },
    setTaskTimeEnd: (state, action) => {
      state.formData.endGoogleEventTime = action.payload;
    },
    setShowTaskDrawer: (state) => {
      state.formData.showDrawer = !state.formData.showDrawer;
    },
    resetTaskForm: (state) => {
      state.formData = initialState.formData;
    },
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
    setTasksloading: (state, action) => {
      state.isLoading = action.payload;
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

      .addCase(createUserTask.pending, (state) => {
        state.isTaskLoading = true;
      })
      .addCase(createUserTask.fulfilled, (state, action) => {
        state.isTaskLoading = false;
        state.allTasks.push(action.payload);
        state.tasks = applyFilter(state.allTasks, state.activeFilter);
      })
      .addCase(createUserTask.rejected, (state, action) => {
        state.isTaskLoading = false;
        console.error("Error while execution tasks/createUserTask:", action.error);
      })

      .addCase(updateUserTask.pending, (state, action) => {
        state.loadingTaskId = action.meta.arg.id;
      })
      .addCase(updateUserTask.fulfilled, (state, action) => {
        state.loadingTaskId = null;
        state.allTasks = state.allTasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
        state.tasks = applyFilter(state.allTasks, state.activeFilter);
      })
      .addCase(updateUserTask.rejected, (state, action) => {
        state.loadingTaskId = null;
        console.error("Error while execution tasks/updateUserTask:", action.error);
      })

      .addCase(deleteUserTask.fulfilled, (state, action) => {
        state.allTasks = state.allTasks.filter((task) => task.id !== action.payload.id);
        state.tasks = applyFilter(state.allTasks, state.activeFilter);
      })
      .addCase(deleteUserTask.rejected, (state, action) => {
        console.error("Error while execution tasks/deleteUserTask:", action.error);
      })

      .addCase(deleteCompletedUserTasks.fulfilled, (state, action) => {
        state.allTasks = state.allTasks.filter(({ id }) => !action.payload.includes(id));
        state.tasks = applyFilter(state.allTasks, state.activeFilter);
      })
      .addCase(deleteCompletedUserTasks.rejected, (state, action) => {
        console.error("Error while execution tasks/deleteCompletedUserTasks:", action.error);
      })

      .addCase(createUserGoogleEvent.pending, (state) => {
        state.isTaskLoading = true;
      })
      .addCase(createUserGoogleEvent.fulfilled, (state, action) => {
        state.isTaskLoading = false;
        state.allTasks.push(action.payload);
        state.tasks = applyFilter(state.allTasks, state.activeFilter);
      })
      .addCase(createUserGoogleEvent.rejected, (state, action) => {
        state.isTaskLoading = false;
        console.error("Error while execution tasks/deleteCompletedUserTasks:", action.error);
      });
  },
});

export const {
  setTaskTitle,
  setTaskDescription,
  toggleTaskIsCompleted,
  toggleTaskIsGoogleEvent,
  setTaskTimeStart,
  setTaskTimeEnd,
  setShowTaskDrawer,
  resetTaskForm,
  setAll,
  setActive,
  setCompleted,
  setTasksloading,
} = tasksSlice.actions;
export const selectTaskForm = (state: RootState) => state.tasks.formData;
export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectIsTasksLoading = (state: RootState) => state.tasks.isLoading;
export const selectActiveFilter = (state: RootState) => state.tasks.activeFilter;
export const selectTaskIdLoading = (state: RootState) => state.tasks.loadingTaskId;
export const selectTaskCreating = (state: RootState) => state.tasks.isTaskLoading;

const tasksReducer = tasksSlice.reducer;
export default tasksReducer;
