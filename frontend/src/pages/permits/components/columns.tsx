import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

import { statuses } from '../data/data'
import { Permit } from '../data/schema';

export const columns: ColumnDef<Permit>[] = [
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
        accessorKey: "license_plate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="License Plate" />
        ),
        cell: ({ row }) => (
            <div className="w-auto">{row.getValue("license_plate")}</div>
        ),
        enableSorting: false,
        enableHiding: true,
    },
    {
        accessorKey: "start_date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Start Date" />
        ),
        cell: ({ row }) => (
            <div className="w-auto">{row.getValue("start_date")}</div>
        ),
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "end_date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="End Date" />
        ),
        cell: ({ row }) => (
            <div className="w-auto">{row.getValue("end_date")}</div>
        ),
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => (
            <div className="w-auto">{row.getValue("name")}</div>
        ),
        enableSorting: false,
        enableHiding: true,
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => (
            <div className="w-auto">{row.getValue("email")}</div>
        ),
        enableSorting: false,
        enableHiding: true,
    },
    {
        accessorKey: "phone",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Phone Number" />
        ),
        cell: ({ row }) => (
            <div className="w-auto">{row.getValue("phone")}</div>
        ),
        enableSorting: false,
        enableHiding: true,
    },
    {
        id: "actions",
        cell: () => <DataTableRowActions />,
    },
];
