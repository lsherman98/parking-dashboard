import { PeriodFilter } from "@/types";
import { DateRange } from "react-day-picker";

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

export type DashboardChartProps = {
  selectedWeek: string;
  selectedMonth: string;
  selectedYear: string;
  selectedRange: DateRange | undefined;
  period: PeriodFilter;
};

export type RecentTransaction = {
  licensePlate: string;
  amount: number;
  duration: string;
  date: string;
  time: string;
  location: string;
};