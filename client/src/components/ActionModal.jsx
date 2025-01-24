import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import "react-datepicker/dist/react-datepicker.css";

export const ActionModal = ({ type, title }) => {
  
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={type === "Edit" ? "outline" : "ghost"}
          className={`capitalize ${
            type === "Save" && "text-green-500 bg-green-600"
          } ${type === "Edit" && "text-blue-500"}`}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{title}</DialogTitle>
          <DialogDescription>
            Please fill in the following details to {type} records
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
