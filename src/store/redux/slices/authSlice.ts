import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/src/store/redux/store";
import { loginUser, registerUser, refreshToken, calendarRefreshToken, calendarUserLogin } from "@/src/store/auth";

interface AuthState {
  isLoggedIn: boolean;
  loading: boolean;
  accessToken: string | null;
  googleAccessToken: string | null;
}

const initialState: AuthState = {
  isLoggedIn: true,
  loading: false,
  accessToken: null,
  googleAccessToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
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

      .addCase(calendarUserLogin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(calendarUserLogin.rejected, (state, action) => {
        state.loading = false;
        console.error("Error while execution auth/calendarUserLogin:", action.error);
      })
      .addCase(calendarUserLogin.pending, (state) => {
        state.loading = true;
      })

      .addCase(calendarRefreshToken.fulfilled, (state, action) => {
        state.googleAccessToken = action.payload;
        state.loading = false;
      })
      .addCase(calendarRefreshToken.rejected, (state, action) => {
        state.loading = false;
        console.error("Error while execution auth/calendarRefreshToken:", action.error);
      })
      .addCase(calendarRefreshToken.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { setIsLoggedIn } = authSlice.actions;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectGoogleAccessToken = (state: RootState) => state.auth.googleAccessToken;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

const authReducer = authSlice.reducer;
export default authReducer;
