import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const reservationSchema = z.object({
  id: z.number(),
  status: z.enum(['paid', 'failed', 'refunded']),
  location_code: z.string(),
  license_plate: z.string(),
  date: z.string(),
  session_start: z.string(),
  session_end: z.string(),
  rate: z.number(),
  hours: z.number(),
  phone_number: z.string(),
  total: z.number(),
  tax: z.number(),
  service_fee: z.number(),
})

export type Reservation = z.infer<typeof reservationSchema>
