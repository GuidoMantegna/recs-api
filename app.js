import express, { json } from "express"
import cors from "cors"
import { requestsRouter } from "./routes/requestsRoutes.js"
import { repliesRouter } from "./routes/repliesRoutes.js"
import { usersRouter } from "./routes/usersRoutes.js"
import { ErrorController } from "./controllers/errorController.js"
import AppError from "./util/AppError.js"

const ACCEPTED_ORIGINS = [
  "http://localhost:8080",
  "http://localhost:1234",
  "http://localhost:5173",
  "http://localhost:3000",
  "https://recs-tailwind.vercel.app",
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true)
      }

      if (!origin) {
        return callback(null, true)
      }

      return callback(new AppError("Not allowed by CORS"))
    },
    credentials: true, // allow cookies to be sent from the client
  })

const app = express()
app.use(express.static("public")) // serve static files
app.use(json()) // accept json data in the body of the request
// app.use(corsMiddleware())
// app.options('*', corsMiddleware())
app.use(
  cors({
    origin: ACCEPTED_ORIGINS,
    credentials: true,
    exposedHeaders: ["Authorization", "Custom-Header"],
  })
)
app.options("*", cors())

app.get("/", (req, res) => {
  res.send("<h1>RECS API</h1>")
})

app.use("/api/v1/requests", requestsRouter)
app.use("/api/v1/replies", repliesRouter)
app.use("/api/v1/users", usersRouter)

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`), 404)
})

app.use(ErrorController.globalErrorHandler)

export default app
