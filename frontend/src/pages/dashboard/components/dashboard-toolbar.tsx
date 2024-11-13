import { MultiSelect } from "@/components/custom/multi-select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IconRefresh } from "@tabler/icons-react";
import { Button } from "@/components/custom/button";
import { DashboardToolbarProps, PeriodFilter } from "@/types";
import { weeks, years } from "@/data";

export default function DashboardToolbar(toolbarProps: DashboardToolbarProps) {
  const {
    locationFilter,
    setLocationFilter,
    weekFilter,
    setWeekFilter,
    monthFilter,
    setMonthFilter,
    yearFilter,
    setYearFilter,
    periodFilter,
    setPeriodFilter,
    rangeFilter,
    setRangeFilter,
    locations,
  } = toolbarProps;

  return (
    <div className="flex flex-col items-center gap-4 sm:my-4 sm:flex-row">
      <MultiSelect
        options={locations}
        onValueChange={setLocationFilter}
        defaultValue={locationFilter}
        placeholder="Locations"
        variant="inverted"
        animation={2}
        maxCount={3}
        className="min-h-9 w-auto min-w-36 shadow-none"
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
      {periodFilter === "range" && (
        <DatePickerWithRange date={rangeFilter} onDateChange={setRangeFilter} />
      )}
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
          <SelectTrigger className="w-48 shadow-none">
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
      <IconRefresh size={24} className="mr-4" />
      <div className="flex-grow"></div>
      <Button size="sm" className="h-8" variant="secondary">
        Download Report
      </Button>
    </div>
  );
}
