import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

export default function DailyBookingsChart({ data, className }: any) {
  const bookingsChartConfig = {
    bookings: {
      label: "Bookings",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={bookingsChartConfig} className={cn("h-[10rem] w-full", className)}>
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="hour"
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          tickFormatter={(value: number) => {
            const hour = parseInt(value.toString().split(":")[0]);
            const period = hour >= 12 ? "PM" : "AM";
            const formattedHour = hour % 12 || 12;
            return `${formattedHour}${period}`;
          }}
        />
        <YAxis dataKey="bookings" tickLine={false} axisLine={false} tickMargin={4} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
        <Area dataKey="bookings" type="natural" fill="var(--color-bookings)" fillOpacity={0.4} stroke="var(--color-bookings)" />
      </AreaChart>
    </ChartContainer>
  );
}
