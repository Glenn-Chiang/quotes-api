const subscribersRouter = require("express").Router();
const Author = require("../models/author");
const Subscriber = require("../models/subscriber");

// Add new subscriber for specified author
subscribersRouter.post("/authors/:authorName/subscribers", async (req, res) => {
  console.log(req.body);
  const { name, chat_id: chatId } = req.body;
  // If subscriber does not already exist, add them to collection
  const subscriber =
    (await Subscriber.findOne({ chatId })) ||
    new Subscriber({
      username: name,
      chatId: chatId,
    });

  const author = await Author.findOne({ name: req.params.authorName });

  // If user already subscribed to author, abort request
  if (author.subscribers.includes(subscriber._id)) {
    return res.status(409).json({ error: "Already subscribed to author" });
  }

  // Add subscriber to author's subscribers field
  author.subscribers.push(subscriber._id);
  author.save();

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

// Unsubscribe a subscriber from a specified author
subscribersRouter.delete(
  "/authors/:authorName/subscribers/:username",
  async (req, res) => {
    const subscriber = await Subscriber.findOne({
      username: req.params.username,
    });
    const author = await Author.findOneAndUpdate(
      { name: req.params.authorName },
      {
        $pull: { subscribers: subscriber._id },
      }
    );
    await Subscriber.findByIdAndUpdate(subscriber._id, {
      $pull: { subscribedTo: author._id },
    });
    res.status(204).end();
  }
);

module.exports = subscribersRouter;
