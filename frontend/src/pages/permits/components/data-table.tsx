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
import { IconCircleCheck, IconCircleX, IconHourglass } from "@tabler/icons-react";
import { DataTablePagination } from "@/components/data-table-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  stats: any;
  isMobile: boolean;
}

export function DataTable<TData, TValue>({ columns, data, stats, isMobile }: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const activePermits = stats.activePermits;
  const requestedPermits = stats.requestedPermits;
  const expiredPermits = stats.expiredPermits;

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
      <DataTableToolbar table={table} isMobile={isMobile} />
      {isMobile ? (
        <div>
          <Card className="flex items-center justify-between px-4 py-2 w-full mb-2">
            <div className="flex items-center">
              <IconCircleCheck className="h-4 w-4 text-muted-foreground mr-2" />
              <div>Active Permits</div>
            </div>
            <div>
              <div className="items-center">
                <div className="text-lg font-bold">{activePermits}</div>
              </div>
            </div>
          </Card>
          <Card className="flex items-center justify-between px-4 py-2 w-full mb-2">
            <div className="flex items-center">
              <IconHourglass className="h-4 w-4 text-muted-foreground mr-2" />
              <div>Requested Permits</div>
            </div>
            <div>
              <div className="items-center">
                <div className="text-lg font-bold">{requestedPermits}</div>
              </div>
            </div>
          </Card>
          <Card className="flex items-center justify-between px-4 py-2 w-full mb-2">
            <div className="flex items-center">
              <IconCircleX className="h-4 w-4 text-muted-foreground mr-2" />
              <div>Expired Permits</div>
            </div>
            <div>
              <div className="items-center">
                <div className="text-lg font-bold">{expiredPermits}</div>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div className="mb-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card className="h-[90px]">
            <CardHeader className="flex flex-col space-y-0 pb-0 pt-4">
              <CardTitle className="flex flex-row items-center justify-between space-y-0 text-sm font-medium">
                <div>Active Permits</div>
                <IconCircleCheck className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-xl font-bold">{activePermits}</div>
            </CardContent>
          </Card>
          <Card className="h-[90px]">
            <CardHeader className="flex flex-col space-y-0 pb-0 pt-4">
              <CardTitle className="flex flex-row items-center justify-between space-y-0 text-sm font-medium">
                <div>Requested Permits</div>
                <IconHourglass className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-xl font-bold">{requestedPermits}</div>
            </CardContent>
          </Card>
          <Card className="h-[90px]">
            <CardHeader className="flex flex-col space-y-0 pb-0 pt-4">
              <CardTitle className="flex flex-row items-center justify-between space-y-0 text-sm font-medium">
                <div>Expired Permits</div>
                <IconCircleX className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-xl font-bold">{expiredPermits}</div>
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
