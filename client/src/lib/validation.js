import { z } from "zod";

export const UserFormValidation = z.object({
  name: z.string(),
  fingerprint: z.string(),
});

