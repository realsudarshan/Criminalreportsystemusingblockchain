import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getAllRecords } from "@/lib/actions/records.action";
import { useSearchParams } from "react-router";
import { PasskeyModal } from "@/components/PasskeyModal";

const Dashboard = () => {
  const records = getAllRecords();
  const [searchParams] = useSearchParams();
  const isAdmin = searchParams.get("admin") === "true";
  const isKey = window.localStorage.getItem("accessKey");

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      {isAdmin && <PasskeyModal />}

      <header className="admin-header">
        <p className="text-16-semibold">CrimeLedger</p>
        <a href="/dashboard/?admin=true" className="text-green-500">
          {isKey ? "" : "Admin"}
        </a>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4 flex flex-col items-start">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">Manage New Records</p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="closed"
            count={records.totalClosedCases}
            label="Closed Cases"
            icon={"/assets/icons/closed.svg"}
          />
          <StatCard
            type="under-investigation"
            count={records.totalUnderInvestigation}
            label="Under Investigation"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="drafted"
            count={records.totalDraftedCases}
            label="Drafted cases"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>

        <DataTable columns={columns} data={records.crimeReports} />
      </main>
    </div>
  );
};

export default Dashboard;
