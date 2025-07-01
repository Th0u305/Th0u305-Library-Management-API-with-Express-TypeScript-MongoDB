import { Router } from "express"
import { borrowBook, getBorrowedBooksSummary } from "../controllers/borrow.controller"

const borrowRouter = Router()

borrowRouter.post("/borrow", borrowBook)
borrowRouter.get("/borrow", getBorrowedBooksSummary)

export default borrowRouter
