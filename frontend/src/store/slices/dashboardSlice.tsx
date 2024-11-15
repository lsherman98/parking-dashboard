import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PeriodFilter } from "@/types";
import { RootState } from "../store";
import { fetchDashboardData } from "@/services/api/dashboardApi";
import { currentMonth, currentWeek, currentYear } from "@/data";

export const fetchDashboardDataThunk = createAsyncThunk("dashboard/fetchData", async (_, { getState }) => {
  const state = getState() as RootState;
  const { locationFilter, weekFilter, monthFilter, yearFilter, rangeFilter, periodFilter } = state.dashboard;
  return await fetchDashboardData({
    location: locationFilter,
    week: weekFilter,
    month: monthFilter,
    year: yearFilter,
    dateRange: rangeFilter,
    period: periodFilter,
  });
});

interface DashboardState {
  locationFilter: string[];
  weekFilter: string;
  monthFilter: string;
  yearFilter: string;
  rangeFilter: SerializableDateRange | undefined;
  periodFilter: PeriodFilter;
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  locationFilter: [],
  weekFilter: currentWeek,
  monthFilter: currentMonth,
  yearFilter: currentYear,
  rangeFilter: undefined,
  periodFilter: "month",
  data: null,
  loading: false,
  error: null,
};

export interface SerializableDateRange {
  from?: string;
  to?: string;
}

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setLocationFilter: (state, action: PayloadAction<string[]>) => {
      state.locationFilter = action.payload;
    },
    setWeekFilter: (state, action: PayloadAction<string>) => {
      state.weekFilter = action.payload;
    },
    setMonthFilter: (state, action: PayloadAction<string>) => {
      state.monthFilter = action.payload;
    },
    setYearFilter: (state, action: PayloadAction<string>) => {
      state.yearFilter = action.payload;
    },
    setRangeFilter: (state, action: PayloadAction<SerializableDateRange | undefined>) => {
      state.rangeFilter = action.payload;
    },
    setPeriodFilter: (state, action: PayloadAction<PeriodFilter>) => {
      state.periodFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardDataThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardDataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboardDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export const { setLocationFilter, setWeekFilter, setMonthFilter, setYearFilter, setRangeFilter, setPeriodFilter } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
