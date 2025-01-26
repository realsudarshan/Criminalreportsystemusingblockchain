import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ValidateModal  from "@/components/ValidateModal";


const ValidateButton = ({title,id}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)} variant="outline">
        {title}
      </Button>
      <ValidateModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        crimeId={id}
      />
    </>
  );
};

export default ValidateButton;
