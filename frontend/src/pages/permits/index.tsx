import { Layout } from "@/components/custom/layout";
import { UserNav } from "@/components/user-nav";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { toast } from "sonner";
import { useAppSelector } from "@/store/hooks";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export default function Permits() {
  const { data, error } = useAppSelector((state) => state.permits);
  const isMobile = useBreakpoint();

  if (error) {
    toast(`Something went wrong. Please try again later.`, { description: error });
  }

  return (
    <Layout>
      <Layout.Body>
        <div className="mb-1 flex items-center justify-between space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Permits</h1>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <DataTable data={data.tableData} columns={columns} stats={data.stats} isMobile={isMobile} />
        </div>
      </Layout.Body>
    </Layout>
  );
}
