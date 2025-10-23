import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const violationSchema = z.object({
  id: z.number(),
  status: z.enum(["paid", "cancelled", "not_sent", "sent"]),
  location_code: z.string(),
  date: z.string(),
  session_start: z.string(),
  session_end: z.string(),
  license_plate: z.string(),
  ticket_amount: z.number(),
  transaction_id: z.number().optional(),
});

export type Violation = z.infer<typeof violationSchema>;
