import { BookingItem, DailyBookingItem, DailyOccupancyItem, RecentTransaction, RevenueItem } from "./types";

export const dailyBookingsChartData: DailyBookingItem[] = [
  { hour: "06:00", bookings: 3 },
  { hour: "09:00", bookings: 5 },
  { hour: "12:00", bookings: 12 },
  { hour: "15:00", bookings: 14 },
  { hour: "18:00", bookings: 10 },
  { hour: "21:00", bookings: 8 },
];

export const dailyOccupancyChartData: DailyOccupancyItem[] = [
  { hour: "06:00", occupancy: 20 },
  { hour: "09:00", occupancy: 25 },
  { hour: "12:00", occupancy: 40 },
  { hour: "15:00", occupancy: 60 },
  { hour: "18:00", occupancy: 40 },
  { hour: "21:00", occupancy: 20 },
];

export const bookingsChartData: BookingItem[] = [
  { date: "2024-11-01", total: 12 },
  { date: "2024-11-02", total: 16 },
  { date: "2024-11-03", total: 14 },
  { date: "2024-11-04", total: 18 },
  { date: "2024-11-05", total: 20 },
  { date: "2024-11-06", total: 22 },
  { date: "2024-11-07", total: 26 },
];

export const revenueChartData: RevenueItem[] = [
  { date: "2024-11-01", total: 150 },
  { date: "2024-11-02", total: 240 },
  { date: "2024-11-03", total: 121 },
  { date: "2024-11-04", total: 260 },
  { date: "2024-11-05", total: 290 },
  { date: "2024-11-06", total: 340 },
  { date: "2024-11-07", total: 220 },
];

export const recentTransactions: RecentTransaction[] = [
  {
    licensePlate: "ABC-1234",
    amount: 7.5,
    duration: "1h 30m",
    date: "11/07/2024",
    time: "6:12pm",
    location: "CH100",
  },
  {
    licensePlate: "XYZ-5678",
    amount: 10.0,
    duration: "2h 15m",
    date: "11/07/2024",
    time: "5:12pm",
    location: "KY400",
  },
  {
    licensePlate: "DEF-9012",
    amount: 5.75,
    duration: "45m",
    date: "11/07/2024",
    time: "4:32pm",
    location: "KY400",
  },
  {
    licensePlate: "GHI-3456",
    amount: 6.25,
    duration: "1h",
    date: "11/07/2024",
    time: "1:10pm",
    location: "CH100",
  },
  {
    licensePlate: "JKL-7890",
    amount: 8.0,
    duration: "1h 45m",
    date: "11/07/2024",
    time: "11:47am",
    location: "CH100",
  },
  {
    licensePlate: "MNO-1234",
    amount: 8.5,
    duration: "2h",
    date: "11/07/2024",
    time: "10:50am",
    location: "KY400",
  },
  {
    licensePlate: "MNO-1234",
    amount: 8.5,
    duration: "2h",
    date: "11/07/2024",
    time: "10:50am",
    location: "KY400",
  },
  {
    licensePlate: "MNO-1234",
    amount: 8.5,
    duration: "2h",
    date: "11/07/2024",
    time: "10:50am",
    location: "KY400",
  },
  {
    licensePlate: "MNO-1234",
    amount: 8.5,
    duration: "2h",
    date: "11/07/2024",
    time: "10:50am",
    location: "KY400",
  },
];