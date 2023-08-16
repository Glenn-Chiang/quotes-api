const express = require("express");
const cors = require("cors");
require("dotenv").config();
const quotesRouter = require("./api/controllers/quotes")

const app = express();
app.use(cors());
app.use(express.js());

app.use(quotesRouter)
app.use(authorsRouter)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`)
});
