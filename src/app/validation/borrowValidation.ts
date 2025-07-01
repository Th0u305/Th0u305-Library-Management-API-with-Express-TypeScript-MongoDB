import { z } from "zod"

export const createBorrowSchema = z.object({
  book: z.string().min(1, "Book ID is required"),
  quantity: z.number().min(1, "Quantity must be a positive number"),
  dueDate: z.string().transform((str) => new Date(str))
})