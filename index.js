import app from "./app.js"

const PORT = process.env.PORT ?? 1234

// Start the server
const server = app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
