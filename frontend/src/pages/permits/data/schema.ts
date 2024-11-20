import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const permitSchema = z.object({
  id: z.number(),
  status: z.enum(["active", "requested", "expired"]),
  location_code: z.string(),
  license_plate: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
});

export const createPermitFormSchema = z.object({
  location_code: z.string().min(6, { message: "Location code must be at least 6 characters" }),
  license_plate: z.string().min(3, { message: "Must be a valid license plate." }),
  start_date: z.date(),
  end_date: z.date(),
  first_name: z.string().min(3, { message: "Must be a valid name." }),
  last_name: z.string().min(3, { message: "Must be a valid name." }),
  email: z.string().email({ message: "Must be a valid email address." }),
  phone: z.string().min(10, { message: "Must be a valid phone number." }),
});

export type Permit = z.infer<typeof permitSchema>;
export type CreatePermitFormSchema = z.infer<typeof createPermitFormSchema>;
