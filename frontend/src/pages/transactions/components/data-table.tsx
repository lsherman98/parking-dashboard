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
import { IconCashRegister, IconGavel } from "@tabler/icons-react";
import { DataTablePagination } from "@/components/data-table-pagination";
import { PeriodFilter } from "@/types";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  stats: any;
  period: PeriodFilter;
  isMobile: boolean;
}

export function DataTable<TData, TValue>({ columns, data, stats, period, isMobile }: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const transactionsCount = stats.transactionsCount;
  const violationsCount = stats.violationsCount;
  const violationRevenue = stats.violationRevenue;
  const enforcementCommission = stats.enforcementCommission;
  const processingFees = stats.processingFees;

  const transactionCountChange = stats.transactionCountChange;
  const violationsCountChange = stats.violationsCountChange;
  const violationRevenueChange = stats.violationRevenueChange;
  const enforcementCommissionChange = stats.enforcementCommissionChange;
  const processingFeesChange = stats.processingFeesChange;

  const table = useReactTable({
    data: data,
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
      <DataTableToolbar table={table} isMobile={isMobile} />
      {isMobile ? (
        <div>
          <Card className="flex items-center justify-between px-4 py-2 w-full mb-2">
            <div className="flex items-center">
              <IconCashRegister className="h-4 w-4 text-muted-foreground mr-2" />
              <div>Total Transactions</div>
            </div>
            <div>
              <div className="items-center">
                <div className="text-lg font-bold">{transactionsCount}</div>
              </div>
            </div>
          </Card>
          <Card className="flex items-center justify-between px-4 py-2 w-full mb-2">
            <div className="flex items-center">
              <IconGavel className="h-4 w-4 text-muted-foreground mr-2" />
              <div>Violations</div>
            </div>
            <div>
              <div className="items-center">
                <div className="text-lg font-bold">{violationsCount}</div>
              </div>
            </div>
          </Card>
          <Card className="flex items-center justify-between px-4 py-2 w-full mb-2">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground mr-2"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              <div>Violation Revenue</div>
            </div>
            <div>
              <div className="items-center">
                <div className="text-lg font-bold">${violationRevenue.toFixed(2)}</div>
              </div>
            </div>
          </Card>
          <Card className="flex items-center justify-between px-4 py-2 w-full mb-2">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground mr-2"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              <div>Enforcement Comission</div>
            </div>
            <div>
              <div className="items-center">
                <div className="text-lg font-bold">${enforcementCommission.toFixed(2)}</div>
              </div>
            </div>
          </Card>
          <Card className="flex items-center justify-between px-4 py-2 w-full mb-2">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground mr-2"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              <div>Processing Fees</div>
            </div>
            <div>
              <div className="items-center">
                <div className="text-lg font-bold">${processingFees.toFixed(2)}</div>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div className="mb-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-col space-y-0 pb-0 pt-4">
              <CardTitle className="flex flex-row items-center justify-between space-y-0 text-sm font-medium">
                <div>Total Transactions</div>
                <IconCashRegister className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-xl font-bold">{transactionsCount}</div>
              {period === "three_month" && (
                <p className={`text-xs ${transactionCountChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {transactionCountChange >= 0 ? "+" + transactionCountChange : transactionCountChange}% from last 90 days
                </p>
              )}
              {["week", "month", "year"].map(
                (periodStr) =>
                  period === periodStr && (
                    <p key={period} className={`text-xs ${transactionCountChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {transactionCountChange >= 0 ? "+" + transactionCountChange : transactionCountChange}% from last {period}
                    </p>
                  ),
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col space-y-0 pb-0 pt-4">
              <CardTitle className="flex flex-row items-center justify-between space-y-0 text-sm font-medium">
                Violations
                <IconGavel className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-xl font-bold">{violationsCount}</div>
              {period === "three_month" && (
                <p className={`text-xs ${violationsCountChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {violationsCountChange >= 0 ? "+" + violationsCountChange : violationsCountChange}% from last 90 days
                </p>
              )}
              {["week", "month", "year"].map(
                (periodStr) =>
                  period === periodStr && (
                    <p key={period} className={`text-xs ${violationsCountChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {violationsCountChange >= 0 ? "+" + violationsCountChange : violationsCountChange}% from last {period}
                    </p>
                  ),
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col space-y-0 pb-0 pt-4">
              <CardTitle className="flex flex-row items-center justify-between space-y-0 text-sm font-medium">
                Violation Revenue
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
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-xl font-bold">${violationRevenue.toFixed(2)}</div>
              {period === "three_month" && (
                <p className={`text-xs ${violationRevenueChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {violationRevenueChange >= 0 ? "+" + violationRevenueChange : violationRevenueChange}% from last 90 days
                </p>
              )}
              {["week", "month", "year"].map(
                (periodStr) =>
                  period === periodStr && (
                    <p key={period} className={`text-xs ${violationRevenueChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {violationRevenueChange >= 0 ? "+" + violationRevenueChange : violationRevenueChange}% from last {period}
                    </p>
                  ),
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col space-y-0 pb-0 pt-4">
              <CardTitle className="flex flex-row items-center justify-between space-y-0 text-sm font-medium">
                Enforcement Comission
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
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-xl font-bold">${enforcementCommission.toFixed(2)}</div>
              {period === "three_month" && (
                <p className={`text-xs ${enforcementCommissionChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {enforcementCommissionChange >= 0 ? "+" + enforcementCommissionChange : enforcementCommissionChange}% from last
                  90 days
                </p>
              )}
              {["week", "month", "year"].map(
                (periodStr) =>
                  period === periodStr && (
                    <p key={period} className={`text-xs ${enforcementCommissionChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {enforcementCommissionChange >= 0 ? "+" + enforcementCommissionChange : enforcementCommissionChange}% from
                      last {period}
                    </p>
                  ),
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col space-y-0 pb-0 pt-4">
              <CardTitle className="flex flex-row items-center justify-between space-y-0 text-sm font-medium">
                Processing Fees
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
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-xl font-bold">${processingFees.toFixed(2)}</div>
              {period === "three_month" && (
                <p className={`text-xs ${processingFeesChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {processingFeesChange >= 0 ? "+" + processingFeesChange : processingFeesChange}% from last 90 days
                </p>
              )}
              {["week", "month", "year"].map(
                (periodStr) =>
                  period === periodStr && (
                    <p key={period} className={`text-xs ${processingFeesChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {processingFeesChange >= 0 ? "+" + processingFeesChange : processingFeesChange}% from last {period}
                    </p>
                  ),
              )}
            </CardContent>
          </Card>
        </div>
      )}
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
