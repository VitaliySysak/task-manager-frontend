import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/src/store/redux/store";
import { loginUser, registerUser, refreshToken } from "@/src/store/auth";

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
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        console.error("Error while execution auth/register:", action.error);
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        console.error("Error while execution auth/login:", action.error);
      })
      .addCase(loginUser.pending, (state) => {
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
      })
  },
});

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectAuthLoading = (state: RootState) => state.auth.loading;

const authReducer = authSlice.reducer;
export default authReducer;
