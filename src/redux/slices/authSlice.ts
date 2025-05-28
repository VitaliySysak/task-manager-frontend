import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState {
  accessToken: string | null;
}

const initialState: AuthState = {
  accessToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
    },
  },
});

export const { setAccessToken, clearAccessToken } = authSlice.actions;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;

const authReducer = authSlice.reducer;
export default authReducer;
