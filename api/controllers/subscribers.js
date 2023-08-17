const subscribersRouter = require("express").Router();
const Author = require("../models/author");
const Subscriber = require("../models/subscriber");

// Add new subscriber for specified author
subscribersRouter.post("/authors/:authorName/subscribers", async (req, res) => {
  const { name, chat_id: chatId } = req.body;
  // If subscriber does not already exist, add them to collection
  const subscriber =
    (await Subscriber.findOne({ chatId })) ||
    new Subscriber({
      username: name,
      chatId: chatId,
    });

  // Add subscriber to author's subscriber field
  const author = await Author.findOneAndUpdate(
    { name: req.params.authorName },
    {
      $push: { subscribers: subscriber._id },
    }
  );

  if (author.subscribers.includes(subscriber._id)) {
    return res.status(409).json({ error: "Already subscribed to author" });
  }

  // Add author to subscriber's subscribedTo field
  subscriber.subscribedTo.push(author._id);
  subscriber.save();

  res.json(subscriber);
});

// Get all subscribers of specified author
subscribersRouter.get("/authors/:authorName/subscribers", async (req, res) => {
  const author = await Author.findOne({ name: req.params.authorName }).populate(
    "subscribers",
    "chatId"
  );

  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }
  const subscribers = author.subscribers;
  res.json(subscribers);
});

module.exports = subscribersRouter;
