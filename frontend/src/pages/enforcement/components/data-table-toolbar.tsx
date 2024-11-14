import { Table } from "@tanstack/react-table";

import { Button } from "@/components/custom/button";
import { DataTableViewOptions } from "./data-table-view-options";

import { statuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { IconRefresh } from "@tabler/icons-react";
import { MultiSelect } from "@/components/custom/multi-select";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { currentMonth, currentWeek, currentYear, locations, weeks, years } from "@/data";
import { DateRange } from "react-day-picker";
import { PeriodFilter } from "@/types";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const [weekFilter, setWeekFilter] = useState<string>(currentWeek);
  const [monthFilter, setMonthFilter] = useState<string>(currentMonth);
  const [yearFilter, setYearFilter] = useState<string>(currentYear);
  const [rangeFilter, setRangeFilter] = useState<DateRange | undefined>({ from: undefined, to: undefined });
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>("month");

  return (
    <div className="flex flex-wrap items-center gap-2 sm:my-4">
      <Input
        placeholder="Search"
        value={table.getState().globalFilter ?? ""}
        onChange={(event) => table.setGlobalFilter(event.target.value)}
        className="h-8 w-[150px] lg:w-[175px]"
      />
      <MultiSelect
        options={locations.map((location) => ({ label: location.location_code, value: location.location_code }))}
        onValueChange={setLocationFilter}
        defaultValue={locationFilter}
        placeholder="Locations"
        variant="inverted"
        animation={2}
        maxCount={3}
        className="min-h-9 w-auto min-w-24 shadow-none"
      />
      <Tabs
        orientation="vertical"
        defaultValue={periodFilter}
        className="space-y-4"
        onValueChange={(value: string) => setPeriodFilter(value as PeriodFilter)}
      >
        <TabsList>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="three_month">90 Days</TabsTrigger>
          <TabsTrigger value="year">Year</TabsTrigger>
          <TabsTrigger value="range">Range</TabsTrigger>
        </TabsList>
      </Tabs>
      {periodFilter === "range" && <DatePickerWithRange date={rangeFilter} onDateChange={setRangeFilter} />}
      {periodFilter === "week" && (
        <Select value={weekFilter} onValueChange={setWeekFilter}>
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
        <Select value={monthFilter} onValueChange={setMonthFilter}>
          <SelectTrigger className="w-32 shadow-none">
            <SelectValue>{monthFilter}</SelectValue>
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
        <Select value={yearFilter} onValueChange={setYearFilter}>
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
        <DataTableFacetedFilter column={table.getColumn("status")} title="Status" options={statuses} />
      )}
      <IconRefresh size={24} />
      <div className="xl:flex-grow"></div>
      <DataTableViewOptions table={table} />
      <Button size="sm" className="h-8" variant="secondary">
        Download Report
      </Button>
    </div>
  );
}
