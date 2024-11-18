import { database } from "@/data/database";
import { DashboardData, SerializableDateRange } from "@/store/slices/dashboardSlice";
import { PeriodFilter } from "@/types";

interface FilterParams {
  location: string[];
  week: string;
  month: string;
  year: string;
  dateRange: SerializableDateRange | undefined;
  period: PeriodFilter;
}

export const fetchDashboardData = async (params: FilterParams) => {
  const queryParams = new URLSearchParams();
  if (params.location) queryParams.set("location", params.location.join(","));
  if (params.week) queryParams.set("week", params.week);
  if (params.month) queryParams.set("month", params.month);
  if (params.year) queryParams.set("year", params.year);
  if (params.dateRange?.from) queryParams.set("from", params.dateRange.from);
  if (params.dateRange?.to) queryParams.set("to", params.dateRange.to);
  if (params.period) queryParams.set("period", params.period);

  return new Promise((resolve) => {
    const dailyTransactions = database.transactions
      .filter((t) => {
        return new Date(t.date).toDateString() === "Wed Nov 01 2023";
      })
      .filter((t) => {
        if (params.location.length > 0) {
          return params.location.includes(t.location_code);
        }
        return true;
      });
    const transactions = database.transactions
      .filter((t) => {
        if (params.location.length > 0) {
          return params.location.includes(t.location_code);
        }
        return true;
      })
      .filter((t) => {
        switch (params.period) {
          case "week":
            const [start, end] = params.week.split(" - ").map((date) => new Date(`${date}, 2023`));
            return new Date(t.date) >= start && new Date(t.date) <= end;
          case "month":
            const monthIndex = new Date(`${params.month} 1, ${new Date().getFullYear()}`).getMonth();
            return new Date(t.date).getMonth() === monthIndex && new Date(t.date).getFullYear() === 2023;
          case "three_month":
            const threeMonthsAgo = new Date("2023-12-31");
            threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
            return new Date(t.date) >= threeMonthsAgo;
          case "year":
            return new Date(t.date).getFullYear() === parseInt(params.year);
          case "range":
            return (
              params.dateRange?.from && params.dateRange?.to && t.date >= params.dateRange.from && t.date <= params.dateRange.to
            );
        }
      });

    let bookableHours = 0;
    if (params.period === "week") {
      bookableHours = 7 * 8 * 25;
    }
    if (params.period === "month") {
      bookableHours = 30 * 8 * 25;
    }
    if (params.period === "year") {
      bookableHours = 365 * 8 * 25;
    }
    if (params.period === "three_month") {
      bookableHours = 90 * 8 * 25;
    }
    if (params.period === "range") {
      const numDays =
        params.dateRange && params.dateRange.from && params.dateRange.to
          ? (new Date(params.dateRange.to).getTime() - new Date(params.dateRange.from).getTime()) / (1000 * 60 * 60 * 24)
          : 0;
      bookableHours = numDays * 8 * 25;
    }
    const statsData = {
      revenueTotal: transactions.filter((t) => t.status === "paid").reduce((acc, t) => acc + t.total, 0),
      bookingsCount: transactions.length,
      violationsCount: transactions.filter((t) => t.status === "violation").length,
      occupancyUtilization: (transactions.reduce((acc, t) => acc + t.hours, 0) / bookableHours) * 100,
      revenueChange: 24,
      bookingsChange: 16,
      violationsChange: -8,
      occupancyUtilizationChange: 34,
    };

    const bookingsChartData = [];
    const occupancyChartData = [];
    for (let i = 0; i < 24; i++) {
      bookingsChartData.push({
        hour: i,
        bookings: dailyTransactions.filter((t) => new Date(t.date).getHours() === i).length,
      });
      const occupancy = dailyTransactions.filter((t) => new Date(t.date).getHours() === i).reduce((acc, t) => acc + t.hours, 0);
      occupancyChartData.push({
        hour: i,
        occupancy: (occupancy / 100) * 100,
      });
    }
    const dailyStatsData = {
      date: "Wednesday, November 1, 2023",
      revenue: dailyTransactions
        .filter((t) => t.status === "paid" && new Date(t.date).toDateString() === "Wed Nov 01 2023")
        .reduce((acc, t) => acc + t.total, 0),
      bookings: dailyTransactions.filter((t) => new Date(t.date).toDateString() === "Wed Nov 01 2023").length,
      violations: dailyTransactions.filter(
        (t) => t.status === "violation" && new Date(t.date).toDateString() === "Wed Nov 01 2023",
      ).length,
      parkingSpots: 25,
      activeParkingSpots: 20,
      bookingsChartData: bookingsChartData.filter((d) => d.bookings > 0),
      occupancyChartData: occupancyChartData.filter((d) => d.occupancy > 0),
    };

    const revenueDateTotals: any = [];
    transactions.forEach((t) => {
      const date =
        params.period === "year"
          ? new Date(t.date).toISOString().split("T")[0].slice(0, 7) // Only keep year and month
          : new Date(t.date).toISOString().split("T")[0]; // Disregard time element
      if (!revenueDateTotals.find((revObj: any) => revObj.date === date)) {
        revenueDateTotals.push({ date: date, total: 0 });
      }
      revenueDateTotals.find((revObj: any) => revObj.date === date).total += t.total;
    });

    const bookingsDateTotals: any = [];
    transactions.forEach((t) => {
      const date =
        params.period === "year"
          ? new Date(t.date).toISOString().split("T")[0].slice(0, 7) // Only keep year and month
          : new Date(t.date).toISOString().split("T")[0];
      if (!bookingsDateTotals.find((revObj: any) => revObj.date === date)) {
        bookingsDateTotals.push({ date: date, total: 0 });
      }
      bookingsDateTotals.find((revObj: any) => revObj.date === date).total += 1;
    });

    const recentTransactionsData = transactions.slice(0, 36).map((t) => {
      const date = new Date(t.date);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const time = `${hours % 12 || 12}:${minutes < 10 ? "0" : ""}${minutes} ${hours >= 12 ? "PM" : "AM"}`;
      return {
        location: t.location_code,
        licensePlate: t.license_plate,
        duration: `${t.hours} hours`,
        date: t.date.split("T")[0],
        time: time,
        amount: t.total,
      };
    });

    setTimeout(() => {
      const data: DashboardData = {
        statsData,
        dailyStatsData,
        revenueData: {
          data: revenueDateTotals.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()),
          total: revenueDateTotals.reduce((acc: number, revObj: any) => acc + revObj.total, 0),
        },
        bookingsData: {
          data: bookingsDateTotals.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()),
          total: bookingsDateTotals.reduce((acc: number, revObj: any) => acc + revObj.total, 0),
        },
        recentTransactionsData: recentTransactionsData.sort(
          (a, b) => new Date(b.date + " " + b.time).getTime() - new Date(a.date + " " + a.time).getTime(),
        ),
      };
      resolve(data);
    }, 200);
  });

  const response = await fetch(`/api/dashboard?${queryParams}`);
  return response.json();
};
