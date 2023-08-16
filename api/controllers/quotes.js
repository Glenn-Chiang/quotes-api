const quotesRouter = require('express').Router()

// Get all quotes from author
quotesRouter.get("/authors/:authorId/quotes", (req, res, next) => {

})

// Get random quote from author
quotesRouter.get("/authors/:authorId/randomquote", (req, res, next) => {
  
})

module.exports = quotesRouter