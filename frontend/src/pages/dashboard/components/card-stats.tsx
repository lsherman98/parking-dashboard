import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export default function CardStats() {
  const [revenueTotal, setRevenueTotal] = useState(1621);
  const [bookingsCount, setBookingsCount] = useState(128);
  const [violationsCount, setViolations] = useState(45);
  const [occupancyUtilization, setOccupancyUtilization] = useState(94);

  const [revenueChange, setRevenueChange] = useState(20.1);
  const [bookingsChange, setBookingsChange] = useState(180.1);
  const [violationsChange, setViolationsChange] = useState(-19);
  const [occupancyUtilizationChange, setOccupancyUtilizationChange] = useState(8);


    return (
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-col space-y-0 pb-4 pt-4">
            <CardTitle className="flex flex-row items-center justify-between space-y-0 text-sm font-medium">
              <div>Total Revenue</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardTitle>
            <CardDescription className="text-[10px] text-muted-foreground">Revenue after fees & tax.</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold">${revenueTotal}</div>
            <p className="text-xs text-green-500">+{revenueChange}% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-col space-y-0 pb-4 pt-4">
            <CardTitle className="flex flex-row items-center justify-between space-y-0 text-sm font-medium">
              Bookings
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-muted-foreground"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 16v-8h3.334c.92 0 1.666 .895 1.666 2s-.746 2 -1.666 2h-3.334" />
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
              </svg>
            </CardTitle>
            <CardDescription className="text-[10px] text-muted-foreground">Total bookings.</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold">{bookingsCount}</div>
            <p className="text-xs text-green-500">+{bookingsChange}% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-col space-y-0 pb-4 pt-4">
            <CardTitle className="flex flex-row items-center justify-between space-y-0 text-sm font-medium">
              Violations
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardTitle>
            <CardDescription className="text-[10px] text-muted-foreground">Service & operation fees.</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold">{violationsCount}</div>
            <p className="text-xs text-red-500">{violationsChange}% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-col space-y-0 pb-4 pt-4">
            <CardTitle className="flex flex-row items-center justify-between space-y-0 text-sm font-medium">
              Occupancy Utilization
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardTitle>
            <CardDescription className="text-[10px] text-muted-foreground">
              Bookable hours / Booked hours
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold">{occupancyUtilization}%</div>
            <p className="text-xs text-green-500">+{occupancyUtilizationChange}% from last month</p>
          </CardContent>
        </Card>
      </div>
    );
}
