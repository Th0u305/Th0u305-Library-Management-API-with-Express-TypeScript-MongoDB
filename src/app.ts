
import express , {Application , Request , Response } from 'express'
import bookRoutes from './app/routes/bookRoutes'
import borrowRouter from './app/routes/borrowRoutes'
import cors from 'cors';

const app : Application = express()

app.use(
  cors({
    origin: ["http://localhost:5173", `${process.env.URL__00}`],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json())

app.use("/api", bookRoutes)
app.use("/api", borrowRouter)

app.get("/", (req: Request , res: Response)=>{
    res.send("Library Management API with Express, TypeScript & MongoDB")
})

export default app;