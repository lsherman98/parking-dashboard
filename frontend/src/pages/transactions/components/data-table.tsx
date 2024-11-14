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

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconCashRegister, IconGavel } from "@tabler/icons-react";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [transactionsCount, setTransactionsCount] = useState(1621);
  const [violationsCount, setViolationsCount] = useState(426);
  const [violationRevenue, setViolationRevenue] = useState(2500);
  const [enforcementCommission, setEnforcementCommission] = useState(2000);
  const [processingFees, setProcessingFees] = useState(1080);

  const [transactionCountChange, setTransactionCountChange] = useState(20.1);
  const [violationsCountChange, setViolationsCountChange] = useState(180.1);
  const [violationRevenueChange, setViolationRevenueChange] = useState(-19);
  const [enforcementCommissionChange, setEnforcementCommissionChange] = useState(8);
  const [processingFeesChange, setProcessingFeesChange] = useState(8);

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
              <div>Total Transactions</div>
              <IconCashRegister className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold">{transactionsCount}</div>
            <p className="text-xs text-green-500">+{transactionCountChange}% from last month</p>
          </CardContent>
        </Card>
        <Card className="h-[105px]">
          <CardHeader className="flex flex-col space-y-0 pb-0 pt-4">
            <CardTitle className="flex flex-row items-center justify-between space-y-0 text-sm font-medium">
              Violations
              <IconGavel className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold">{violationsCount}</div>
            <p className="text-xs text-green-500">+{violationsCountChange}% from last month</p>
          </CardContent>
        </Card>
        <Card className="h-[105px]">
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
            <div className="text-xl font-bold">${violationRevenue}</div>
            <p className="text-xs text-red-500">{violationRevenueChange}% from last month</p>
          </CardContent>
        </Card>
        <Card className="h-[105px]">
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
            <div className="text-xl font-bold">${enforcementCommission}</div>
            <p className="text-xs text-green-500">+{enforcementCommissionChange}% since last month</p>
          </CardContent>
        </Card>
        <Card className="h-[105px]">
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
            <div className="text-xl font-bold">${processingFees}</div>
            <p className="text-xs text-green-500">+{processingFeesChange}% since last hour</p>
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
