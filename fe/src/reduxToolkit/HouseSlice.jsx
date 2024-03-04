import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  AddHouseService,
  UpdateHouseService,
  GetHouseService,
  DeleteHouseService,
} from '../services/houses';
// Action async gọi API để lấy danh sách nhà
export const fetchHouses = createAsyncThunk('houses/fetchHouses', async (page, limit) => {
  const response = await GetHouseService(page, limit);
  return response.data.data.houses;
});
// Action async gọi API để thêm nhà mới
export const addHouse = createAsyncThunk('houses/addHouse', async (data) => {
  const addedHouse = await AddHouseService(data);
  return addedHouse.data.data;
});

// Action async gọi API để cập nhật thông tin nhà
export const updateHouse = createAsyncThunk('houses/updateHouse', async ({setData,id}) => {
  const updatedHouse = await UpdateHouseService(setData,id);
  return updatedHouse.data.data;
});

// Action async gọi API để xóa nhà
export const deleteHouse = createAsyncThunk('houses/deleteHouse', async ({id}) => {
  await DeleteHouseService(id);
  return id;
});

const houseSlice = createSlice({
  name: 'houses',
  initialState: {
    houses: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHouses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHouses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.houses = action.payload;
      })
      .addCase(fetchHouses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addHouse.fulfilled, (state, action) => {
        state.houses.unshift(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addHouse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addHouse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateHouse.fulfilled, (state, action) => {
        const updatedHouse = action.payload;
        const index = state.houses.findIndex((house) => house.id === updatedHouse.id);
        if (index !== -1) {
          state.houses[index] = updatedHouse;
          state.status = 'succeeded';
        }
      })
      .addCase(updateHouse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateHouse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteHouse.fulfilled, (state, action) => {
        const deletedHouseId = action.payload;
        state.houses = state.houses.filter((house) => house.id !== deletedHouseId);
      })
      .addCase(deleteHouse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteHouse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export default houseSlice.reducer;