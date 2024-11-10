import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

const getColumnHeader = (column: string) => {
  switch (column) {
    case 'id':
      return 'ID'
    case 'status':
      return 'Status'
    case 'date':
      return 'Date'
    case 'location':
      return 'Location'
    case 'transaction_id':
      return 'Transaction ID'
    case 'license_plate':
      return 'License Plate'
    case 'email':
      return 'Email'
    case 'cellphone':
      return 'Cellphone'
    case 'name':
      return 'Name'
    case 'base_rate':
      return 'Base Rate'
    case 'tax':
      return 'Tax'
    case 'city_tax':
      return 'City Tax'
    case 'county_tax':
      return 'County Tax'
    case 'service_fee':
      return 'Service Fee'
    case 'payment_gateway_fee':
      return 'Processing Fee'
    case 'total':
      return 'Total'
  }
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='hidden h-8 lg:flex'
        >
          <MixerHorizontalIcon className='mr-2 h-4 w-4' />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[150px]' >
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== 'undefined' && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                onSelect={(e) => e.preventDefault()}
              >
                {getColumnHeader(column.id)}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
