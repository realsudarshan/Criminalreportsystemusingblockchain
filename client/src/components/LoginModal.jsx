import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "./ui/button";
import "@passageidentity/passage-auth";

export const LoginModal = () => {
  const [open, setOpen] = useState(false);
  const app_id = import.meta.env.VITE_PASSAGE_APP_ID

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={"shad-primary-btn w-full"}>Get Started</Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
          <passage-auth app-id={app_id} />
      </DialogContent>
    </Dialog>
  );
};
