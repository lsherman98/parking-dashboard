import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "../../../components/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

import { statuses } from "../data/data";
import { Violation } from "../data/schema";

export const columns: ColumnDef<Violation>[] = [
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
    accessorKey: "license_plate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="License Plate" />,
    cell: ({ row }) => <div className="w-auto">{row.getValue("license_plate")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "location_code",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Location" />,
    cell: ({ row }) => <div className="w-auto">{row.getValue("location_code")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formattedDate = date.toLocaleDateString();
      return <div className="w-auto">{formattedDate}</div>;
    },
    enableSorting: true,
    enableHiding: true,
    },
    {
    accessorKey: "session_start",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Session Start" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("session_start"));
      const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return <div className="w-auto">{formattedTime}</div>;
    },
    enableSorting: false,
    enableHiding: true,
    },
    {
    accessorKey: "session_end",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Session End" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("session_end"));
      const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return <div className="w-auto">{formattedTime}</div>;
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "transaction_id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Transaction ID" />,
    cell: ({ row }) => <div className="w-auto">{row.getValue("transaction_id")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "ticket_amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ticket Amount" />,
    cell: ({ row }) => <div className="w-auto">{row.getValue("ticket_amount")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
