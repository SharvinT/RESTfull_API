const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

// Import router
const postsRoutes = require("./posts/post");
const authRoutes = require("./router/auth")

// monogoDB connection
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  console.log("db connected")
);

// middlewares
app.use(cors());
app.use(express.json());
app.use("/posts", postsRoutes);
app.use("/api/user", authRoutes);

// Routes requests and response
app.get("/", (req, res) => {
  //   mongoose.get;
  res.send("working");
});

// Listener
app.listen(3000, () => console.log("Server is running"));
