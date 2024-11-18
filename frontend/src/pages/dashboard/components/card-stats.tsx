import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CardStats({ data, periodFilter }: any) {
  const revenueTotal = data.revenueTotal;
  const bookingsCount = data.bookingsCount;
  const violationsCount = data.violationsCount;
  const occupancyUtilization = data.occupancyUtilization;

  const revenueChange = data.revenueChange;
  const bookingsChange = data.bookingsChange;
  const violationsChange = data.violationsChange;
  const occupancyUtilizationChange = data.occupancyUtilizationChange;

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
          <div className="text-xl font-bold">${revenueTotal.toFixed(2)}</div>
          {periodFilter === "three_month" && (
            <p className={`text-xs ${revenueChange >= 0 ? "text-green-500" : "text-red-500"}`}>
              {revenueChange >= 0 ? "+" + revenueChange : revenueChange}% from last 90 days
            </p>
          )}
          {["week", "month", "year"].map(
            (period) =>
              periodFilter === period && (
                <p key={period} className={`text-xs ${revenueChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {revenueChange >= 0 ? "+" + revenueChange : revenueChange}% from last {period}
                </p>
              ),
          )}
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
          {periodFilter === "three_month" && (
            <p className={`text-xs ${bookingsChange >= 0 ? "text-green-500" : "text-red-500"}`}>
              {bookingsChange >= 0 ? "+" + bookingsChange : bookingsChange}% from last 90 days
            </p>
          )}
          {["week", "month", "year"].map(
            (period) =>
              periodFilter === period && (
                <p key={period} className={`text-xs ${bookingsChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {bookingsChange >= 0 ? "+" + bookingsChange : bookingsChange}% from last {period}
                </p>
              ),
          )}
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
          {periodFilter === "three_month" && (
            <p className={`text-xs ${violationsChange >= 0 ? "text-green-500" : "text-red-500"}`}>
              {violationsChange >= 0 ? "+" + violationsChange : violationsChange}% from last 90 days
            </p>
          )}
          {["week", "month", "year"].map(
            (period) =>
              periodFilter === period && (
                <p key={period} className={`text-xs ${violationsChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {violationsChange >= 0 ? "+" + violationsChange : violationsChange}% from last {period}
                </p>
              ),
          )}
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
          <CardDescription className="text-[10px] text-muted-foreground">Bookable hours / Booked hours</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="text-xl font-bold">{occupancyUtilization.toFixed(2)}%</div>
          {periodFilter === "three_month" && (
            <p className={`text-xs ${occupancyUtilizationChange >= 0 ? "text-green-500" : "text-red-500"}`}>
              {occupancyUtilizationChange >= 0 ? "+" + occupancyUtilizationChange : occupancyUtilizationChange}% from last 90 days
            </p>
          )}
          {["week", "month", "year"].map(
            (period) =>
              periodFilter === period && (
                <p key={period} className={`text-xs ${occupancyUtilizationChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {occupancyUtilizationChange >= 0 ? "+" + occupancyUtilizationChange : occupancyUtilizationChange}% from last {period}
                </p>
              ),
          )}
        </CardContent>
      </Card>
    </div>
  );
}
