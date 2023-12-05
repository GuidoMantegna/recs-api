import express, { json } from "express"
import { requestsRouter } from "./routes/requestsRoutes.js"
import { repliesRouter } from "./routes/repliesRoutes.js"
import { usersRouter } from "./routes/usersRoutes.js"

const app = express()
app.use(json()) // accept json data in the body of the request

app.get("/", (req, res) => {
  res.send("<h1>RECS API</h1>")
})

app.use("/api/v1/requests", requestsRouter)
app.use("/api/v1/replies", repliesRouter)
app.use("/api/v1/users", usersRouter)

export default app
