import { z } from "zod";

export const UserFormValidation = z.object({
  name: z.string(),
  fingerprint: z.string(),
});

export const RegisterFormValidation = z.object({
  crimeID: z.string().optional(),
  title: z.string().nonempty("Title is required"),
  type: z.string().nonempty("Type is required"),
  date: z.coerce.date(),
  location: z.string().nonempty("Location is required"),
  victim: z.object({
    name: z.string().nonempty("Name is required"),
    contact: z
      .string()
      .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
    email: z.string().email("Invalid email address"),
    address: z.string().nonempty("Address is required"),
    occupation: z.string().nonempty("Occupation is required"),
    gender: z.string().nonempty("Required"),
    econtact: z
      .string()
      .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
    ename: z.string().nonempty("Emergency contact name is required"),
  }),
  suspect: z.object({
    name: z.string().min(5, "Name must be at least 5 characters"),
    img: z.array(z.any()).nonempty("At least one profile image is required"),
    contact: z
      .string()
      .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
    gender: z.string().nonempty("Required"),
    address: z
      .string()
      .min(5, "Address must be at least 5 characters")
      .max(50, "Address must be at most 50 characters"),
    age: z.string().nonempty("Age is required"),
    identificationType: z.string().nonempty("Identification type is required"),
    identificationNumber: z.string().optional(),
  }),
  evidence: z.object({
    evidenceType: z.string().nonempty("Evidence type is required"),
    evidenceDescription: z
      .string()
      .nonempty("Evidence description is required"),
    evidenceImage: z
      .array(z.any())
      .nonempty("At least one evidence image is required"),
  }),
  status: z.enum([
    "closed",
    "saved",
    "underinvestigation",
    "drafted",
    "notsaved",
  ]),
  officerInCharge: z.string().nonempty("Officer in charge is required"),
  firno: z.string().nonempty("FIR number is required"),
  filedby: z.string().optional(),
  reportStatus: z.string().optional(),
  caseDescription: z.string().nonempty("Case description is required"),
});
