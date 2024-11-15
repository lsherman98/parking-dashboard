import { Layout } from "@/components/custom/layout";
import { UserNav } from "@/components/user-nav";
import { useEffect, useMemo } from "react";
import { BookingsChart } from "./components/bookings-chart";
import { RevenueChart } from "./components/revenue-chart";
import { TransactionsTable } from "./components/transactions-table";
import DashboardToolbar from "./components/dashboard-toolbar";
import CardStats from "./components/card-stats";
import DailyStats from "./components/daily-stats";
import { DashboardChartProps, DashboardToolbarProps, PeriodFilter } from "@/types";
import { bookingsChartData, recentTransactions, revenueChartData } from "@/data";
import { DateRange } from "react-day-picker";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchDashboardDataThunk,
  setLocationFilter,
  setMonthFilter,
  setPeriodFilter,
  setRangeFilter,
  setWeekFilter,
  setYearFilter,
} from "@/store/slices/dashboardSlice";
import { toast } from "sonner";

export default function Dashboard() {
  const dispatch = useAppDispatch();

  const {
    locationFilter,
    weekFilter,
    monthFilter,
    yearFilter,
    periodFilter,
    rangeFilter: rawRangeFilter,
    data,
    error,
    loading,
  } = useAppSelector((state) => state.dashboard);

  const rangeFilter = useMemo(() => {
    return rawRangeFilter
      ? {
          from: rawRangeFilter.from ? new Date(rawRangeFilter.from) : undefined,
          to: rawRangeFilter.to ? new Date(rawRangeFilter.to) : undefined,
        }
      : undefined;
  }, [rawRangeFilter]);

  const handleLocationChange = (location: string[]) => dispatch(setLocationFilter(location));
  const handlePeriodChange = (period: PeriodFilter) => {
    if (period === 'range') return;
    dispatch(setPeriodFilter(period))
  };
  const handleWeekChange = (week: string) => dispatch(setWeekFilter(week));
  const handleMonthChange = (month: string) => dispatch(setMonthFilter(month));
  const handleYearChange = (year: string) => dispatch(setYearFilter(year));
  const handleRangeChange = (range: DateRange | undefined) => {
    const serializableRange = range ? { from: range.from?.toISOString(), to: range.to?.toISOString() } : undefined;
    dispatch(setRangeFilter(serializableRange));
  };

  useEffect(() => {
    dispatch(fetchDashboardDataThunk());
  }, [locationFilter, weekFilter, monthFilter, yearFilter, rangeFilter, periodFilter]);

  const toolbarProps: DashboardToolbarProps = {
    locationFilter,
    handleLocationChange,
    weekFilter,
    handleWeekChange,
    monthFilter,
    handleMonthChange,
    yearFilter,
    handleYearChange,
    rangeFilter,
    handleRangeChange,
    periodFilter,
    handlePeriodChange,
    loading,
  };

  const capitalizeString = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const dashboardChartProps: DashboardChartProps = {
    selectedWeek: weekFilter,
    selectedMonth: capitalizeString(monthFilter),
    selectedYear: yearFilter,
    selectedRange: rangeFilter,
    period: periodFilter,
  };

  if (error) {
    toast(`Something went wrong. Please try again later.`, { description: error });
  }

  return (
    <Layout>
      <Layout.Body>
        <div className="mb-6 flex items-center justify-between space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <div className="space-y-4">
          <DashboardToolbar {...toolbarProps} />
          <div className="space-y-4">
            <CardStats data={data} />
            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              <div className="cols-span-2 grid grid-cols-1 gap-4">
                <BookingsChart {...dashboardChartProps} bookingsChartData={bookingsChartData} />
                <RevenueChart {...dashboardChartProps} revenueChartData={revenueChartData} />
              </div>
              <div className="cols-span-2 grid grid-cols-1 gap-4">
                <DailyStats data={data} />
                <div className="h-[305px]">
                  <TransactionsTable data={recentTransactions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout.Body>
    </Layout>
  );
}
