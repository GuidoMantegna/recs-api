import express from "express"
import { requestsRouter } from "./routes/requests.js"
import { repliesRouter } from "./routes/replies.js"

const app = express()

app.get("/", (req, res) => {
  res.send("<h1>RECS API</h1>")
})

app.use("/requests", requestsRouter)
app.use("/replies", repliesRouter)

export default app
