import { z } from "zod"


const GenreEnum = z.enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"])

export const createBookSchema = z.object({
  title: z.string(),
  author: z.string(),
  genre: GenreEnum.optional(),
  isbn: z.string(),
  description: z.string().optional(),
  copies: z.number().int().min(0, 'Copies must be a positive number').nonnegative(),
  available: z.boolean()
});

export const updateBookSchema = createBookSchema.partial()

export const bookQueryValidation = z.object({
  filter: GenreEnum.optional(),
  sortBy: z.string().default("createdAt").optional(),
  sort: z.enum(["asc", "desc"]).default("desc").optional(),
  limit: z.string().optional(),
  page : z.string().optional().default("1")
})

