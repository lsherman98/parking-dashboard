import { DateRange } from "react-day-picker";
import { SerializableDateRange } from "./store/slices/dashboardSlice";

export type Status = {
  value: string;
  label: string;
  color?: string;
  icon: any;
};

export type PeriodFilter = "week" | "month" | "three_month" | "year" | "range";

export type DashboardToolbarProps = {
  loading: boolean;
  locationFilter: string[];
  periodFilter: PeriodFilter;
  weekFilter: string;
  monthFilter: string;
  yearFilter: string;
  rangeFilter: SerializableDateRange | undefined;
  isMobile: boolean;
  handleLocationChange: (value: string[]) => void;
  handlePeriodChange: (value: PeriodFilter) => void;
  handleWeekChange: (value: string) => void;
  handleMonthChange: (value: string) => void;
  handleYearChange: (value: string) => void;
  handleRangeChange: (value: DateRange | undefined) => void;
};

export type DashboardChartProps = {
  selectedWeek: string;
  selectedMonth: string;
  selectedYear: string;
  selectedRange: SerializableDateRange | undefined;
  period: PeriodFilter;
  data?: any;
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
