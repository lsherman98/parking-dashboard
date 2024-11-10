import { Layout } from '@/components/custom/layout'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserNav } from '@/components/user-nav'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range'
import { Bookings } from './components/bookings'
import { Revenue } from './components/revenue'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Progress } from '@/components/ui/progress'
import { Label } from '@/components/ui/label'
import { IconRefresh } from '@tabler/icons-react'
import { DataTable } from './components/dataTable'
import { Button } from '@/components/custom/button'
import { MultiSelect } from '@/components/custom/multi-select'

export default function Dashboard() {
  const getCurrentMonth = () => {
    return new Date().toLocaleString('default', { month: 'long' })
  }

  const locationData = [
    { value: 'CH100', label: 'CH100' },
    { value: 'KY400', label: 'KY400' },
  ]

  const [locations, setLocations] = useState<string[]>([])
  const [weekFilter, setWeekFilter] = useState('11/1 - 11/7')
  const [monthFilter, setMonthFilter] = useState(getCurrentMonth())
  const [yearFilter, setYearFilter] = useState('2024')
  const [dateFilter, setDateFilter] = useState('month')

  const areaChartData = [
    { hour: '06:00', bookings: 3 },
    { hour: '09:00', bookings: 5 },
    { hour: '12:00', bookings: 12 },
    { hour: '15:00', bookings: 14 },
    { hour: '18:00', bookings: 10 },
    { hour: '21:00', bookings: 8 },
  ]
  const areaChartConfig = {
    bookings: {
      label: 'Bookings',
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig

  return (
    <Layout>
      <Layout.Body>
        <div className='mb-6 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
          <div className='flex items-center space-x-2'>
            <UserNav />
          </div>
        </div>
        <div className='space-y-4'>
          <div className='flex flex-col items-center gap-4 sm:my-4 sm:flex-row'>
            <MultiSelect
              options={locationData}
              onValueChange={setLocations}
              defaultValue={locations}
              placeholder='Locations'
              variant='inverted'
              animation={2}
              maxCount={3}
              className='min-h-9 w-auto min-w-36 shadow-none'
            />
            <Tabs
              orientation='vertical'
              defaultValue={dateFilter}
              className='space-y-4'
              onValueChange={setDateFilter}
            >
              <TabsList>
                <TabsTrigger value='week'>Week</TabsTrigger>
                <TabsTrigger value='month'>Month</TabsTrigger>
                <TabsTrigger value='90'>90 Days</TabsTrigger>
                <TabsTrigger value='year'>Year</TabsTrigger>
                <TabsTrigger value='range'>Range</TabsTrigger>
              </TabsList>
            </Tabs>
            {dateFilter === 'range' && <DatePickerWithRange />}
            {dateFilter === 'week' && (
              <Select value={weekFilter} onValueChange={setWeekFilter}>
                <SelectTrigger className='w-36 shadow-none'>
                  <SelectValue>{weekFilter}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='10/1 - 10/7'>11/1 - 11/7</SelectItem>
                    <SelectItem value='10/8 - 10/16'>11/8 - 11/16</SelectItem>
                    <SelectItem value='10/17 - 10/23'>11/17 - 11/23</SelectItem>
                    <SelectItem value='10/24 - 10/31'>11/24 - 11/31</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
            {dateFilter === 'month' && (
              <Select value={monthFilter} onValueChange={setMonthFilter}>
                <SelectTrigger className='w-48 shadow-none'>
                  <SelectValue>{monthFilter}</SelectValue>
                </SelectTrigger>
                <SelectContent className='max-h-[var(--radix-select-content-available-height)]'>
                  <SelectGroup>
                    <SelectItem value='January'>January</SelectItem>
                    <SelectItem value='February'>February</SelectItem>
                    <SelectItem value='March'>March</SelectItem>
                    <SelectItem value='April'>April</SelectItem>
                    <SelectItem value='May'>May</SelectItem>
                    <SelectItem value='June'>June</SelectItem>
                    <SelectItem value='July'>July</SelectItem>
                    <SelectItem value='August'>August</SelectItem>
                    <SelectItem value='September'>September</SelectItem>
                    <SelectItem value='October'>October</SelectItem>
                    <SelectItem value='November'>November</SelectItem>
                    <SelectItem value='December'>December</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
            {dateFilter === 'year' && (
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className='w-36 shadow-none'>
                  <SelectValue>{yearFilter}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='2024'>2024</SelectItem>
                    <SelectItem value='2023'>2023</SelectItem>
                    <SelectItem value='2022'>2022</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
            <IconRefresh size={24} className='mr-4' />
            <div className='flex-grow'></div>
            <Button>Download Report</Button>
          </div>
          <div className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-col space-y-0 pb-4 pt-4'>
                  <CardTitle className='flex flex-row items-center justify-between space-y-0 text-sm font-medium'>
                    <div>Total Revenue</div>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                    </svg>
                  </CardTitle>
                  <CardDescription className='text-[10px] text-muted-foreground'>
                    Revenue after fees & tax.
                  </CardDescription>
                </CardHeader>
                <CardContent className='pt-2'>
                  <div className='text-xl font-bold'>$1,621</div>
                  <p className='text-xs text-green-500'>
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-col space-y-0 pb-4 pt-4'>
                  <CardTitle className='flex flex-row items-center justify-between space-y-0 text-sm font-medium'>
                    Bookings
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                      <path d='M10 16v-8h3.334c.92 0 1.666 .895 1.666 2s-.746 2 -1.666 2h-3.334' />
                      <path d='M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0' />
                    </svg>
                  </CardTitle>
                  <CardDescription className='text-[10px] text-muted-foreground'>
                    Total bookings.
                  </CardDescription>
                </CardHeader>
                <CardContent className='pt-2'>
                  <div className='text-xl font-bold'>128</div>
                  <p className='text-xs text-green-500'>
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-col space-y-0 pb-4 pt-4'>
                  <CardTitle className='flex flex-row items-center justify-between space-y-0 text-sm font-medium'>
                    Violations
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                    </svg>
                  </CardTitle>
                  <CardDescription className='text-[10px] text-muted-foreground'>
                    Service & operation fees.
                  </CardDescription>
                </CardHeader>
                <CardContent className='pt-2'>
                  <div className='text-xl font-bold'>45</div>
                  <p className='text-xs text-red-500'>-19% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-col space-y-0 pb-4 pt-4'>
                  <CardTitle className='flex flex-row items-center justify-between space-y-0 text-sm font-medium'>
                    Capacity Utilization
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                    </svg>
                  </CardTitle>
                  <CardDescription className='text-[10px] text-muted-foreground'>
                    Bookable hours / Booked hours
                  </CardDescription>
                </CardHeader>
                <CardContent className='pt-2'>
                  <div className='text-xl font-bold'>94%</div>
                  <p className='text-xs text-green-500'>+8% from last month</p>
                </CardContent>
              </Card>
            </div>
            <div className='grid gap-4 sm:grid-cols-1 lg:grid-cols-2'>
              <div className='cols-span-2 grid grid-cols-1 gap-4'>
                <Bookings />
                <Revenue />
              </div>
              <div className='cols-span-2 grid grid-cols-1 gap-4'>
                <Card className='h-[305px]'>
                  <CardHeader>
                    <div className='flex justify-between'>
                      <CardTitle>Today</CardTitle>
                      <CardTitle className='text-muted-foreground'>
                        Thursday, November 7, 2024
                      </CardTitle>
                    </div>
                    <CardDescription>
                      Snapshot of today's activity.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='pb-0'>
                    <div className='grid grid-cols-4 gap-10'>
                      <div className='col-span-1 space-y-3 pt-1'>
                        <Card className='w-40 px-4 py-2'>
                          <div className='flex w-full items-center justify-between'>
                            <div>
                              <p className='text-sm font-medium leading-none'>
                                Revenue
                              </p>
                            </div>
                            <div className='text-sm font-medium'>$312</div>
                          </div>
                        </Card>
                        <Card className='w-40 px-4 py-2'>
                          <div className='flex w-full items-center justify-between'>
                            <div>
                              <p className='text-sm font-medium leading-none'>
                                Bookings
                              </p>
                            </div>
                            <div className='text-sm font-medium'>28</div>
                          </div>
                        </Card>
                        <Card className='w-40 px-4 py-2'>
                          <div className='flex w-full items-center justify-between'>
                            <div>
                              <p className='text-sm font-medium leading-none'>
                                Violations
                              </p>
                            </div>
                            <div className='text-sm font-medium'>7</div>
                          </div>
                        </Card>
                      </div>
                      <div className='col-span-3'>
                        <ChartContainer
                          config={areaChartConfig}
                          className='h-[10rem] w-full'
                        >
                          <AreaChart
                            accessibilityLayer
                            data={areaChartData}
                            margin={{
                              left: 12,
                              right: 12,
                            }}
                          >
                            <CartesianGrid vertical={false} />
                            <XAxis
                              dataKey='hour'
                              tickLine={false}
                              axisLine={false}
                              tickMargin={4}
                              tickFormatter={(value: number) => {
                                const hour = parseInt(
                                  value.toString().split(':')[0]
                                )
                                const period = hour >= 12 ? 'PM' : 'AM'
                                const formattedHour = hour % 12 || 12
                                return `${formattedHour}${period}`
                              }}
                            />
                            <YAxis
                              dataKey='bookings'
                              tickLine={false}
                              axisLine={false}
                              tickMargin={4}
                            />
                            <ChartTooltip
                              cursor={false}
                              content={<ChartTooltipContent indicator='line' />}
                            />
                            <Area
                              dataKey='bookings'
                              type='natural'
                              fill='var(--color-bookings)'
                              fillOpacity={0.4}
                              stroke='var(--color-bookings)'
                            />
                          </AreaChart>
                        </ChartContainer>
                        <div className='mt-4 flex w-full justify-end pr-4'>
                          <div className='w-[85%]'>
                            <Progress
                              value={60}
                              className='w-full [&>div]:bg-blue-500' // Change blue-500 to any color you want
                            />
                            <div className='mt-1 flex justify-between'>
                              <Label className='text-xs text-muted-foreground'>
                                Active Parking Sessions
                              </Label>
                              <Label className='text-xs text-muted-foreground'>
                                15/26
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className='h-[305px]'>
                  <DataTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout.Body>
    </Layout>
  )
}
