import { DotsHorizontalIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function DataTableRowActions() {
  // const transaction = transactionSchema.parse(row.original)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem>Download Violation</DropdownMenuItem>
        <DropdownMenuItem>Cancel Ticket</DropdownMenuItem>
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              View Photos
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className='h-[750px] min-w-[800px] overflow-y-auto sm:max-w-xl'>
            <DialogHeader>
              <DialogTitle>Violation Photos</DialogTitle>
              <DialogDescription>
                Entry and exit photos of violation vehicle.
              </DialogDescription>
            </DialogHeader>
            <div>
              <h2>
                <span className='font-bold'>Camera: </span>DS-101 ENT-1
                (Adaptive)
              </h2>
              <h4>
                <span className='font-bold'> Time of entry: </span>04/08/2024
                8:43 AM
              </h4>
              <h4>
                <span className='font-bold'> Time of exit: </span>04/08/2024
                8:43 AM
              </h4>
            </div>
            <div className='justify-center space-y-4'>
              <div className='flex gap-8'>
                <div>
                  <div className='font-bold'>Plate Entry</div>
                  <img
                    src='https://via.placeholder.com/400x300'
                    alt='Violation photo'
                  />
                </div>
                <div>
                  <div className='font-bold'>Vehicle Entry</div>
                  <img
                    src='https://via.placeholder.com/400x300'
                    alt='Violation photo'
                  />
                </div>
              </div>
              <div className='flex gap-8'>
                <div>
                  <div className='font-bold'>Plate Exit</div>
                  <img
                    src='https://via.placeholder.com/400x300'
                    alt='Violation photo'
                  />
                </div>
                <div>
                  <div className='font-bold'>Vehicle Exit</div>
                  <img
                    src='https://via.placeholder.com/400x300'
                    alt='Violation photo'
                  />
                </div>
              </div>
            </div>
            <DialogFooter className='sm:justify-start'>
              <DialogClose asChild>
                <Button type='button' variant='secondary'>
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
