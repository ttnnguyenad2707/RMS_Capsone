
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  GetUtilitiesOther,
  AddOrtherUtilService
} from '../services/houses';


// Action async gọi API để lấy danh sách nhà
export const fetchOrtherUtil = createAsyncThunk('otherutils/fetchOrtherUtil', async () => {
    const response = await GetUtilitiesOther();
    return response.data.data;
  });

  export const addOrtherUtil = createAsyncThunk('otherutils/addOrtherUtil', async ({data}) => {
    const response = await AddOrtherUtilService(data);
    return response.data.data;
  });
const utilSlice = createSlice({
  name: "otherutils",
  initialState: {
    otherutils: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrtherUtil.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrtherUtil.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.otherutils = action.payload;
      })
      .addCase(fetchOrtherUtil.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addOrtherUtil.fulfilled, (state, action) => {
        state.otherutils.unshift(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addOrtherUtil.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addOrtherUtil.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export default utilSlice.reducer;
