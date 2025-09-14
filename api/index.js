const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("#routes/auth");
const usersRoute = require("#routes/users");

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);

app.listen(8800, () => {
  console.log("API is running on http://localhost:8800");
});
