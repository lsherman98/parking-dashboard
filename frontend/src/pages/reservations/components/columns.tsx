import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Reservation } from "../data/schema";
import { statuses } from "../data/data";

export const columns: ColumnDef<Reservation>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => <div className="w-auto">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = statuses.find((status) => status.value === row.getValue("status"));

      if (!status) {
        return null;
      }

      return (
        <div className={`flex w-auto items-center ${status.color}`}>
          {status.icon && <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Location" />,
    cell: ({ row }) => <div className="w-auto">{row.getValue("location")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "license_plate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="License Plate" />,
    cell: ({ row }) => <div className="w-auto">{row.getValue("license_plate")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => <div className="w-auto">{row.getValue("date")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "session_start",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Session Start" />,
    cell: ({ row }) => <div className="w-auto">{row.getValue("session_start")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "session_end",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Session End" />,
    cell: ({ row }) => <div className="w-auto">{row.getValue("session_end")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "rate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Rate" />,
    cell: ({ row }) => <div className="w-auto">{row.getValue("rate")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "hours",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Hours" />,
    cell: ({ row }) => <div className="w-auto">{row.getValue("hours")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "phone_number",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Phone" />,
    cell: ({ row }) => <div className="w-auto">{row.getValue("phone_number")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "total",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
    cell: ({ row }) => <div className="w-auto">{row.getValue("total")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "tax",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tax" />,
    cell: ({ row }) => <div className="w-auto">{row.getValue("tax")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "service_fee",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Service Fee" />,
    cell: ({ row }) => <div className="w-auto">{row.getValue("service_fee")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
