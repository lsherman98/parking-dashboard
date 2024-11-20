import { Table } from "@tanstack/react-table";

import { Button } from "@/components/custom/button";
import { DataTableViewOptions } from "./data-table-view-options";

import { statuses } from "../data/data";
import { IconRefresh } from "@tabler/icons-react";
import { MultiSelect } from "@/components/custom/multi-select";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { weeks, years } from "@/data";
import { DateRange } from "react-day-picker";
import { PeriodFilter } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchReservationDataThunk,
  setLocationFilter,
  setMonthFilter,
  setPeriodFilter,
  setRangeFilter,
  setStatusFilter,
  setWeekFilter,
  setYearFilter,
} from "@/store/slices/reservationsSlice";
import { DataTableFacetedFilter } from "@/components/data-table-faceted-filter";
import { database } from "@/data/database";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  isMobile: boolean;
}

export function DataTableToolbar<TData>({ table, isMobile }: DataTableToolbarProps<TData>) {
  const dispatch = useAppDispatch();

  const { locationFilter, weekFilter, monthFilter, yearFilter, periodFilter, rangeFilter, statusFilter, loading } =
    useAppSelector((state) => state.reservations);

  const handleLocationChange = (location: string[]) => dispatch(setLocationFilter(location));
  const handlePeriodChange = (period: PeriodFilter) => dispatch(setPeriodFilter(period));
  const handleWeekChange = (week: string) => dispatch(setWeekFilter(week));
  const handleMonthChange = (month: string) => dispatch(setMonthFilter(month));
  const handleYearChange = (year: string) => dispatch(setYearFilter(year));
  const handleRangeChange = (range: DateRange | undefined) => {
    const serializableRange = range ? { from: range.from?.toISOString(), to: range.to?.toISOString() } : undefined;
    dispatch(setRangeFilter(serializableRange));
    if (serializableRange?.from && serializableRange?.to) {
      dispatch(fetchReservationDataThunk());
    }
  };
  const handleStatusChange = (selectedValues: string[]) => dispatch(setStatusFilter(selectedValues));

  useEffect(() => {
    if (periodFilter === "range") return;
    dispatch(fetchReservationDataThunk());
  }, [locationFilter, weekFilter, monthFilter, yearFilter, rangeFilter, periodFilter, statusFilter]);

  const handleRefresh = () => dispatch(fetchReservationDataThunk());

  if (!isMobile) {
    return (
      <div className={"flex flex-wrap items-center gap-2 sm:my-4"}>
        <Input
          placeholder="Search"
          value={table.getState().globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[175px]"
          disabled={loading}
        />
        <MultiSelect
          options={database.locations.map((location) => ({ label: location.location_code, value: location.location_code }))}
          onValueChange={handleLocationChange}
          defaultValue={locationFilter}
          placeholder="Locations"
          variant="inverted"
          animation={2}
          maxCount={3}
          className="min-h-9 w-auto min-w-24 shadow-none"
          disabled={loading}
        />
        <Tabs
          orientation="vertical"
          defaultValue={periodFilter}
          className="space-y-4"
          onValueChange={(value: string) => handlePeriodChange(value as PeriodFilter)}
        >
          <TabsList>
            <TabsTrigger disabled={loading} value="week">
              Week
            </TabsTrigger>
            <TabsTrigger disabled={loading} value="month">
              Month
            </TabsTrigger>
            <TabsTrigger disabled={loading} value="three_month">
              90 Days
            </TabsTrigger>
            <TabsTrigger disabled={loading} value="year">
              Year
            </TabsTrigger>
            <TabsTrigger disabled={loading} value="range">
              Range
            </TabsTrigger>
          </TabsList>
        </Tabs>
        {periodFilter === "range" && (
          <DatePickerWithRange
            date={
              rangeFilter
                ? {
                    from: rangeFilter.from ? new Date(rangeFilter.from) : undefined,
                    to: rangeFilter.to ? new Date(rangeFilter.to) : undefined,
                  }
                : undefined
            }
            onDateChange={handleRangeChange}
            disabled={loading}
          />
        )}
        {periodFilter === "week" && (
          <Select value={weekFilter} onValueChange={handleWeekChange} disabled={loading}>
            <SelectTrigger className="w-36 shadow-none">
              <SelectValue>{weekFilter}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {weeks.map((week) => (
                  <SelectItem key={week} value={week}>
                    {week}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        {periodFilter === "month" && (
          <Select value={monthFilter} onValueChange={handleMonthChange} disabled={loading}>
            <SelectTrigger className="w-32 shadow-none">
              <SelectValue>{monthFilter.charAt(0).toUpperCase() + monthFilter.slice(1)}</SelectValue>
            </SelectTrigger>
            <SelectContent className="max-h-[var(--radix-select-content-available-height)]">
              <SelectGroup>
                <SelectItem value="january">January</SelectItem>
                <SelectItem value="february">February</SelectItem>
                <SelectItem value="march">March</SelectItem>
                <SelectItem value="april">April</SelectItem>
                <SelectItem value="may">May</SelectItem>
                <SelectItem value="june">June</SelectItem>
                <SelectItem value="july">July</SelectItem>
                <SelectItem value="august">August</SelectItem>
                <SelectItem value="september">September</SelectItem>
                <SelectItem value="october">October</SelectItem>
                <SelectItem value="november">November</SelectItem>
                <SelectItem value="december">December</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        {periodFilter === "year" && (
          <Select value={yearFilter} onValueChange={handleYearChange} disabled={loading}>
            <SelectTrigger className="w-36 shadow-none">
              <SelectValue>{yearFilter}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
            onSelectionChange={handleStatusChange}
            disabled={loading}
          />
        )}
        <IconRefresh
          size={24}
          onClick={handleRefresh}
          className={`${loading ? "animate-[spin_1s_linear_infinite_reverse] cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        />
        <div className="xl:flex-grow"></div>
        <DataTableViewOptions table={table} />
        <Button size="sm" className="h-8" variant="secondary">
          Download Report
        </Button>
      </div>
    );
  } else {
    return (
      <div className={"flex flex-wrap items-center gap-2 mb-4"}>
        <Tabs
          orientation="vertical"
          defaultValue={periodFilter}
          className="space-y-4"
          onValueChange={(value: string) => handlePeriodChange(value as PeriodFilter)}
        >
          <TabsList>
            <TabsTrigger disabled={loading} value="week">
              Week
            </TabsTrigger>
            <TabsTrigger disabled={loading} value="month">
              Month
            </TabsTrigger>
            <TabsTrigger disabled={loading} value="three_month">
              90 Days
            </TabsTrigger>
            <TabsTrigger disabled={loading} value="year">
              Year
            </TabsTrigger>
            <TabsTrigger disabled={loading} value="range">
              Range
            </TabsTrigger>
          </TabsList>
        </Tabs>
        {periodFilter === "range" && (
          <DatePickerWithRange
            date={
              rangeFilter
                ? {
                    from: rangeFilter.from ? new Date(rangeFilter.from) : undefined,
                    to: rangeFilter.to ? new Date(rangeFilter.to) : undefined,
                  }
                : undefined
            }
            onDateChange={handleRangeChange}
            disabled={loading}
          />
        )}
        {periodFilter === "week" && (
          <Select value={weekFilter} onValueChange={handleWeekChange} disabled={loading}>
            <SelectTrigger className="w-[45%] shadow-none">
              <SelectValue>{weekFilter}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {weeks.map((week) => (
                  <SelectItem key={week} value={week}>
                    {week}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        {periodFilter === "month" && (
          <Select value={monthFilter} onValueChange={handleMonthChange} disabled={loading}>
            <SelectTrigger className="w-[45%] shadow-none">
              <SelectValue>{monthFilter.charAt(0).toUpperCase() + monthFilter.slice(1)}</SelectValue>
            </SelectTrigger>
            <SelectContent className="max-h-[var(--radix-select-content-available-height)]">
              <SelectGroup>
                <SelectItem value="january">January</SelectItem>
                <SelectItem value="february">February</SelectItem>
                <SelectItem value="march">March</SelectItem>
                <SelectItem value="april">April</SelectItem>
                <SelectItem value="may">May</SelectItem>
                <SelectItem value="june">June</SelectItem>
                <SelectItem value="july">July</SelectItem>
                <SelectItem value="august">August</SelectItem>
                <SelectItem value="september">September</SelectItem>
                <SelectItem value="october">October</SelectItem>
                <SelectItem value="november">November</SelectItem>
                <SelectItem value="december">December</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        {periodFilter === "year" && (
          <Select value={yearFilter} onValueChange={handleYearChange} disabled={loading}>
            <SelectTrigger className="w-[45%] shadow-none">
              <SelectValue>{yearFilter}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        <MultiSelect
          options={database.locations.map((location) => ({ label: location.location_code, value: location.location_code }))}
          onValueChange={handleLocationChange}
          defaultValue={locationFilter}
          placeholder="Locations"
          variant="inverted"
          animation={2}
          maxCount={3}
          className="min-h-9 w-[45%] shadow-none"
          disabled={loading}
        />
        <Input
          placeholder="Search"
          value={table.getState().globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[45%]"
          disabled={loading}
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
            onSelectionChange={handleStatusChange}
            disabled={loading}
            className="w-[45%]"
          />
        )}
        <DataTableViewOptions table={table} />
      </div>
    );
  }
}
