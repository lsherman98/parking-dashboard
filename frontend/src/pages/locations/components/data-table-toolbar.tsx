import { Table } from "@tanstack/react-table";
import { Button } from "@/components/custom/button";
import { DataTableViewOptions } from "./data-table-view-options";
import { Input } from "@/components/ui/input";
import { statuses } from "../data/data";
import AddLocationDialog from "./add-location-dialog";
import { IconRefresh } from "@tabler/icons-react";
import { fetchLocationDataThunk, setStatusFilter } from "@/store/slices/locationsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { DataTableFacetedFilter } from "@/components/data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const dispatch = useAppDispatch();
  const { statusFilter, loading } = useAppSelector((state) => state.locations);

  const handleRefresh = () => dispatch(fetchLocationDataThunk());
  const handleStatusChange = (statuses: string[]) => dispatch(setStatusFilter(statuses));

  useEffect(() => {
    dispatch(fetchLocationDataThunk());
  }, [statusFilter]);

  return (
    <div className="flex flex-wrap items-center gap-2 sm:my-4">
      <AddLocationDialog />
      <Input
        placeholder="Search"
        value={table.getState().globalFilter ?? ""}
        onChange={(event) => table.setGlobalFilter(event.target.value)}
        className="h-8 w-[150px] lg:w-[175px]"
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
