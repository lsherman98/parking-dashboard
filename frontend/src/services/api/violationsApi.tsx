import { database } from "@/data/database";
import { SerializableDateRange } from "@/store/slices/dashboardSlice";
import { PeriodFilter } from "@/types";

interface FilterParams {
  location: string[];
  week: string;
  month: string;
  year: string;
  dateRange: SerializableDateRange | undefined;
  period: PeriodFilter;
  statuses: string[];
}

export const fetchViolationData = async (params: FilterParams) => {
  const queryParams = new URLSearchParams();
  if (params.location) queryParams.set("location", params.location.join(","));
  if (params.statuses) queryParams.set("statuses", params.statuses.join(","));
  if (params.week) queryParams.set("week", params.week);
  if (params.month) queryParams.set("month", params.month);
  if (params.year) queryParams.set("year", params.year);
  if (params.dateRange?.from) queryParams.set("from", params.dateRange.from);
  if (params.dateRange?.to) queryParams.set("to", params.dateRange.to);
  if (params.period) queryParams.set("period", params.period);

  const violations = database.violations
    .filter((v) => {
      if (params.location.length > 0) {
        return params.location.includes(v.location_code);
      }
      return true;
    })
    .filter((v) => {
      if (params.statuses.length > 0) {
        return params.statuses.includes(v.status);
      }
      return true;
    })
    .filter((v) => {
      switch (params.period) {
        case "week":
          const [start, end] = params.week.split(" - ").map((date) => new Date(`${date}, 2023`));
          return new Date(v.date) >= start && new Date(v.date) <= end;
        case "month":
          const monthIndex = new Date(`${params.month} 1, ${new Date().getFullYear()}`).getMonth();
          return new Date(v.date).getMonth() === monthIndex && new Date(v.date).getFullYear() === 2023;
        case "three_month":
          const threeMonthsAgo = new Date("2023-12-31");
          threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
          return new Date(v.date) >= threeMonthsAgo;
        case "year":
          return new Date(v.date).getFullYear() === parseInt(params.year);
        case "range":
          return (
            params.dateRange?.from && params.dateRange?.to && v.date >= params.dateRange.from && v.date <= params.dateRange.to
          );
      }
    });

  return new Promise((resolve) => {
    setTimeout(() => {
      const data = {
        tableData: violations,
        stats: {
          violationsCount: violations.length,
          violationRevenueTotal: violations.reduce((acc, v) => acc + v.ticket_amount, 0),
          enforcementCommissionTotal: violations.reduce((acc, v) => acc + v.ticket_amount, 0) * 0.1,
          processingFeesTotal: violations.length * 5,
          violationsCountChange: 19,
          violationRevenueChange: 26,
          enforcementCommissionChange: 9,
          processingFeesChange: -11,
        },
      };
      resolve(data);
    }, 200);
  });

  const response = await fetch(`/api/violations?${queryParams}`);
  return response.json();
};
