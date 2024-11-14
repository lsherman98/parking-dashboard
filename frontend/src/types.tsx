import { DateRange } from "react-day-picker";

export type Status = {
  value: string;
  label: string;
  color?: string;
  icon: any;
};

export type PeriodFilter = "week" | "month" | "three_month" | "year" | "range";

export type DashboardToolbarProps = {
  locationFilter: string[];
  setLocationFilter: (value: string[]) => void;
  weekFilter: string;
  setWeekFilter: (value: string) => void;
  monthFilter: string;
  setMonthFilter: (value: string) => void;
  yearFilter: string;
  setYearFilter: (value: string) => void;
  rangeFilter: DateRange | undefined;
  setRangeFilter: (value: DateRange | undefined) => void;
  periodFilter: PeriodFilter;
  setPeriodFilter: (value: PeriodFilter) => void;
};

export type DashboardChartProps = {
  selectedWeek: string;
  selectedMonth: string;
  selectedYear: string;
  selectedRange: DateRange | undefined;
  period: PeriodFilter;
};

export type DailyBookingItem = {
  hour: string;
  bookings: number;
};

export type DailyOccupancyItem = {
  hour: string;
  occupancy: number;
};

export type BookingItem = {
  date: string;
  total: number;
};

export type RevenueItem = {
  date: string;
  total: number;
};

export type RecentTransaction = {
  licensePlate: string;
  amount: number;
  duration: string;
  date: string;
  time: string;
  location: string;
};

