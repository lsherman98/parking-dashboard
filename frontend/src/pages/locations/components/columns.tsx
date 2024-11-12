import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

import { statuses } from '../data/data'
import { Location } from '../data/schema';

export const columns: ColumnDef<Location>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ID" />
        ),
        cell: ({ row }) => <div className="w-auto">{row.getValue("id")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status = statuses.find(
                (status) => status.value === row.getValue("status")
            );

            if (!status) {
                return null;
            }

            return (
                <div className={`flex w-auto items-center ${status.color}`}>
                    {status.icon && (
                        <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
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
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Location Code" />
        ),
        cell: ({ row }) => (
            <div className="w-auto">{row.getValue("location_code")}</div>
        ),
        enableSorting: true,
        enableHiding: false,
    },
    {
        accessorKey: "lot_size",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Lot Size" />
        ),
        cell: ({ row }) => (
            <div className="w-auto">{row.getValue("lot_size")}</div>
        ),
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "address",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Address" />
        ),
        cell: ({ row }) => (
            <div className="w-auto">{row.getValue("address")}</div>
        ),
        enableSorting: false,
        enableHiding: true,
    },
    {
        accessorKey: "city",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="City" />
        ),
        cell: ({ row }) => (
            <div className="w--auto">{row.getValue("city")}</div>
        ),
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "state",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="State" />
        ),
        cell: ({ row }) => (
            <div className="w-auto">{row.getValue("state")}</div>
        ),
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "zip_code",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Zip Code" />
        ),
        cell: ({ row }) => (
            <div className="w-auto">{row.getValue("zip_code")}</div>
        ),
        enableSorting: true,
        enableHiding: true,
    },
    {
        id: "actions",
        cell: () => <DataTableRowActions />,
    },
];
