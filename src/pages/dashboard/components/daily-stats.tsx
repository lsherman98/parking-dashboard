import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import DailyBookingsChart from "./daily-bookings-chart";
import DailyOccupancyChart from "./daily-occupancy-chart";

export default function DailyStats({ data, isMobile }: any) {
  const [currentTab, setCurrentTab] = useState("bookings");

  const dayRevenueTotal = data.revenue;
  const dayBookingsTotal = data.bookings;
  const dayViolationCount = data.violations;
  const parkingSpotsTotal = data.parkingSpots;
  const activeParkingSpotsTotal = data.activeParkingSpots;

  if (!isMobile) {
    return (
      <Card className="h-[305px]">
        <CardHeader className="pb-2">
          <div className="flex justify-between">
            <CardTitle>Today</CardTitle>
            <CardTitle className="text-muted-foreground">{data.date}</CardTitle>
          </div>
          <div className="flex justify-between">
            <CardDescription>Snapshot of today's activity.</CardDescription>
            <Tabs defaultValue="bookings" className="mt-1" onValueChange={setCurrentTab}>
              <TabsList>
                <TabsTrigger value="bookings" className="text-xs">
                  Bookings
                </TabsTrigger>
                <TabsTrigger value="occupancy" className="text-xs">
                  Occupancy
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="pb-0">
          <div className="grid grid-cols-4 gap-10">
            <div className="col-span-1 space-y-3 pt-1">
              <Card className="w-40 px-4 py-2">
                <div className="flex w-full items-center justify-between">
                  <div>
                    <p className="text-sm font-medium leading-none">Revenue</p>
                  </div>
                  <div className="text-sm font-medium">${dayRevenueTotal.toFixed(2)}</div>
                </div>
              </Card>
              <Card className="w-40 px-4 py-2">
                <div className="flex w-full items-center justify-between">
                  <div>
                    <p className="text-sm font-medium leading-none">Bookings</p>
                  </div>
                  <div className="text-sm font-medium">{dayBookingsTotal}</div>
                </div>
              </Card>
              <Card className="w-40 px-4 py-2">
                <div className="flex w-full items-center justify-between">
                  <div>
                    <p className="text-sm font-medium leading-none">Violations</p>
                  </div>
                  <div className="text-sm font-medium">{dayViolationCount}</div>
                </div>
              </Card>
            </div>
            <div className="col-span-3">
              {
                {
                  bookings: <DailyBookingsChart data={data.bookingsChartData} />,
                  occupancy: <DailyOccupancyChart data={data.occupancyChartData} />,
                }[currentTab]
              }
              <div className="mt-1 flex w-full justify-end pr-4">
                <div className="w-[85%]">
                  <Progress
                    value={(activeParkingSpotsTotal / parkingSpotsTotal) * 100}
                    className="w-full [&>div]:bg-blue-500" // Change blue-500 to any color you want
                  />
                  <div className="mt-1 flex justify-between">
                    <Label className="text-xs text-muted-foreground">Active Parking Sessions</Label>
                    <Label className="text-xs text-muted-foreground">
                      {activeParkingSpotsTotal}/{parkingSpotsTotal}
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card>
        <CardHeader className="pb-2">
          <div>
            <CardTitle>Today</CardTitle>
            <CardDescription className="text-muted-foreground">{data.date}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pb-0">
          <div className="flex flex-col gap-2">
            <Card className="px-4 py-2">
              <div className="flex w-full items-center justify-between">
                <div>
                  <p className="text-xs font-medium leading-none">Revenue</p>
                </div>
                <div className="text-xs font-medium">${dayRevenueTotal.toFixed(2)}</div>
              </div>
            </Card>
            <Card className="px-4 py-2">
              <div className="flex w-full items-center justify-between">
                <div>
                  <p className="text-xs font-medium leading-none">Bookings</p>
                </div>
                <div className="text-xs font-medium">{dayBookingsTotal}</div>
              </div>
            </Card>
            <Card className="px-4 py-2">
              <div className="flex w-full items-center justify-between">
                <div>
                  <p className="text-xs font-medium leading-none">Violations</p>
                </div>
                <div className="text-xs font-medium">{dayViolationCount}</div>
              </div>
            </Card>
          </div>
          <div className="mt-2 pt-2">
            {
              {
                bookings: <DailyBookingsChart data={data.bookingsChartData} className="ml-[-48px] w-[22rem] sm:w-[40rem]" />,
                occupancy: <DailyOccupancyChart data={data.occupancyChartData} className="ml-[-48px] w-[22rem]" />,
              }[currentTab]
            }
            <div className="mt-1 mb-4">
              <Tabs defaultValue="bookings" onValueChange={setCurrentTab}>
                <TabsList className="flex items-center">
                  <TabsTrigger value="bookings" className="text-sm w-full">
                    Bookings
                  </TabsTrigger>
                  <TabsTrigger value="occupancy" className="text-sm w-full">
                    Occupancy
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="mb-4">
              <Progress value={(activeParkingSpotsTotal / parkingSpotsTotal) * 100} className="w-full [&>div]:bg-blue-500" />
              <div className="mt-1 flex justify-between">
                <Label className="text-xs text-muted-foreground">Active Parking Sessions</Label>
                <Label className="text-xs text-muted-foreground">
                  {activeParkingSpotsTotal}/{parkingSpotsTotal}
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}
