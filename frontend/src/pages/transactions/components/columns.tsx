import { ColumnDef } from "@tanstack/react-table";

import { DataTableRowActions } from "./data-table-row-actions";

import { statuses } from "../data/data";
import { Transaction } from "../data/schema";
import { DataTableColumnHeader } from "@/components/data-table-column-header";

export const columns: ColumnDef<Transaction>[] = [
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
    accessorKey: "hours",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Hours" />,
    cell: ({ row }) => <div className="w-auto">{row.getValue("hours")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "transaction_id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Transaction Id" className="whitespace-nowrap" />,
    cell: ({ row }) => <div className="w-auto">{row.getValue("transaction_id")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "license_plate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="License Plate" className="whitespace-nowrap" />,
    cell: ({ row }) => <div className="w-auto">{row.getValue("license_plate")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => <div className="w-auto">{row.getValue("email")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "cellphone",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Phone #" />,
    cell: ({ row }) => <div className="w-auto">{row.getValue("cellphone")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <div className="w-auto whitespace-nowrap">{row.getValue("name")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "base_rate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Rate" />,
    cell: ({ row }) => <div className="w-auto">{row.getValue("base_rate")}</div>,
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
    accessorKey: "city_tax",
    header: ({ column }) => <DataTableColumnHeader column={column} title="City Tax" className="whitespace-nowrap" />,
    cell: ({ row }) => <div className="w-auto">{row.getValue("city_tax")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "county_tax",
    header: ({ column }) => <DataTableColumnHeader column={column} title="County Tax" className="whitespace-nowrap" />,
    cell: ({ row }) => <div className="w-auto">{row.getValue("county_tax")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "service_fee",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Service Fee" className="whitespace-nowrap" />,
    cell: ({ row }) => <div className="w-auto">{row.getValue("service_fee")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "payment_gateway_fee",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Processing Fee" className="whitespace-nowrap" />,
    cell: ({ row }) => <div className="w-auto">{row.getValue("payment_gateway_fee")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "total",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
    cell: ({ row }) => <div className="w-auto">{(row.getValue("total") as number).toFixed(2)}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
