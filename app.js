import express from "express"
import { requestRouter } from "./routes/request.js"
import { replyRouter } from "./routes/reply.js"

const app = express()

app.get("/", (req, res) => {
  res.send("<h1>RECS API</h1>")
})

app.use("/request", requestRouter)
app.use("/reply", replyRouter)

export default app
