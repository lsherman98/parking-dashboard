import { Status } from '@/types'
import { IconCircleCheck, IconCircleX, IconSend, IconSendOff } from '@tabler/icons-react'

export const statuses: Status[] = [
  {
    value: 'paid',
    label: 'Paid',
    color: 'text-green-500',
    icon: IconCircleCheck,
  },
  {
    value: 'cancelled',
    label: 'Cancelled',
    icon: IconCircleX,
  },
  {
    value: 'not_sent',
    label: 'Not Sent',
    color: 'text-red-500',
    icon: IconSendOff,
  },
  {
    value: 'sent',
    label: 'Sent',
    icon: IconSend,
  },
]

