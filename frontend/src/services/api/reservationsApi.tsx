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

export const fetchReservationData = async (params: FilterParams) => {
  const queryParams = new URLSearchParams();
  if (params.location) queryParams.set("location", params.location.join(","));
  if (params.statuses) queryParams.set("statuses", params.statuses.join(","));
  if (params.week) queryParams.set("week", params.week);
  if (params.month) queryParams.set("month", params.month);
  if (params.year) queryParams.set("year", params.year);
  if (params.dateRange?.from) queryParams.set("from", params.dateRange.from);
  if (params.dateRange?.to) queryParams.set("to", params.dateRange.to);
  if (params.period) queryParams.set("period", params.period);

  const reservations = database.reservations
    .filter((r) => {
      if (params.location.length > 0) {
        return params.location.includes(r.location_code);
      }
      return true;
    })
    .filter((r) => {
      if (params.statuses.length > 0) {
        return params.statuses.includes(r.status);
      }
      return true;
    })
    .filter((r) => {
      switch (params.period) {
        case "week":
          const [start, end] = params.week.split(" - ").map((date) => new Date(`${date}, 2023`));
          return new Date(r.date) >= start && new Date(r.date) <= end;
        case "month":
          const monthIndex = new Date(`${params.month} 1, ${new Date().getFullYear()}`).getMonth();
          return new Date(r.date).getMonth() === monthIndex && new Date(r.date).getFullYear() === 2023;
        case "three_month":
          const threeMonthsAgo = new Date("2023-12-31");
          threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
          return new Date(r.date) >= threeMonthsAgo;
        case "year":
          return new Date(r.date).getFullYear() === parseInt(params.year);
        case "range":
          return (
            params.dateRange?.from && params.dateRange?.to && r.date >= params.dateRange.from && r.date <= params.dateRange.to
          );
      }
    });

  let occupancy = 0;
  switch (params.period) {
    case "week":
      occupancy = 72;
      break;
    case "month":
      occupancy = 68;
      break;
    case "three_month":
      occupancy = 70;
      break;
    case "year":
      occupancy = 75;
      break;
    case "range":
      occupancy = 80;
      break;
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const data = {
        tableData: reservations,
        stats: {
          reservationsCount: reservations.length,
          occupancy,
          reservationCountChange: 26,
          occupancyChange: 32,
        },
      };
      resolve(data);
    }, 200);
  });

  const response = await fetch(`/api/reservations?${queryParams}`);
  return response.json();
};
