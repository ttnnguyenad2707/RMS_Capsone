import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetRooms, AddRoomsFileService, AddRoom } from "../services/houses";
// Action async gọi API để lấy danh sách nhà
export const fetchRooms = createAsyncThunk(
  "rooms/fetchRooms",
  async ({ houseId }) => {
    const response = await GetRooms(houseId);
    return response.data.data;
  }
);
// Action async gọi API để thêm nhà mới
// export const addHouse = createAsyncThunk('rooms/addRooms', async (data) => {
//   const addedHouse = await AddHouseService(data);
//   return addedHouse.data.data;
// });
export const addRooms = createAsyncThunk("rooms/addRooms", async ({ data }) => {
  await AddRoomsFileService({ data });
});

export const addOneRoom = createAsyncThunk(
  "rooms/addOneRoom",
  async ({ setData, houseId }) => {
    const add = await AddRoom(setData, houseId);
    console.log(add, "add");
  }
);
const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addRooms.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addRooms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addRooms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addOneRoom.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addOneRoom.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addOneRoom.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    //   .addCase(updateHouse.fulfilled, (state, action) => {
    //     const updatedHouse = action.payload;
    //     const index = state.houses.findIndex((house) => house.id === updatedHouse.id);
    //     if (index !== -1) {
    //       state.houses[index] = updatedHouse;
    //       state.status = 'succeeded';
    //     }
    //   })
    //   .addCase(updateHouse.pending, (state) => {
    //     state.status = 'loading';
    //   })
    //   .addCase(updateHouse.rejected, (state, action) => {
    //     state.status = 'failed';
    //     state.error = action.error.message;
    //   })
    //   .addCase(deleteHouse.fulfilled, (state, action) => {
    //     const deletedHouseId = action.payload;
    //     state.houses = state.houses.filter((house) => house.id !== deletedHouseId);
    //   })
    //   .addCase(deleteHouse.pending, (state) => {
    //     state.status = 'loading';
    //   })
    //   .addCase(deleteHouse.rejected, (state, action) => {
    //     state.status = 'failed';
    //     state.error = action.error.message;
    //   })
  },
});

export default roomSlice.reducer;
