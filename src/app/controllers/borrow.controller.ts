import type { Request, Response } from "express";
import { Book } from "../models/BookModel";
import { createBorrowSchema } from "../validation/borrowValidation";
import { Borrow } from "../models/BorrowModels";
import { defaultError } from "../middleware/apiResponse";

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const validatedData = createBorrowSchema.parse(req.body);
    const { book: bookId, quantity, dueDate } = validatedData;

    // Find the book
    const book = await Book.findById(bookId);

    if (book) {

      // Create borrow record
      const borrow = new Borrow({book: bookId,quantity,dueDate,});

      // Update book copies and availability
      book.copies -= quantity;
      await book.updateAvailability(); // Using instance method

      // Save borrow record
      await borrow.save();

      res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrow,
      });
    }
  } catch (error) {
    defaultError(error, res);
  }
};

export const getBorrowedBooksSummary = async (req: Request, res: Response) => {
  try {
    // Using aggregation pipeline
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
  
    ]);

    res.json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    defaultError(error, res);
  }
};
