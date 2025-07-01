# Library Management System

A comprehensive Library Management System built with Express.js, TypeScript, and MongoDB using Mongoose.

## Features

### 🎯 Core Functionality
- **Book Management**: Create, read, update, and delete books
- **Borrowing System**: Borrow books with automatic inventory management
- **Advanced Filtering**: Filter books by genre, sort by various fields
- **Aggregation Analytics**: Generate borrowing summaries using MongoDB aggregation

### 🛠️ Technical Features
- **TypeScript**: Full type safety and IntelliSense support
- **Mongoose ODM**: Schema validation, middleware, and advanced querying
- **Zod Validation**: Runtime input validation with detailed error messages
- **Business Logic**: Automatic availability updates and inventory control
- **Error Handling**: Comprehensive error handling with consistent API responses

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd library-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/library-management
   PORT=5000
   NODE_ENV=development
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the application**
   ```bash
   # Development mode with hot reload
   npm run dev
   
   # Build and run production
   npm run build
   npm start
   ```

## API Documentation

### Book Management

#### Create Book
```http
POST /api/books
Content-Type: application/json

{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}
```

#### Get All Books (with filtering)
```http
GET /api/books?filter=SCIENCE&sortBy=title&sort=asc&limit=10
```

#### Get Book by ID
```http
GET /api/books/:bookId
```

#### Update Book
```http
PUT /api/books/:bookId
Content-Type: application/json

{
  "copies": 50
}
```

#### Delete Book
```http
DELETE /api/books/:bookId
```

### Borrowing System

#### Borrow a Book
```http
POST /api/borrow
Content-Type: application/json

{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

#### Get Borrowing Summary
```http
GET /api/borrow
```

## Architecture Overview

### 📁 Project Structure
```
src/
├── config/          # Database configuration
├── controllers/     # Request handlers and business logic
├── middleware/      # Custom middleware functions
├── models/          # Mongoose schemas and models
├── routes/          # Express route definitions
├── types/           # TypeScript type definitions
├── validators/      # Zod validation schemas
└── server.ts        # Application entry point
```

### 🔧 Key Design Patterns

1. **MVC Architecture**: Clear separation of concerns with Models, Views (JSON responses), and Controllers
2. **Middleware Pattern**: Validation, error handling, and request processing
3. **Repository Pattern**: Data access abstraction through Mongoose models
4. **Schema Validation**: Two-layer validation with Mongoose and Zod

### 🎨 Technical Highlights

- **Instance Methods**: Books can update their own availability status
- **Static Methods**: Class-level operations for finding available books
- **Mongoose Middleware**: Pre and post hooks for automatic data processing
- **Aggregation Pipeline**: Complex data analysis for borrowing statistics
- **Type Safety**: Full TypeScript integration with proper interfaces

## Testing the API

You can test the API using tools like Postman, Thunder Client, or curl. Here are some example requests:

### Example: Complete Book Workflow
1. Create a book
2. Borrow some copies
3. Check the borrowing summary
4. Update book details
5. View filtered book list

## Error Handling

The system provides comprehensive error handling with consistent response formats:

```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "received": -5
      }
    }
  }
}
```