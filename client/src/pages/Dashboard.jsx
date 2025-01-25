import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getAllRecords } from "@/lib/actions/records.action";
import { useSearchParams } from "react-router";
import { PasskeyModal } from "@/components/PasskeyModal";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const records = getAllRecords();
  const { logout } = useAuth0();
  const [searchParams] = useSearchParams();
  const isAdmin = searchParams.get("admin") === "true";
  const isKey = window.localStorage.getItem("accessKey");

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      {isAdmin && <PasskeyModal />}

      <header className="admin-header">
        <p className="text-18-bold">
          Crime<span className="text-green-500">Ledger</span>
        </p>
        <div className="flex gap-6 items-center">
          <a href="/dashboard/?admin=true" className="text-green-500">
            {isKey ? "" : "Admin"}
          </a>
          <Button
            onClick={() => {
              window.localStorage.clear();
              logout({ logoutParams: { returnTo: window.location.origin } });
            }}
          >
            Logout
          </Button>
        </div>
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
            label="Total Cases"
            icon={"/assets/icons/closed.svg"}
          />
          <StatCard
            type="under-investigation"
            count={records.totalUnderInvestigation}
            label="Saved Cases"
            icon={"/assets/icons/save.svg"}
          />
          <StatCard
            type="drafted"
            count={records.totalDraftedCases}
            label="Unsaved Cases"
            icon={"/assets/icons/unsave.svg"}
          />
        </section>

        <DataTable columns={columns} data={records.crimeReports} />
      </main>
    </div>
  );
};

export default Dashboard;
