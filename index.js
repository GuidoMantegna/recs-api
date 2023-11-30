import mongoose from 'mongoose'
import dotenv from 'dotenv'
import app from "./app.js"

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
}).then(con => {
  // console.log(con.connections);
  console.log('DB connection successful!')
})

const PORT = process.env.PORT ?? 1234

// Start the server
const server = app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
