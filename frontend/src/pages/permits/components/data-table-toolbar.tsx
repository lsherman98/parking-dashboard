import { Table } from "@tanstack/react-table";

import { Button } from "@/components/custom/button";
import { DataTableViewOptions } from "./data-table-view-options";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Input } from "@/components/ui/input";
import { statuses } from "../data/data";
import { MultiSelect } from "@/components/custom/multi-select";
import { useState } from "react";

import { locations } from "@/data";
import AddPermitDialog from "./add-permit-dialog";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const [locationFilter, setLocationFilter] = useState<string[]>([]);

    return (
      <div className="flex flex-wrap items-center gap-2 sm:my-4">
        <AddPermitDialog />
        <Input
          placeholder="Search"
          value={table.getState().globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[175px]"
        />
        <MultiSelect
          options={locations.map((location) => ({ label: location.location_code, value: location.location_code }))}
          onValueChange={setLocationFilter}
          defaultValue={locationFilter}
          placeholder="Locations"
          variant="inverted"
          animation={2}
          maxCount={3}
          className="min-h-9 w-auto min-w-24 shadow-none"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter column={table.getColumn("status")} title="Status" options={statuses} />
        )}
        <div className="xl:flex-grow"></div>
        <DataTableViewOptions table={table} />
        <Button size="sm" className="h-8" variant="secondary">
          Download Report
        </Button>
      </div>
    );
}
