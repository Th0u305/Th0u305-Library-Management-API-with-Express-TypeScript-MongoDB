import { type Document, model, Schema } from "mongoose"

export interface IBorrow extends Document {
  book: Schema.Types.ObjectId
  quantity: number
  dueDate: Date
  createdAt: Date
  updatedAt: Date
}

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book ID is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be a positive number"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
  },
  {
    timestamps: true,
    versionKey : false
  },
)

// Pre-save middleware for logging
borrowSchema.pre("save", function (next) {
  console.log(`Borrowing ${this.quantity} copies of book ${this.book}`)
  next()
})

export const Borrow = model<IBorrow>("borrow", borrowSchema)


