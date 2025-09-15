const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("#routes/index");
const { createServer } = require("http");
const User = require("#models/User");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());
const server = createServer(app);
routes(app);

app.get("/", (req, res) => {
  res.send("Hello from Express on Vercel!");
});

app.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.listen(8800, () => {
  console.log("Server is running.");
});

module.exports = app;
