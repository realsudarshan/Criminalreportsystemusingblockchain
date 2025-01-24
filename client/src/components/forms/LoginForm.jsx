import { Form } from "@/components/ui/form";
import "react-phone-number-input/style.css";
import BoxField from "../BoxField";

const LoginForm = () => {
  return (
    <Form>
      <form className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there</h1>
          <p className="text-dark-700">Get started with records.</p>
        </section>
        <BoxField />
      </form>
    </Form>
  );
};

export default LoginForm;
