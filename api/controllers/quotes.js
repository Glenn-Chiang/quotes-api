const quotesRouter = require("express").Router();
const Quote = require("../models/quote");
const Author = require("../models/author");

// Get all quotes from author
quotesRouter.get("/authors/:authorId/quotes", (req, res) => {});

// Get random quote from author
quotesRouter.get("/authors/:authorId/randomquote", (req, res) => {});

// Add new quote
quotesRouter.post("/quotes", async (req, res) => {
  const { content, authorName } = req.body;

  const author = await Author.findOne({ name: authorName });
  if (!author) {
    // Add author to db if they do not already exist
    const newAuthor = new Author({ name: authorName });
    await newAuthor.save();
  }

  const quote = new Quote({ content, author: author._id });
  await quote.save();
  res.json(quote);
});

module.exports = quotesRouter;
