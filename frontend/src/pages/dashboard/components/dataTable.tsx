'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/custom/button'

const data: Payment[] = [
  {
    licensePlate: 'ABC-1234',
    amount: 7.5,
    duration: '1h 30m',
    date: '11/07/2024',
    time: '6:12pm',
    location: 'CH100',
  },
  {
    licensePlate: 'XYZ-5678',
    amount: 10.0,
    duration: '2h 15m',
    date: '11/07/2024',
    time: '5:12pm',
    location: 'KY400',
  },
  {
    licensePlate: 'DEF-9012',
    amount: 5.75,
    duration: '45m',
    date: '11/07/2024',
    time: '4:32pm',
    location: 'KY400',
  },
  {
    licensePlate: 'GHI-3456',
    amount: 6.25,
    duration: '1h',
    date: '11/07/2024',
    time: '1:10pm',
    location: 'CH100',
  },
  {
    licensePlate: 'JKL-7890',
    amount: 8.0,
    duration: '1h 45m',
    date: '11/07/2024',
    time: '11:47am',
    location: 'CH100',
  },
  {
    licensePlate: 'MNO-1234',
    amount: 8.5,
    duration: '2h',
    date: '11/07/2024',
    time: '10:50am',
    location: 'KY400',
  },
  {
    licensePlate: 'MNO-1234',
    amount: 8.5,
    duration: '2h',
    date: '11/07/2024',
    time: '10:50am',
    location: 'KY400',
  },
  {
    licensePlate: 'MNO-1234',
    amount: 8.5,
    duration: '2h',
    date: '11/07/2024',
    time: '10:50am',
    location: 'KY400',
  },
  {
    licensePlate: 'MNO-1234',
    amount: 8.5,
    duration: '2h',
    date: '11/07/2024',
    time: '10:50am',
    location: 'KY400',
  },
]

export type Payment = {
  licensePlate: string
  amount: number
  duration: string
  date: string
  time: string
  location: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => <div>{row.getValue('location')}</div>,
  },
  {
    accessorKey: 'licensePlate',
    header: 'License Plate',
    cell: ({ row }) => <div>{row.getValue('licensePlate')}</div>,
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
    cell: ({ row }) => <div>{row.getValue('duration')}</div>,
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => <div>{row.getValue('date')}</div>,
  },
  {
    accessorKey: 'time',
    header: 'Time',
    cell: ({ row }) => <div>{row.getValue('time')}</div>,
  },
  {
    accessorKey: 'amount',
    header: () => <div className='text-right'>Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)
      return <div className='text-right font-medium'>{formatted}</div>
    },
  },
]

export function DataTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0, 
        pageSize: 6, 
      },
    },
  })

  return (
    <div className='h-full w-full'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader className='h-10'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className='w-full'>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
