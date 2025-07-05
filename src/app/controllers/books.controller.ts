import { Request, Response, NextFunction } from "express";
import { Book } from "../models/BookModel";
import { bookQueryValidation, createBookSchema, updateBookSchema } from "../validation/bookValidation";
import { defaultError, errorHandler } from "../middleware/apiResponse";



// // Get all books with filtering and sorting
export const getAllBooks = async (req: Request,res: Response, next : NextFunction ) => {

  try {
    
    const bookQuery = bookQueryValidation.parse(req.query);
    
    const { filter, sortBy, sort, limit = 10 } = bookQuery;
    

    const query: any = {};
    if (filter) {
      query.genre = filter;
    }

    let sortOptions: any = {};
    if (sortBy) {
      sortOptions[sortBy as string] = sort === "desc" ? -1 : 1;
    }

    const books = await Book.find(query).sort(sortOptions).limit(Number(limit));
    
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });

  } catch (error) {
    defaultError(error,res)
    next(error)
  }
};

// Create a new book
export const createBook = async (req: Request,res: Response, next: NextFunction) => {
    try {
      const validatedData = createBookSchema.parse(req.body);      
      const book = await Book.create(validatedData)
      await book.save();
      res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: book,
      });
    } catch (error: any) {
      errorHandler(error, res, req)
      next(error)
    }
};

// Get a single book by ID
export const getBookById = async (req: Request,res: Response, next :NextFunction ) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      res.status(404).json({ success: false, message: "Book not found" });
    } else {
      res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: book,
      });
    }
  } catch (error) {
    errorHandler(error, res, req)
    next(error)
  }
};

// Update a book by ID
export const updateBook = async (req: Request,res: Response,next: NextFunction) => {
  try {
    const validatedData = updateBookSchema.parse(req.body);
    const book = await Book.findByIdAndUpdate(req.params.bookId,validatedData,{ new: true });
    if (!book) {
      res.status(404).json({ success: false, message: "Book not found" });
    } else {
      // await book.updateAvailability(); // Using instance method
      res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: book,
      });
    }
  } catch (error) {
    errorHandler(error, res, req)
    next(error)
  }
};

// // Delete a book by ID
export const deleteBook = async (req: Request,res: Response,next: NextFunction) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);
    if (!book) {
      res.status(404).json({ success: false, message: "Book not found" });
    } else {
      res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: null,
      });
    }
  } catch (error) {
    errorHandler(error, res, req)
    next(error);
  }
};
