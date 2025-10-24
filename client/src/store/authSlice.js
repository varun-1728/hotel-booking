// store/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginApi,
  refreshApi,
  logoutApi,
  registerApi,
} from "../api/authApi.js";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Attempt to log in
      const res = await loginApi(email, password);
      return res.access;
    } catch (err) {
      // Check if the error is due to the user not existing
      if (err.response && err.response.status === 404) {
        try {
          // User not found, so attempt to register them
          await registerApi(email, password);

          // After successful registration, perform the login again
          const res = await loginApi(email, password);
          return res.access;
        } catch (registerErr) {
          // If registration fails, reject the thunk with the error
          return rejectWithValue(registerErr.response.data);
        }
      }
      // If the initial login fails for another reason (e.g., wrong password, 401), reject
      return rejectWithValue(err.response.data);
    }
  }
);

export const refresh = createAsyncThunk("auth/refresh", async () => {
  const res = await refreshApi();
  return res.access;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutApi();
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState: { access: null, status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(refresh.pending, (state) => {
        state.status = "loading";
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.access = action.payload;
        state.status = "succeeded";
      })
      .addCase(refresh.rejected, (state) => {
        state.access = null;
        state.status = "failed";
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.access = action.payload;
        state.status = "succeeded";
      })
      .addCase(login.rejected, (state) => {
        state.access = null;
        state.status = "failed";
      })
      .addCase(logout.fulfilled, (state) => {
        state.access = null;
        state.status = "idle";
      });
  },
});

export default authSlice.reducer;
