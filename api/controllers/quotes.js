const quotesRouter = require("express").Router();
const Quote = require("../models/quote");
const Author = require("../models/author");

// Get random quote from random author
quotesRouter.get("/quotes/random", async (req, res) => {
  let quote = (await Quote.aggregate([{ $sample: { size: 1 } }]))[0];
  quote = await Quote.populate(quote, { path: "author", select: "name" });
  res.json(quote);
});

// Get a given number of random quotes from random author
quotesRouter.get("/quotes", async (req, res) => {
  const count = Number(req.query.count)
  const quotes = await Quote.aggregate([{ $sample: { size: count } }]);
  res.json(quotes)
})

// Get a given number of random quotes from author
quotesRouter.get("/authors/:authorName/quotes", async (req, res) => {
  const authorName = req.params.authorName;
  const count = Number(req.query.count);

  const author = await Author.findOne({ name: authorName });
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  const quotes = count
    ? await Quote.aggregate([
        { $match: { author: author._id } },
        { $sample: { size: count } },
      ])
    : await Quote.find({ author: author._id });
  res.json(quotes);
});

// Get a random quote from author
quotesRouter.get("/authors/:authorName/random", async (req, res) => {
  const authorName = req.params.authorName;
  const author = await Author.findOne({ name: authorName });
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }
  const quoteSample = await Quote.aggregate([
    { $match: { author: author._id } },
    { $sample: { size: 1 } },
  ]);
  let quote = quoteSample[0];
  quote = await Quote.populate(quote, { path: "author", select: "name" });
  res.json(quote);
});

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
