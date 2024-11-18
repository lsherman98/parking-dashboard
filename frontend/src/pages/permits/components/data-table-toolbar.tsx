import { Table } from "@tanstack/react-table";

import { Button } from "@/components/custom/button";
import { DataTableViewOptions } from "./data-table-view-options";

import { Input } from "@/components/ui/input";
import { statuses } from "../data/data";
import { MultiSelect } from "@/components/custom/multi-select";
import { useEffect } from "react";

import AddPermitDialog from "./add-permit-dialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPermitDataThunk, setLocationFilter, setStatusFilter } from "@/store/slices/permitsSlice";
import { IconRefresh } from "@tabler/icons-react";
import { DataTableFacetedFilter } from "@/components/data-table-faceted-filter";
import { database } from "@/data/database";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const dispatch = useAppDispatch();

  const { locationFilter, statusFilter, loading } = useAppSelector((state) => state.permits);
  const handleLocationChange = (locations: string[]) => dispatch(setLocationFilter(locations));
  const handleStatusChange = (selectedValues: string[]) => dispatch(setStatusFilter(selectedValues));

  useEffect(() => {
    dispatch(fetchPermitDataThunk());
  }, [locationFilter, statusFilter]);

  const handleRefresh = () => dispatch(fetchPermitDataThunk());

  return (
    <div className="flex flex-wrap items-center gap-2 sm:my-4">
      <AddPermitDialog />
      <Input
        placeholder="Search"
        value={table.getState().globalFilter ?? ""}
        onChange={(event) => table.setGlobalFilter(event.target.value)}
        className="h-8 w-[150px] lg:w-[175px]"
        disabled={loading}
      />
      <MultiSelect
        options={database.locations.map((location) => ({ label: location.location_code, value: location.location_code }))}
        onValueChange={handleLocationChange}
        defaultValue={locationFilter}
        placeholder="Locations"
        variant="inverted"
        animation={2}
        maxCount={3}
        className="min-h-9 w-auto min-w-24 shadow-none"
        disabled={loading}
      />
      {table.getColumn("status") && (
        <DataTableFacetedFilter
          column={table.getColumn("status")}
          title="Status"
          options={statuses}
          onSelectionChange={handleStatusChange}
          disabled={loading}
        />
      )}
      <IconRefresh
        size={24}
        onClick={handleRefresh}
        className={`${loading ? "animate-[spin_1s_linear_infinite_reverse] cursor-not-allowed opacity-50" : "cursor-pointer"}`}
      />
      <div className="xl:flex-grow"></div>
      <DataTableViewOptions table={table} />
      <Button size="sm" className="h-8" variant="secondary">
        Download Report
      </Button>
    </div>
  );
}
