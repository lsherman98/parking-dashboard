import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/custom/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import UpdatePermitDialog from "./update-permit-dialog";
import { permitSchema } from "../data/schema";

export function DataTableRowActions({ row }: { row: any }) {
  const permit = permitSchema.parse(row.original);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <UpdatePermitDialog permit={permit} />
        <DropdownMenuItem>Approve Permit</DropdownMenuItem>
        <DropdownMenuItem>Cancel Permit</DropdownMenuItem>
        <DropdownMenuItem>Deny Permit</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
