const quotesRouter = require('express').Router()

// Get all quotes from author
quotesRouter.get("/authors/:authorId/quotes", (req, res) => {

})

// Get random quote from author
quotesRouter.get("/authors/:authorId/randomquote", (req, res) => {
  
})

quotesRouter.post("/quotes", (req, res) => {
  const { content, authorName } = req.body
})

module.exports = quotesRouter