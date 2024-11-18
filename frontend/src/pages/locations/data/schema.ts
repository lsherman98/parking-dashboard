import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const locationSchema = z.object({
  id: z.number(),
  status: z.enum(['active', 'deactivated']),
  location_code: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip_code: z.string(),
  lot_size: z.number(),
})

export const createLocationFormSchema = z.object({
  location_code: z.string().min(6, { message: 'Location code must be at least 6 characters' }),
  address: z.string().min(3, { message: 'Must be a valid address.' }),
  city: z.string().min(3, { message: 'Must be a valid city.' }),
  state: z.string(),
  zip_code: z.string().min(5, { message: 'Must be a valid zip code.' }),
  lot_size: z.number().min(1, { message: 'Lot size must be at least 1' }),
  activate: z.boolean().default(false),
})

export type Location = z.infer<typeof locationSchema>
export type CreateLocationFormSchema = z.infer<typeof createLocationFormSchema>
