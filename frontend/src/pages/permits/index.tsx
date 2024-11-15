import { Layout } from "@/components/custom/layout";
import { UserNav } from "@/components/user-nav";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { permits } from "@/data";
import { toast } from "sonner";
import { useAppSelector } from "@/store/hooks";

export default function Pemits() {
  const { data, error } = useAppSelector((state) => state.transactions);

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
          <DataTable data={permits} columns={columns} />
        </div>
      </Layout.Body>
    </Layout>
  );
}
