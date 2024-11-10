import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const transactionSchema = z.object({
  id: z.string(),
  status: z.string(),
  location: z.string(),
  date: z.string(),
  transaction_id: z.string(),
  license_plate: z.string(),
  email: z.string().optional(),
  cellphone: z.string().optional(),
  name: z.string().optional(),
  base_rate: z.number(),
  tax: z.number(),
  city_tax: z.number().optional(),
  county_tax: z.number().optional(),
  service_fee: z.number(),
  payment_gateway_fee: z.number(),
  total: z.number(),
})

export type Transaction = z.infer<typeof transactionSchema>
