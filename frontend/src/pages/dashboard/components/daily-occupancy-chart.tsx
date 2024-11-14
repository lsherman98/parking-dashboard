import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { dailyOccupancyChartData } from "@/data";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

export default function DailyOccupancyChart() {
  const occupancyChartConfig = {
    bookings: {
      label: "Occupancy",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={occupancyChartConfig} className="h-[10rem] w-full">
      <AreaChart
        accessibilityLayer
        data={dailyOccupancyChartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={4} />
        <YAxis dataKey="occupancy" tickLine={false} axisLine={false} tickMargin={4} tickFormatter={(value) => {
            return `${value}%`;
        }}/>
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" className="percent-sign" />} />
        <Area
          dataKey="occupancy"
          type="natural"
          fill="var(--color-bookings)"
          fillOpacity={0.4}
          stroke="var(--color-bookings)"
        />
      </AreaChart>
    </ChartContainer>
  );
}
