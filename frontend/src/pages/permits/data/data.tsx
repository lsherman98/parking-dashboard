import { IconCircleCheck, IconCircleX, IconHourglass } from '@tabler/icons-react'

export const statuses = [
    {
        value: "active",
        label: "Active",
        color: "text-green-500",
        icon: IconCircleCheck,
    },
    {
        value: "requested",
        label: "Requested",
        icon: IconHourglass,
    },
    {
        value: "expired",
        label: "Expired",
        color: "text-red-500",
        icon: IconCircleX,
    },
];

