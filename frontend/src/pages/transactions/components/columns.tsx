import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

import { statuses } from '../data/data'
import { Transaction } from '../data/schema'

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ row }) => <div className='w-[20px]'>{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status')
      )

      if (!status) {
        return null
      }

      return (
        <div className={`flex w-[110px] items-center ${status.color}`}>
          {status.icon && (
            <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date' />
    ),
    cell: ({ row }) => <div className='w-[110px]'>{row.getValue('date')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'location',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Location' />
    ),
    cell: ({ row }) => (
      <div className='w-[90px]'>{row.getValue('location')}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'transaction_id',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Transaction ID'
      />
    ),
    cell: ({ row }) => (
      <div className='w-[120px]'>{row.getValue('transaction_id')}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'license_plate',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='License Plate'
      />
    ),
    cell: ({ row }) => (
      <div className='w-[100px]'>{row.getValue('license_plate')}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => <div className='w-[150px]'>{row.getValue('email')}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'cellphone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Phone #' />
    ),
    cell: ({ row }) => (
      <div className='w-[120px]'>{row.getValue('cellphone')}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => <div className='w-[110px]'>{row.getValue('name')}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'base_rate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Rate' />
    ),
    cell: ({ row }) => (
      <div className='w-[50px]'>{row.getValue('base_rate')}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'tax',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tax' />
    ),
    cell: ({ row }) => <div className='w-[50px]'>{row.getValue('tax')}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'city_tax',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='City Tax' />
    ),
    cell: ({ row }) => (
      <div className='w-[60px]'>{row.getValue('city_tax')}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'county_tax',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='County Tax' />
    ),
    cell: ({ row }) => (
      <div className='w-[80px]'>{row.getValue('county_tax')}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'service_fee',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Service Fee' />
    ),
    cell: ({ row }) => (
      <div className='w-[80px]'>{row.getValue('service_fee')}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'payment_gateway_fee',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Processing Fee' />
    ),
    cell: ({ row }) => (
      <div className='w-[120px]'>{row.getValue('payment_gateway_fee')}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'total',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Total' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('total')}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: 'actions',
    cell: () => <DataTableRowActions />,
  },
]
