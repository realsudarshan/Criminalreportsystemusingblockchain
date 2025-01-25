import { Officer } from "@/constants";
import { StatusBadge } from "../StatusBadge";
import { ActionModal } from "../ActionModal";

const isKey = window.localStorage.getItem("accessKey");

export const columns = [
  {
    header: "Crime ID",
    cell: ({ row }) => {
      const record = row.original;
      return <p className="text-14-medium ">{record.crimeID}</p>;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const record = row.original;
      return <p className="text-14-medium ">{record.title}</p>;
    },
  },
  {
    accessorKey: "suspect",
    header: "Suspect",
    cell: ({ row }) => {
      const record = row.original;
      return <p className="text-14-medium ">{record.suspect.name}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const record = row.original;
      return (
        <div className="min-w-[100px]">
          <StatusBadge status={record.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "fileby",
    header: "Added By",
    cell: ({ row }) => {
      const record = row.original;

      const officer = Officer.find(
        (officer) => officer.name === record.filedby
      );

      console.log(officer);

      return (
        <div className="flex items-center gap-3">
          <img
            src={officer?.img}
            alt="doctor"
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">{officer?.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "rstatus",
    header: "Record Status",
    cell: ({ row }) => {
      const record = row.original;
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={record.reportStatus} />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const records = row.original;
      return (
        <div className="flex gap-1">
          {records.reportStatus === "saved" ? (
            <ActionModal type="Validate" title="Verify Records" />
          ) : (
            <>
              {records.status === "closed" && isKey && (
                <ActionModal type="Save" title="Save Records" />
              )}
            </>
          )}

          <ActionModal type="View" title="View Records" description="" />
        </div>
      );
    },
  },
];
