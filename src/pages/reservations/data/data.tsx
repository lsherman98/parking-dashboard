import { IconCircleCheck, IconCircleX } from "@tabler/icons-react";

export const statuses = [
  {
    value: "paid",
    label: "Paid",
    color: "text-green-500",
    icon: IconCircleCheck,
  },
  {
    value: "failed",
    label: "Failed",
    icon: IconCircleX,
  },
  {
    value: "refunded",
    label: "Refunded",
    color: "text-red-500",
    icon: IconCircleX,
  },
];
