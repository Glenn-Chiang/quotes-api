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

  const author =
    (await Author.findOne({ name: authorName })) ||
    new Author({ name: authorName }); // Add author to db if they do not already exist
  const quote = new Quote({ content, author: author._id });
  await quote.save();

  // Add quote to author's quotes field
  author.quotes.push(quote);
  await author.save();

  res.json(quote);
});

module.exports = quotesRouter;
