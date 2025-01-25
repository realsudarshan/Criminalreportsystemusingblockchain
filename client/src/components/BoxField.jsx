import { ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router";
import { Officer } from "@/constants";

function BoxField() {
  const { loginWithRedirect, user } = useAuth0();
  const navigate = useNavigate();
  console.log(user);

  useEffect(() => {
    if (user) {
      const officer = Officer.find((officer) => officer.email === user.email);
      if (officer) {
        const role = officer.role[0];
        localStorage.setItem("userRole", role);
        if (role === "add") {
          const userId = user.sub.split("|")[1];
          navigate(`/${userId}/newrecords`);
        } else if (role === "validator" || role === "view") {
          navigate("/dashboard");
        }
      }
    }
  }, [user, navigate]);

  return (
    <div className="w-full flex-1">
      <div className="border-stone-700	border rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-center mb-4">
          <ShieldCheck className="w-16 h-16 text-primary" />
        </div>
        <div className="text-center mb-4">
          <p className="text-lg font-semibold">Ready to login</p>
        </div>
        {/* <LoginModal/> */}
        <Button
          className="shad-primary-btn w-full"
          onClick={() =>
            loginWithRedirect({
              authorizationParams: {
                connection: "google-oauth2",
                prompt: "login",
              },
            })
          }
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
export default BoxField;
