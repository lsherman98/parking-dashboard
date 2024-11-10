import {
  CheckCircledIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons'
import { IconGavel } from '@tabler/icons-react'

export const statuses = [
  {
    value: 'paid',
    label: 'Paid',
    color: 'text-green-500',
    icon: CheckCircledIcon,
  },
  {
    value: 'pending',
    label: 'Pending',
    icon: StopwatchIcon,
  },
  {
    value: 'refunded',
    label: 'Refunded',
    color: 'text-red-500',
    icon: CrossCircledIcon,
  },
  {
    value: 'failed',
    label: 'Failed',
    color: 'text-red-500',
    icon: CrossCircledIcon,
  },
  {
    value: 'cancelled',
    label: 'Cancelled',
    color: 'text-red-500',
    icon: CrossCircledIcon,
  },
  {
    value: 'violation',
    label: 'Violation',
    color: 'text-red-500',
    icon: IconGavel,
  },
]

