const express = require("express");
const cors = require("cors");
require("dotenv").config();
const quotesRouter = require("./api/controllers/quotes")
const mongoose = require('mongoose')

async function connect_to_db() {
  const db_url = process.env.MONGODB_URI
  console.log('Connecting to MongoDB...')
  await mongoose.connect(db_url)
  console.log('Connected to MongoDB')
}

connect_to_db()

const app = express();
app.use(cors());
app.use(express.js());

app.use(quotesRouter)
app.use(authorsRouter)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`)
});
