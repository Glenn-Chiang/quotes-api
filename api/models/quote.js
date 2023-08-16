const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author"
  }
})

quoteSchema.set('toJSON', {
  transform: (document, object) => {
    object.id = object._id.toString()
    delete object._id
    delete object.__v
  }
})

const Quote = mongoose.model('Quote', quoteSchema)

module.exports = Quote

