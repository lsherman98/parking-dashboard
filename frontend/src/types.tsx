import { DateRange } from "react-day-picker";

export type Status = {
  value: string;
  label: string;
  color?: string;
  icon: any;
};

export type PeriodFilter = "week" | "month" | "three_month" | "year" | "range";

export type LocationItem = {
  label: string;
  value: string;
};

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
  locations: LocationItem[];
};


