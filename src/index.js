const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const middlewares = require("./middlewares");
// cities file
const cities = require("./api/cities");
// Middleware
const app = express();

// connect to database
mongoose.connect(
  process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) {
      console.error("error mongo db connection : " + err);
      return;
    }
  }
);

app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
// body parsing middleware
app.use(express.json());
// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

app.use("/api/cities", cities);

// Default if routes are not found
app.use(middlewares.notFound);
// Error handling middleware
app.use(middlewares.errorHandler);

// Server
const port = process.env.PORT || 1338;
app.listen(port, () => {
  console.log(`Listening to port http://localhost:${port}`);
});
