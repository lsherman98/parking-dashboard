import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchPermitData } from "@/services/api/permitsApi";
import exp from "constants";

export const fetchPermitDataThunk = createAsyncThunk("permits/fetchData", async (_, { getState }) => {
  const state = getState() as RootState;
  const { locationFilter, statusFilter } = state.permits;
  return await fetchPermitData({
    location: locationFilter,
    statuses: statusFilter
  });
});

interface PermitsState {
  locationFilter: string[];
  statusFilter: string[];
  data: {
    tableData: any[];
    stats: any;
  };
  loading: boolean;
  error: string | null;
}

const initialState: PermitsState = {
  locationFilter: [],
  statusFilter: [],
  data: {
    tableData: [],
    stats: {
      activePermits: 0,
      requestedPermits: 0,
      expiredPermits: 0,
    }
  },
  loading: false,
  error: null,
};

export const permitsSlice = createSlice({
  name: "permits",
  initialState,
  reducers: {
    setLocationFilter: (state, action: PayloadAction<string[]>) => {
      state.locationFilter = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string[]>) => {
      state.statusFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermitDataThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPermitDataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPermitDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export const { setLocationFilter, setStatusFilter } = permitsSlice.actions;

export default permitsSlice.reducer;
