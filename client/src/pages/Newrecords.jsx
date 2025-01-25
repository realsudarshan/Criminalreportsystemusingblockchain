import RecordRegisterForm from "@/components/forms/RecordRegisterForm";
import { getUser } from "@/lib/actions/user.actions";

import { ShieldCheck } from "lucide-react";

const Newrecords = () => {
  const user = getUser(1234);
  console.log(user);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <div className="text-[28px] font-medium mb-8 flex gap-3 align-center">
            <div className="bg-green-500 text-white rounded-lg px-2 pt-[1px] pb-[3px]">
              <ShieldCheck size={36} className="inline-block" />
            </div>
            CrimeLedger
          </div>

          <RecordRegisterForm user={user} />

          <p className="copyright py-12">© 2024 CrimeLedger</p>
        </div>
      </section>

      <img
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="Records"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Newrecords;
