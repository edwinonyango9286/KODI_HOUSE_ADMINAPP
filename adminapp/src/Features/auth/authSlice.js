import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./authServices";

export const registerPropertyLandlord = createAsyncThunk(
  "auth/user-register",
  async (data, thunkAPI) => {
    try {
      return await authService.registerLandlord(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const activateNewLandlordAccount = createAsyncThunk(
  "auth/activate-landlord-register",
  async (data, thunkAPI) => {
    try {
      return await authService.activateNewLandlord(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  createdUser: {},
  activatedLandlord: {},
  isError: {
    registerPropertyLandlord: false,
    activateNewLandlordAccount: false,
  },
  isLoading: {
    registerPropertyLandlord: false,
    activateNewLandlordAccount: false,
  },
  isSuccess: {
    registerPropertyLandlord: false,
    activateNewLandlordAccount: false,
  },
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerPropertyLandlord.pending, (state) => {
        state.isLoading.registerPropertyLandlord = true;
      })
      .addCase(registerPropertyLandlord.fulfilled, (state, action) => {
        state.isError.registerPropertyLandlord = false;
        state.isLoading.registerPropertyLandlord = false;
        state.isSuccess.registerPropertyLandlord = true;
        state.createdUser = action?.payload;
        state.message = action?.payload?.response?.data?.message;
        const timestamp = new Date().getTime();
        const storedUser = { ...action.payload, timestamp };
        localStorage.setItem("createdUser", JSON.stringify(storedUser));
      })
      .addCase(registerPropertyLandlord.rejected, (state, action) => {
        state.isError.registerPropertyLandlord = true;
        state.isLoading.registerPropertyLandlord = false;
        state.isSuccess.registerPropertyLandlord = false;
        state.message = action?.payload?.response?.data?.message;
      })
      .addCase(activateNewLandlordAccount.pending, (state) => {
        state.isLoading.activateNewLandlordAccount = true;
      })
      .addCase(activateNewLandlordAccount.fulfilled, (state, action) => {
        state.isError.activateNewLandlordAccount = false;
        state.isLoading.activateNewLandlordAccount = false;
        state.isSuccess.activateNewLandlordAccount = true;
        state.activatedLandlord = action?.payload;
        state.message = action?.payload?.response?.data?.message;
      })
      .addCase(activateNewLandlordAccount.rejected, (state, action) => {
        state.isError.activateNewLandlordAccount = true;
        state.isLoading.activateNewLandlordAccount = false;
        state.isSuccess.activateNewLandlordAccount = false;
        state.message = action?.payload?.response?.data?.message;
      })

      .addCase(resetState, () => initialState);
  },
});

export default authSlice.reducer;
