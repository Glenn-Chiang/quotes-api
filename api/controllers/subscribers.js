const subscribersRouter = require("express").Router();
const Author = require("../models/author");
const Subscriber = require("../models/subscriber");

// Add new subscriber for author
subscribersRouter.post("/authors/:authorName/subscribers", async (req, res) => {
  const { name, chat_id: chatId } = req.body;
  // If subscriber does not already exist, add them to collection
  const subscriber =
    (await Subscriber.findOne({ chatId })) ||
    new Subscriber({
      name,
      chatId,
    });

  // Add subscriber to author's subscriber field
  const author = await Author.findOneAndUpdate(
    { name: req.params.authorName },
    {
      $push: { subscribers: subscriber._id },
    }
  );

  // Add author to subscriber's subscribedTo field
  subscriber.subscribedTo.push(author._id);
  subscriber.save();
});

module.exports = subscribersRouter;
