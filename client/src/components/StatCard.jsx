import React from "react";
import clsx from "clsx";

export const StatCard = ({ count = 0, label, icon, type }) => {
  return (
    <div
      className={clsx("stat-card", {
        "bg-closed": type === "closed",
        "bg-pending": type === "under-investigation",
        "bg-cancelled": type === "drafted",
      })}
    >
      <div className="flex items-center gap-4">
        <img
          src={icon}
          height={32}
          width={32}
          alt="appointments"
          className="size-8 w-fit"
        />
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>

      <p className="text-14-regular">{label}</p>
    </div>
  );
};
