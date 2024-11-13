import { Layout } from "@/components/custom/layout";
import { UserNav } from "@/components/user-nav";
import { useState } from "react";
import { BookingsChart } from "./components/bookings-chart";
import { RevenueChart } from "./components/revenue-chart";
import { TransactionsTable } from "./components/transactions-table";
import DashboardToolbar from "./components/dashboard-toolbar";
import CardStats from "./components/card-stats";
import DailyStats from "./components/daily-stats";
import { DashboardToolbarProps, PeriodFilter} from "@/types";
import { locations, weeks } from "@/data";
import { DashboardChartProps } from "./types";
import { DateRange } from "react-day-picker";

export default function Dashboard() {
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear().toString();
  const currentWeekIndex = Math.min(Math.floor(new Date().getDate() / 7), 3);
  const currentWeek = weeks[currentWeekIndex];

  const capitalizeString = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const [weekFilter, setWeekFilter] = useState<string>(currentWeek);
  const [monthFilter, setMonthFilter] = useState<string>(currentMonth);
  const [yearFilter, setYearFilter] = useState<string>(currentYear);
  const [rangeFilter, setRangeFilter] = useState<DateRange | undefined>({from: undefined, to: undefined});
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>("month");

  const toolbarProps: DashboardToolbarProps = {
    locationFilter,
    setLocationFilter,
    weekFilter,
    setWeekFilter,
    monthFilter,
    setMonthFilter,
    yearFilter,
    setYearFilter,
    rangeFilter,
    setRangeFilter,
    periodFilter,
    setPeriodFilter,
    locations,
  };

  const dashboardChartProps: DashboardChartProps = {
    selectedWeek: weekFilter,
    selectedMonth: capitalizeString(monthFilter),
    selectedYear: yearFilter,
    selectedRange: rangeFilter,
    period: periodFilter,
  };

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
            <CardStats />
            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              <div className="cols-span-2 grid grid-cols-1 gap-4">
                <BookingsChart {...dashboardChartProps} />
                <RevenueChart {...dashboardChartProps} />
              </div>
              <div className="cols-span-2 grid grid-cols-1 gap-4">
                <DailyStats />
                <div className="h-[305px]">
                  <TransactionsTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout.Body>
    </Layout>
  );
}
