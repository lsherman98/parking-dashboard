import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PeriodFilter } from "@/types";
import { RootState } from "../store";
import { currentMonth, currentWeek, currentYear } from "@/data";
import { fetchViolationData } from "@/services/api/violationsApi";

export const fetchViolationDataThunk = createAsyncThunk("violations/fetchData", async (_, { getState }) => {
  const state = getState() as RootState;
  const { locationFilter, weekFilter, monthFilter, yearFilter, rangeFilter, periodFilter, statusFilter } = state.violations;
  return await fetchViolationData({
    location: locationFilter,
    week: weekFilter,
    month: monthFilter,
    year: yearFilter,
    dateRange: rangeFilter,
    period: periodFilter,
    statuses: statusFilter,
  });
});

interface ViolationsState {
  locationFilter: string[];
  weekFilter: string;
  monthFilter: string;
  yearFilter: string;
  rangeFilter: SerializableDateRange | undefined;
  periodFilter: PeriodFilter;
  statusFilter: string[];
  data: {
    tableData: any[];
    stats: any;
  };
  loading: boolean;
  error: string | null;
}

const initialState: ViolationsState = {
  locationFilter: [],
  weekFilter: currentWeek,
  monthFilter: currentMonth,
  yearFilter: currentYear,
  rangeFilter: undefined,
  periodFilter: "month",
  statusFilter: [],
  data: {
    tableData: [],
    stats: {
      violationsCount: 0,
      violationRevenueTotal: 0,
      enforcementCommissionTotal: 0,
      processingFeesTotal: 0,
      violationsCountChange: 0,
      violationRevenueChange: 0,
      enforcementCommissionChange: 0,
      processingFeesChange: 0,
    },
  },
  loading: false,
  error: null,
};

export interface SerializableDateRange {
  from?: string;
  to?: string;
}

export const violationsSlice = createSlice({
  name: "violations",
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
    setStatusFilter: (state, action: PayloadAction<string[]>) => {
      state.statusFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchViolationDataThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchViolationDataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchViolationDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export const {
  setLocationFilter,
  setWeekFilter,
  setMonthFilter,
  setYearFilter,
  setRangeFilter,
  setPeriodFilter,
  setStatusFilter,
} = violationsSlice.actions;

export default violationsSlice.reducer;
