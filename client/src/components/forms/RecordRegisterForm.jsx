import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "@/lib/axios";
import {
  CrimeType,
  EvidenceType,
  GenderOptions,
  IdentificationTypes,
  RegisterFormDefaultValues,
} from "@/constants";
import { RegisterFormValidation } from "@/lib/validation";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { FileUploader } from "../FileUploader";
import { Officer } from "@/constants";
import SubmitButton from "../SubmitButton";
import { Button } from "../ui/button";

const RecordRegisterForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { logout, user } = useAuth0();

  const form = useForm({
    resolver: zodResolver(RegisterFormValidation),
    defaultValues: {
      ...RegisterFormDefaultValues,
    },
  });

  console.log(form.formState.errors)

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const crime_id = "CR-" + Math.floor(1000 + Math.random() * 9000);
      const oname = Officer.find((officer) => officer.email === user?.email);
      const crimeReport = {
        crimeID: crime_id,
        title: values.title,
        type: values.type,
        date: values.date,
        location: values.location,
        victim: {
          name: values.victim.name,
          contact: values.victim.contact,
          email: values.victim.email,
          address: values.victim.address,
          gender: values.victim.gender,
          econtact: values.victim.econtact,
          ename: values.victim.ename,
        },
        suspect: {
          name: values.suspect.name,
          img: "/pp.jpg",
          gender: values.suspect.gender,
          age: values.suspect.age,
          address: values.suspect.address,
          contact: values.suspect.contact,
          identificationType: values.suspect.identificationType,
          identificationNumber: values.suspect.identificationNumber,
        },
        evidence: {
          evidenceType: values.evidence.evidenceType,
          evidenceDescription: values.evidence.evidenceDescription,
          evidenceImage: "/id.jpg",
        },
        status: values.status,
        officerInCharge: values.officerInCharge,
        firno: values.firno,
        filedby: oname.name,
        reportStatus: values.reportStatus,
        caseDescription: values.caseDescription,
      };
      const res = await axios.post("/add", crimeReport);
      if (res.status === 201) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-12"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome</h1>
          <div className="flex w-full justify-between items-center">
            <p className="text-dark-700">Add new records</p>
            <Button
              variant="outline"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Logout
            </Button>
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Crime Information</h2>
          </div>

          {/* Title */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="title"
            placeholder="Crime Title"
            label="Title"
          />

          {/* TYPE & DATE */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="type"
              label="Crime Type"
              placeholder="Select Crime type"
            >
              {CrimeType.map((type, i) => (
                <SelectItem key={type + i} value={type}>
                  {type}
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="date"
              label="Date of Crime"
            />
          </div>
          {/* Address & Officer incharge */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="location"
              label="Address"
              placeholder="Location of Crime"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="officerInCharge"
              label="Officer in Charge"
              placeholder="Officer Name"
            />
          </div>

          {/* FIR NO. & Status */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="firno"
              label="FIR Number"
              placeholder="FIR-1234"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="status"
              label="Crime Status"
              value="Closed"
              disabled
            />
          </div>
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="caseDescription"
            label="Case Description"
            placeholder="Description of the Crime"
          />
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Victim Details</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="victim.name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          {/* EMAIL & PHONE */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="victim.email"
              label="Email address"
              placeholder="johndoe@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="victim.contact"
              label="Phone Number"
              placeholder="(555) 123-4567"
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="victim.gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>

          {/* Address & Occupation */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="victim.address"
              label="Address"
              placeholder="14 street, New york, NY - 5101"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="victim.occupation"
              label="Occupation"
              placeholder="Software Engineer"
            />
          </div>

          {/* Emergency Contact Name & Emergency Contact Number */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="victim.ename"
              label="Emergency contact name"
              placeholder="Guardian's name"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="victim.econtact"
              label="Emergency contact number"
              placeholder="(555) 123-4567"
            />
          </div>
        </section>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Suspect Details</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="suspect.name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          {/* AGE & PHONE */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="suspect.contact"
              label="Phone Number"
              placeholder="(555) 123-4567"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="suspect.age"
              label="Age"
              placeholder="25"
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="suspect.gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>

          {/* Address & Type */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="suspect.address"
              label="Address"
              placeholder="14 street, New york, NY - 5101"
            />
          </div>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="suspect.identificationType"
            label="Identification Type"
            placeholder="Select identification type"
          >
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="suspect.identificationNumber"
            label="Identification Number"
            placeholder="123456789"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="suspect.img"
            label="Scanned Copy of Identification Document"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Evidence Details</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="evidence.evidenceType"
            label="Evidence Type"
            placeholder="Select Evidence type"
          >
            {EvidenceType.map((type, i) => (
              <SelectItem key={type + i} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="evidence.evidenceDescription"
            label="Evidence Description"
            placeholder="Description of the Evidence"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="evidence.evidenceImage"
            label="Photo of Evidence"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>
        <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
      </form>
    </Form>
  );
};

export default RecordRegisterForm;
