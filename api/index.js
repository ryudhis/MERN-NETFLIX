const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("#routes/index");
const { createServer } = require("http");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

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

server.listen(8800, () => {
  console.log("Server is running.");
});

module.exports = app;
