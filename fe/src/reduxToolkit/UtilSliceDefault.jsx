import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetUtilities } from "../services/houses";

// Action async gọi API để lấy danh sách nhà
export const fetchDefaultUtil = createAsyncThunk(
  "defaultutils/fetchUtil",
  async () => {
    const response = await GetUtilities();
    console.log(response,"response");
    return response.data.data;
  }
);
const defaultutilSlice = createSlice({
  name: "defaultutils",
  initialState: {
    defaultutils: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDefaultUtil.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDefaultUtil.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.defaultutils = action.payload;
      })
      .addCase(fetchDefaultUtil.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default defaultutilSlice.reducer;
