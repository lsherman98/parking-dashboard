import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { format } from "date-fns";

export function BookingsChart({ ...props }: any) {
  const { period, selectedWeek, selectedMonth, selectedYear, selectedRange, bookingsChartData } = props;

  const chartConfig = {
    bookings: {
      label: "Bookings",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <Card className="h-[305px]">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-3 sm:py-4">
          <CardTitle>Bookings</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            {period === "week" && `Bookings for the week of ${selectedWeek}.`}
            {period === "month" && `Bookings for the month of ${selectedMonth}.`}
            {period === "three_month" && `Bookings for the past 90 days.`}
            {period === "year" && `Bookings for the year of ${selectedYear}.`}
            {period === "range" &&
              `Bookings from ${selectedRange?.from ? format(selectedRange.from, "LLL dd, y") : "(set a start date)"} to ${selectedRange?.to ? format(selectedRange.to, "LLL dd, y") : "(set an end date)"}.`}
          </CardDescription>
        </div>
        <div className="flex">
          <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-3 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-4">
            <span className="text-xs text-muted-foreground">Total</span>
            <span className="text-md font-bold leading-none">{bookingsChartData.total.toLocaleString()}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[192px] w-full">
          <BarChart
            accessibilityLayer
            data={bookingsChartData.data}
            margin={{
              left: 0,
              right: 16,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis dataKey="total" tickLine={false} axisLine={false} tickMargin={8} minTickGap={5} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="bookings"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey="total" fill={`var(--color-bookings)`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
