import LoginForm from "@/components/forms/LoginForm";
import { ShieldCheck } from "lucide-react";

const Login = () => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <div className="text-[28px] font-medium mb-8 flex gap-3 align-center">
            <div className="bg-green-500 text-white rounded-lg px-3 pt-[1px] pb-[2px] flex items-center justify-center">
              <ShieldCheck size={40} className="inline-block" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="font-extrabold">
                Crime<span className="text-green-500">Ledger</span>
              </span>
              <span className="text-sm">POLICE ALSO NEEDS SECURITY</span>
            </div>
          </div>

          <LoginForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              {" "}
              © 2024 CrimeLedger
            </p>
          </div>
        </div>
      </section>

      <img
        src="/assets/images/onboarding-img2.jpg"
        height={800}
        width={800}
        alt="patient"
        className="side-img max-w-[50%] rounded-l-[42px]"
      />
    </div>
  );
};

export default Login;
