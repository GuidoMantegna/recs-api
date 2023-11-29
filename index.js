const app = require('./app');

const PORT = process.env.PORT ?? 1234;

// Start the server
app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})