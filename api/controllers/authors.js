const Author = require('../models/author')

const authorsRouter = require('express').Router()

// Get all authors
authorsRouter.get("/authors", async (req, res, next) => {
  try {
    const authors = await Author.find({}).select("name")
    res.json(authors)
  } catch (error) {
    next(error)
  }
})

module.exports = authorsRouter