import { SerializableDateRange } from "@/store/slices/dashboardSlice";
import { PeriodFilter } from "@/types";

interface FilterParams {
  location?: string[];
  week?: string;
  month?: string;
  year?: string;
  dateRange?: SerializableDateRange;
  period?: PeriodFilter;
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
    setTimeout(() => {
      resolve("data");
    }, 1000); 
  });

  const response = await fetch(`/api/dashboard?${queryParams}`);
  return response.json();
};
