const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
  username: { type: String, required: true },
  chat_id: { type: String, required: true },
  subscribedTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
  ],
});

subscriberSchema.set("toJSON", {
  transform: (document, object) => {
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
  },
});

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

module.exports = Subscriber;
