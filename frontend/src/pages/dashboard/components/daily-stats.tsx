import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import DailyBookingsChart from "./daily-bookings-chart";
import DailyOccupancyChart from "./daily-occupancy-chart";

export default function DailyStats() {
    const [currentTab, setCurrentTab] = useState("bookings");

    return (
      <Card className="h-[305px]">
        <CardHeader className="pb-2">
          <div className="flex justify-between">
            <CardTitle>Today</CardTitle>
            <CardTitle className="text-muted-foreground">Thursday, November 7, 2024</CardTitle>
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
                  <div className="text-sm font-medium">$312</div>
                </div>
              </Card>
              <Card className="w-40 px-4 py-2">
                <div className="flex w-full items-center justify-between">
                  <div>
                    <p className="text-sm font-medium leading-none">Bookings</p>
                  </div>
                  <div className="text-sm font-medium">28</div>
                </div>
              </Card>
              <Card className="w-40 px-4 py-2">
                <div className="flex w-full items-center justify-between">
                  <div>
                    <p className="text-sm font-medium leading-none">Violations</p>
                  </div>
                  <div className="text-sm font-medium">7</div>
                </div>
              </Card>
            </div>
            <div className="col-span-3">
              {({
                bookings: <DailyBookingsChart />,
                occupancy: <DailyOccupancyChart />
              })[currentTab]}
              <div className="mt-1 flex w-full justify-end pr-4">
                <div className="w-[85%]">
                  <Progress
                    value={60}
                    className="w-full [&>div]:bg-blue-500" // Change blue-500 to any color you want
                  />
                  <div className="mt-1 flex justify-between">
                    <Label className="text-xs text-muted-foreground">Active Parking Sessions</Label>
                    <Label className="text-xs text-muted-foreground">15/26</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
}