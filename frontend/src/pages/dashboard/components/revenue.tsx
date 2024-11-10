import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export const description = 'An interactive bar chart'

const chartData = [
  { date: '2024-11-01', total: 150 },
  { date: '2024-11-02', total: 240 },
  { date: '2024-11-03', total: 121 },
  { date: '2024-11-04', total: 260 },
  { date: '2024-11-05', total: 290 },
  { date: '2024-11-06', total: 340 },
  { date: '2024-11-07', total: 220 },
]

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: '#2563eb',
  },
} satisfies ChartConfig

export function Revenue() {
  const total = chartData.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <Card className='h-[305px]'>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-3 sm:py-4'>
          <CardTitle>Revenue</CardTitle>
          <CardDescription className='text-xs text-muted-foreground'>
            Revenue for week 11/1 - 11/7
          </CardDescription>
        </div>
        <div className='flex'>
          <div className='relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-3 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-4'>
            <span className='text-xs text-muted-foreground'>Total</span>
            <span className='text-md font-bold leading-none'>
              ${total.toLocaleString()}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className='px-2 sm:p-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[192px] w-full'
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis
              dataKey='total'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={5}
              tickFormatter={(value) => `$${value}`}
            />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className='dollar-sign w-[150px]'
                  nameKey='revenue'
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  }}
                />
              }
            />
            <Bar dataKey='total' fill={`var(--color-revenue)`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
