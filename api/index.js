const express = require("express");
const cors = require("cors");
require("dotenv").config();
const quotesRouter = require("./controllers/quotes");
const authorsRouter = require("./controllers/authors");
const mongoose = require("mongoose");

async function connect_to_db() {
  const db_url = process.env.MONGODB_URI;
  console.log("Connecting to MongoDB...");
  try {
    await mongoose.connect(db_url);
  } catch (err) {
    console.log("Error connecting to MongoDB: ", err);
  }
  console.log("Connected to MongoDB");
}

connect_to_db();

const app = express();
app.use(cors());
app.use(express.json());

app.use(quotesRouter);
app.use(authorsRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
