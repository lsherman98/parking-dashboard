import { Table } from "@tanstack/react-table";
import { Button } from "@/components/custom/button";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Input } from "@/components/ui/input";
import { statuses } from "../data/data";
import AddLocationDialog from "./add-location-dialog";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:my-4">
      <AddLocationDialog />
      <Input
        placeholder="Search"
        value={table.getState().globalFilter ?? ""}
        onChange={(event) => table.setGlobalFilter(event.target.value)}
        className="h-8 w-[150px] lg:w-[175px]"
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
