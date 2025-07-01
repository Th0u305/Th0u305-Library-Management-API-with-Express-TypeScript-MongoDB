import { type Document, model, Schema } from "mongoose"
import { IBook } from "../types/bookInterface"

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      enum: {
        values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
        message: "Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY",
      },
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    copies: {
      type: Number,
      required: [true, "Copies is required"],
      min: [0, "Copies must be a non-negative number"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey : false,
    timestamps: true,
  },
)

// Instance method to update availability based on copies
bookSchema.methods.updateAvailability = async function (): Promise<void> {
  this.available = this.copies > 0
  await this.save()
}

// Pre-save middleware to automatically update availability
bookSchema.pre("save", function (next) {
  if (this.isModified("copies")) {
    this.available = this.copies > 0
  }
  next()
})

// Post-save middleware for logging
bookSchema.post("save", (doc) => {
  console.log(`Book "${doc.title}" has been saved with ${doc.copies} copies`)
})


export const Book = model<IBook>("books", bookSchema)
