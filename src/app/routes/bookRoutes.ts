import { Router } from "express"
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from "../controllers/books.controller"

const bookRoutes = Router()

bookRoutes.get("/books", getAllBooks)
bookRoutes.post("/books", createBook)
bookRoutes.get("/books/:bookId", getBookById)
bookRoutes.patch("/books/:bookId", updateBook)
bookRoutes.delete("/books/:bookId", deleteBook)

export default bookRoutes
