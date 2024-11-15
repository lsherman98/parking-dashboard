import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLocationData } from "@/services/api/locationsApi";
import { RootState } from "../store";

export const fetchLocationDataThunk = createAsyncThunk("locations/fetchData", async (_, { getState }) => {
  const state = getState() as RootState;
  const { statusFilter } = state.locations;
  return await fetchLocationData({
    statuses: statusFilter,
  });
});

interface LocationsState {
  statusFilter: string[];
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: LocationsState = {
  statusFilter: [],
  data: null,
  loading: false,
  error: null,
};

export const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationDataThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocationDataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLocationDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export const { setStatusFilter } = locationsSlice.actions;

export default locationsSlice.reducer;
