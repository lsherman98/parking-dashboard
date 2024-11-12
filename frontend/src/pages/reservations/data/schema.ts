import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const reservationSchema = z.object({
  id: z.string(),
  status: z.string(),
  location: z.string(),
  license_plate: z.string(),
  date: z.string(),
  session_start: z.string(),
  session_end: z.string(),
  rate: z.string(),
  hours: z.string(),
  phone_number: z.string(),
  total: z.string(),
  tax: z.string(),
  service_fee: z.string(),
})

export type Reservation = z.infer<typeof reservationSchema>
