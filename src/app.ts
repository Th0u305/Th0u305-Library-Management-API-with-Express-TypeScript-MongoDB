
import express , {Application , Request , Response } from 'express'
import bookRoutes from './app/routes/bookRoutes'
import borrowRouter from './app/routes/borrowRoutes'

const app : Application = express()

app.use(express.json())

app.use("/api", bookRoutes)
app.use("/api", borrowRouter)

app.get("/", (req: Request , res: Response)=>{
    res.send("Library Management API with Express, TypeScript & MongoDB")
})

export default app;