import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./authServices";

export const registerUser = createAsyncThunk(
  "auth/user-register",
  async (data, thunkAPI) => {
    try {
      return await authService.registerNewUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const activateUser = createAsyncThunk(
  "auth/activate-user",
  async (data, thunkAPI) => {
    try {
      return await authService.activateNewUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login-user",
  async (data, thunkAPI) => {
    try {
      return await authService.loginNewUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const requestPasswordResetToken = createAsyncThunk(
  "auth/request-password-reset-token",
  async (email, thunkAPI) => {
    try {
      return await authService.passwordResetToken(email);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (data, thunkAPI) => {
    try {
      return await authService.resetUserPassword(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout-user",
  async (thunkAPI) => {
    try {
      return await authService.logout();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  user: {},
  createdUser: {},
  activatedUser: {},
  isError: {
    registerUser: false,
    activateUser: false,
    loginUser: false,
    requestPasswordResetToken: false,
    resetPassword: false,
    logoutUser: false,
  },
  isLoading: {
    registerUser: false,
    activateUser: false,
    loginUser: false,
    requestPasswordResetToken: false,
    resetPassword: false,
    logoutUser: false,
  },
  isSuccess: {
    registerUser: false,
    activateUser: false,
    loginUser: false,
    requestPasswordResetToken: false,
    resetPassword: false,
    logoutUser: false,
  },
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading.registerUser = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isError.registerUser = false;
        state.isLoading.registerUser = false;
        state.isSuccess.registerUser = true;
        state.createdUser = action?.payload;
        state.message = action?.payload?.response?.data?.message;
        const timestamp = new Date().getTime();
        const storedUser = { ...action.payload, timestamp };
        localStorage.setItem("createdUser", JSON.stringify(storedUser));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isError.registerUser = true;
        state.isLoading.registerUser = false;
        state.isSuccess.registerUser = false;
        if (action?.payload?.response?.data?.message) {
          state.message = action?.payload?.response?.data?.message;
        } else {
          state.message = "Something went wrong. Please try again later.";
        }
      })
      .addCase(activateUser.pending, (state) => {
        state.isLoading.activateUser = true;
      })
      .addCase(activateUser.fulfilled, (state, action) => {
        state.isError.activateUser = false;
        state.isLoading.activateUser = false;
        state.isSuccess.activateUser = true;
        state.activatedUser = action?.payload;
        state.message = action?.payload?.response?.data?.message;
        localStorage.removeItem("createdUser");
      })
      .addCase(activateUser.rejected, (state, action) => {
        state.isError.activateUser = true;
        state.isLoading.activateUser = false;
        state.isSuccess.activateUser = false;
        if (action?.payload?.response?.data?.message) {
          state.message = action?.payload?.response?.data?.message;
        } else {
          state.message = "Something went wrong. Please try again later.";
        }
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading.loginUser = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isError.loginUser = false;
        state.isLoading.loginUser = false;
        state.isSuccess.loginUser = true;
        state.user = action?.payload;
        state.message = action?.payload?.message;
        localStorage.setItem("user", JSON.stringify(action?.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError.loginUser = true;
        state.isLoading.loginUser = false;
        state.isSuccess.loginUser = false;
        if (action?.payload?.response?.data?.message) {
          state.message = action?.payload?.response?.data?.message;
        } else {
          state.message = "Something went wrong. Please try again later.";
        }
      })
      .addCase(requestPasswordResetToken.pending, (state) => {
        state.isLoading.requestPasswordResetToken = true;
      })
      .addCase(requestPasswordResetToken.fulfilled, (state, action) => {
        state.isError.requestPasswordResetToken = false;
        state.isLoading.requestPasswordResetToken = false;
        state.isSuccess.requestPasswordResetToken = true;
        state.message = action?.payload?.message;
        console.log(state.message);
      })
      .addCase(requestPasswordResetToken.rejected, (state, action) => {
        state.isError.requestPasswordResetToken = true;
        state.isLoading.requestPasswordResetToken = false;
        state.isSuccess.requestPasswordResetToken = false;
        if (action?.payload?.response?.data?.message) {
          state.message = action?.payload?.response?.data?.message;
        } else {
          state.message = "Something went wrong. Please try again later.";
        }
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading.resetPassword = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isError.resetPassword = false;
        state.isLoading.resetPassword = false;
        state.isSuccess.resetPassword = true;
        state.message = action?.payload?.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isError.resetPassword = true;
        state.isLoading.resetPassword = false;
        state.isSuccess.resetPassword = false;
        if (action?.payload?.response?.data?.message) {
          state.message = action?.payload?.response?.data?.message;
        } else {
          state.message = "Something went wrong. Please try again later.";
        }
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading.logoutUser = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isError.logoutUser = false;
        state.isLoading.logoutUser = false;
        state.isSuccess.logoutUser = true;
        state.message = action?.payload?.message;
        localStorage.removeItem("user");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isError.logoutUser = true;
        state.isLoading.logoutUser = false;
        state.isSuccess.logoutUser = false;
        if (action?.payload?.response?.data?.message) {
          state.message = action?.payload?.response?.data?.message;
        } else {
          state.message = "Something went wrong. Please try again later.";
        }
      })
      .addCase(resetState, () => initialState);
  },
});

export default authSlice.reducer;
