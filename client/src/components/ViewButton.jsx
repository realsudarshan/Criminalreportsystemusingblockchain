import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ViewModal from "./ViewModal";
const ViewButton = ({ title, records }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Button variant="ghost" onClick={() => setIsModalOpen(true)}>
        {title}
      </Button>
      <ViewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        crimeData={records}
      />
    </>
  );
};

export default ViewButton;
