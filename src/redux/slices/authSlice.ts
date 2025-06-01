import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { login, refreshToken, register } from "@/src/services/users";

interface AuthState {
  loading: boolean;
  accessToken: string | null;
}

const initialState: AuthState = {
  loading: false,
  accessToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        console.error("Error while execution auth/register:", action.error);
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        console.error("Error while execution auth/login:", action.error);
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })

      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        console.error("Error while execution auth/refreshToken:", action.error);
      })
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
      });
  },
});

export const selectAccessToken = (state: RootState) => state.auth.accessToken;

const authReducer = authSlice.reducer;
export default authReducer;
