import { ShieldCheck } from "lucide-react";
import { LoginModal } from "./LoginModal";

function BoxField() {
  return (
    <div className="w-full flex-1">
      <div className="border-stone-700	border rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-center mb-4">
          <ShieldCheck className="w-16 h-16 text-primary" />
        </div>
        <div className="text-center mb-4">
          <p className="text-lg font-semibold">Ready to login</p>
        </div>
        <LoginModal/>
      </div>
    </div>
  );
}
export default BoxField;
