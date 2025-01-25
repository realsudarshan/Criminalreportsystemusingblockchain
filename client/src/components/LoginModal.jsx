import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "./ui/button";

export const LoginModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={"shad-primary-btn w-full"}>Get Started</Button>
      </DialogTrigger>
      <DialogContent className="">
      </DialogContent>  
    </Dialog>
  );
};
