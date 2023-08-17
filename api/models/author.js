const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quote",
      default: [],
    },
  ],
  subscribers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscriber",
      default: []
    }
  ]
});

authorSchema.set("toJSON", {
  transform: (document, object) => {
    object.id = object._id.toString();
    object.name = object.name.split("_").join(" ");
    delete object._id;
    delete object.__v;
  },
});

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
