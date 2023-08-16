const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: String,
  quotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quote",
    },
  ],
});

authorSchema.set("toJSON", {
  transform: (document, object) => {
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
  },
});

const Author = mongoose.model('Author', authorSchema)

module.exports = Author