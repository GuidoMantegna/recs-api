import express, { json } from "express"
import { requestsRouter } from "./routes/requests.js"
import { repliesRouter } from "./routes/replies.js"
import { usersRouter } from "./routes/users.js"

const app = express()
app.use(json()) // accept json data in the body of the request
app.get("/", (req, res) => {
  res.send("<h1>RECS API</h1>")
})

app.use("/requests", requestsRouter)
app.use("/replies", repliesRouter)
app.use("/users", usersRouter)

export default app
