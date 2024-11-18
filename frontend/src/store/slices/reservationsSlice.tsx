import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PeriodFilter } from "@/types";
import { RootState } from "../store";
import { currentMonth, currentWeek, currentYear } from "@/data";
import { fetchReservationData } from "@/services/api/reservationsApi";

export const fetchReservationDataThunk = createAsyncThunk("reservations/fetchData", async (_, { getState }) => {
  const state = getState() as RootState;
  const { locationFilter, weekFilter, monthFilter, yearFilter, rangeFilter, periodFilter, statusFilter } = state.reservations;
  return await fetchReservationData({
    location: locationFilter,
    week: weekFilter,
    month: monthFilter,
    year: yearFilter,
    dateRange: rangeFilter,
    period: periodFilter,
    statuses: statusFilter,
  });
});

interface ReservationsState {
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

const initialState: ReservationsState = {
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
      reservationsCount: 0,
      occupancy: 0,
      reservationCountChange: 0,
      occupancyChange: 0,
    },
  },
  loading: false,
  error: null,
};

export interface SerializableDateRange {
  from?: string;
  to?: string;
}

export const reservationsSlice = createSlice({
  name: "reservations",
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
      .addCase(fetchReservationDataThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReservationDataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchReservationDataThunk.rejected, (state, action) => {
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
} = reservationsSlice.actions;

export default reservationsSlice.reducer;
