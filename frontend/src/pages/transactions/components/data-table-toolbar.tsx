import { Table } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import { DataTableViewOptions } from './data-table-view-options'

import { statuses } from '../data/data'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { IconRefresh } from '@tabler/icons-react'
import { MultiSelect } from '@/components/custom/multi-select'
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import { Input } from '@/components/ui/input'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const getCurrentMonth = () => {
    return new Date().toLocaleString('default', { month: 'long' })
  }

  const locationData = [
    { value: 'CH100', label: 'CH100' },
    { value: 'KY400', label: 'KY400' },
  ]

  const [locations, setLocations] = useState<string[]>([])
  const [weekFilter, setWeekFilter] = useState('11/1 - 11/7')
  const [monthFilter, setMonthFilter] = useState(getCurrentMonth())
  const [dateFilter, setDateFilter] = useState('month')
  const [yearFilter, setYearFilter] = useState('2024')

  return (
      <div className="flex flex-wrap items-center gap-2 sm:my-4">
          <Input
              placeholder="Search"
              value={table.getState().globalFilter ?? ""}
              onChange={(event) => table.setGlobalFilter(event.target.value)}
              className="h-8 w-[150px] lg:w-[175px]"
          />
          <MultiSelect
              options={locationData}
              onValueChange={setLocations}
              defaultValue={locations}
              placeholder="Locations"
              variant="inverted"
              animation={2}
              maxCount={3}
              className="min-h-9 w-auto min-w-24 shadow-none"
          />
          <Tabs
              orientation="vertical"
              defaultValue={dateFilter}
              className="space-y-4"
              onValueChange={setDateFilter}
          >
              <TabsList>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="90">90 Days</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                  <TabsTrigger value="range">Range</TabsTrigger>
              </TabsList>
          </Tabs>
          {dateFilter === "range" && <DatePickerWithRange />}
          {dateFilter === "week" && (
              <Select value={weekFilter} onValueChange={setWeekFilter}>
                  <SelectTrigger className="w-36 shadow-none">
                      <SelectValue>{weekFilter}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                      <SelectGroup>
                          <SelectItem value="10/1 - 10/7">
                              11/1 - 11/7
                          </SelectItem>
                          <SelectItem value="10/8 - 10/16">
                              11/8 - 11/16
                          </SelectItem>
                          <SelectItem value="10/17 - 10/23">
                              11/17 - 11/23
                          </SelectItem>
                          <SelectItem value="10/24 - 10/31">
                              11/24 - 11/31
                          </SelectItem>
                      </SelectGroup>
                  </SelectContent>
              </Select>
          )}
          {dateFilter === "month" && (
              <Select value={monthFilter} onValueChange={setMonthFilter}>
                  <SelectTrigger className="w-32 shadow-none">
                      <SelectValue>{monthFilter}</SelectValue>
                  </SelectTrigger>
                  <SelectContent className="max-h-[var(--radix-select-content-available-height)]">
                      <SelectGroup>
                          <SelectItem value="January">January</SelectItem>
                          <SelectItem value="February">February</SelectItem>
                          <SelectItem value="March">March</SelectItem>
                          <SelectItem value="April">April</SelectItem>
                          <SelectItem value="May">May</SelectItem>
                          <SelectItem value="June">June</SelectItem>
                          <SelectItem value="July">July</SelectItem>
                          <SelectItem value="August">August</SelectItem>
                          <SelectItem value="September">September</SelectItem>
                          <SelectItem value="October">October</SelectItem>
                          <SelectItem value="November">November</SelectItem>
                          <SelectItem value="December">December</SelectItem>
                      </SelectGroup>
                  </SelectContent>
              </Select>
          )}
          {dateFilter === "year" && (
              <Select value={yearFilter} onValueChange={setYearFilter}>
                  <SelectTrigger className="w-36 shadow-none">
                      <SelectValue>{yearFilter}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                      <SelectGroup>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2023">2023</SelectItem>
                          <SelectItem value="2022">2022</SelectItem>
                      </SelectGroup>
                  </SelectContent>
              </Select>
          )}
          {table.getColumn("status") && (
              <DataTableFacetedFilter
                  column={table.getColumn("status")}
                  title="Status"
                  options={statuses}
              />
          )}
          <IconRefresh size={24} />
          <div className="xl:flex-grow"></div>
          <DataTableViewOptions table={table} />
          <Button size="sm" className="h-8" variant="secondary">
              Download Report
          </Button>
      </div>
  );
}
