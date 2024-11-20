import { MultiSelect } from "@/components/custom/multi-select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IconRefresh } from "@tabler/icons-react";
import { Button } from "@/components/custom/button";
import { DashboardToolbarProps, PeriodFilter } from "@/types";
import { weeks, years } from "@/data";
import { useAppDispatch } from "@/store/hooks";
import { fetchDashboardDataThunk } from "@/store/slices/dashboardSlice";
import { database } from "@/data/database";

export default function DashboardToolbar(toolbarProps: DashboardToolbarProps) {
  const dispatch = useAppDispatch();

  const {
    locationFilter,
    handleLocationChange,
    weekFilter,
    handleWeekChange,
    monthFilter,
    handleMonthChange,
    yearFilter,
    handleYearChange,
    periodFilter,
    handlePeriodChange,
    rangeFilter,
    handleRangeChange,
    loading,
    isMobile,
  } = toolbarProps;

  const handleRefresh = () => dispatch(fetchDashboardDataThunk());

  if (isMobile) {
    return (
      <div className="flex flex-wrap items-center gap-2">
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
          className="min-h-9 w-[45%] min-w-36 shadow-none"
          disabled={loading}
        />
      </div>
    );
  } else {
    return (
      <div className="flex flex-wrap items-center gap-2 sm:my-4">
        <MultiSelect
          options={database.locations.map((location) => ({ label: location.location_code, value: location.location_code }))}
          onValueChange={handleLocationChange}
          defaultValue={locationFilter}
          placeholder="Locations"
          variant="inverted"
          animation={2}
          maxCount={3}
          className="min-h-9 w-auto min-w-36 shadow-none"
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
            <SelectTrigger className="w-48 shadow-none">
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
        <IconRefresh
          size={24}
          onClick={handleRefresh}
          className={`${loading ? "animate-[spin_1s_linear_infinite_reverse] cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        />
        <div className="xl:flex-grow"></div>
        <Button size="sm" className="h-8" variant="secondary">
          Download Report
        </Button>
      </div>
    );
  }
}
