
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { UserFormValidation } from "@/lib/validation";

import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import  FingerprintField from "../FingerprintField";

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [officerName, setOfficerName] = useState("");

  const handleFingerprintCapture = (name) => {
    setOfficerName(name);
  };

  const form = useForm({
    resolver: zodResolver(UserFormValidation),
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    console.log("Form Values:", values);
    console.log("Form Errors:", form.formState.errors);

    try {
      const user = {
        name: values.name,
        fingerprint: "whhue73773",
      };

      // const newUser = await createUser(user);
      const newUser = {
        id: "1234",
      };

      if (newUser) {
        navigate(`/${newUser.id}/register`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there</h1>
          <p className="text-dark-700">Get started with records.</p>
        </section>
        <FingerprintField onCapture={handleFingerprintCapture} />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          value={officerName}
          label="Full Name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
          disabled
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};


export default LoginForm;