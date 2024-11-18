import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { DataTableToolbar } from "./data-table-toolbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconCalendarClock, IconParkingCircle } from "@tabler/icons-react";
import { DataTablePagination } from "@/components/data-table-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  stats: any;
  period: any;
}

export function DataTable<TData, TValue>({ columns, data, stats, period }: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const reservationsCount = stats.reservationsCount;
  const occupancy = stats.occupancy;

  const reservationCountChange = stats.reservationCountChange;
  const occupancyChange = stats.occupancyChange;

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div>
      <DataTableToolbar table={table} />
      <div className="mb-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <Card className="h-[105px]">
          <CardHeader className="flex flex-col space-y-0 pb-0 pt-4">
            <CardTitle className="flex flex-row items-center justify-between space-y-0 text-sm font-medium">
              <div>Total Reservations</div>
              <IconCalendarClock className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold">{reservationsCount}</div>
            {period === "three_month" && (
              <p className={`text-xs ${reservationCountChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                {reservationCountChange >= 0 ? "+" + reservationCountChange : reservationCountChange}% from last 90 days
              </p>
            )}
            {["week", "month", "year"].map(
              (periodStr) =>
                period === periodStr && (
                  <p key={period} className={`text-xs ${reservationCountChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {reservationCountChange >= 0 ? "+" + reservationCountChange : reservationCountChange}% from last {period}
                  </p>
                ),
            )}
          </CardContent>
        </Card>
        <Card className="h-[105px]">
          <CardHeader className="flex flex-col space-y-0 pb-0 pt-4">
            <CardTitle className="flex flex-row items-center justify-between space-y-0 text-sm font-medium">
              Occupancy
              <IconParkingCircle className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold">{occupancy.toFixed(2)}%</div>
            {period === "three_month" && (
              <p className={`text-xs ${occupancyChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                {occupancyChange >= 0 ? "+" + occupancyChange : occupancyChange}% from last 90 days
              </p>
            )}
            {["week", "month", "year"].map(
              (periodStr) =>
                period === periodStr && (
                  <p key={period} className={`text-xs ${occupancyChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {occupancyChange >= 0 ? "+" + occupancyChange : occupancyChange}% from last {period}
                  </p>
                ),
            )}
          </CardContent>
        </Card>
      </div>
      <div className="mb-2 rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
