import { IconCurrencyDollar, IconGavel, IconLayoutDashboard, IconMapPin, IconSettings, IconTag } from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/dashboard',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Transactions',
    label: '',
    href: '/transactions',
    icon: <IconCurrencyDollar size={18} />,
  },
  {
    title: 'Enforcement',
    label: '',
    href: '/enforcement',
    icon: <IconGavel size={18} />,
  },
  {
    title: 'Locations',
    label: '',
    href: '/locations',
    icon: <IconMapPin size={18} />,
  },
  {
    title: 'Permits',
    label: '',
    href: '/permits',
    icon: <IconTag size={18} />,
  },
  {
    title: 'Settings',
    label: '',
    href: '/settings',
    icon: <IconSettings size={18} />,
  },
]
