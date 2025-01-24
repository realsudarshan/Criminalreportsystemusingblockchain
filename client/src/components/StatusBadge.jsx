import clsx from "clsx";
import { StatusIcon } from "@/constants";

export const StatusBadge = ({ status }) => {
  return (
    <div
      className={clsx("status-badge", {
        "bg-green-600": status === "closed" || status === "saved",
        "bg-blue-600": status === "underinvestigation",
        "bg-gray-600": status === "notsaved",
        "bg-red-600": status === "drafted",
      })}
    >
      <img
        src={StatusIcon[status]}
        alt="doctor"
        width={24}
        height={24}
        className="h-fit w-3"
      />
      <p
        className={clsx("status-badge", {
          "text-green-500": status === "closed" || status === "saved",
          "text-blue-500": status === "underinvestigation",
          "text-gray-300": status === "notsaved",
          "text-red-500": status === "drafted",
        })}
      >
        {status === "underinvestigation" && "Under Investigation"}
        {status === "closed" && "Closed"}
        {status === "drafted" && "Drafted"}
        {status === "saved" && "Saved"}
        {status === "notsaved" && "Not Saved"}
      </p>
    </div>
  );
};
