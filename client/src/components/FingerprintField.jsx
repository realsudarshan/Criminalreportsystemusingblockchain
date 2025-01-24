import { useState } from "react";
import { Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";

function FingerprintField({ onCapture }) {
  const [status, setStatus] = useState("ready");

  const handleScan = () => {
    setStatus("scanning");
    // Simulate scanning process
    setTimeout(() => {
      setStatus("captured");
      onCapture("Utsav Bhattarai"); // Simulate captured name
    }, 2000);
  };

  return (
    <div className="w-full flex-1">
      <div className="border-stone-700	border rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-center mb-4">
          <Fingerprint className="w-16 h-16 text-primary" />
        </div>
        <div className="text-center mb-4">
          <p className="text-lg font-semibold">
            {status === "ready" && "Ready to Scan"}
            {status === "scanning" && "Scanning..."}
            {status === "captured" && "Fingerprint Captured"}
          </p>
        </div>
        <Button
          onClick={handleScan}
          disabled={status === "scanning"}
          className="w-full"
        >
          {status === "captured" ? "Scan Again" : "Scan Fingerprint"}
        </Button>
      </div>
    </div>
  );
}

export default FingerprintField;